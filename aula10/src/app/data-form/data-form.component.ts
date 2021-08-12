import { Cidade } from './../shared/models/cidade';
import { VerificaEmailService } from './services/verifica-email.service';
import { FormValidations } from './../shared/form-validations';
import { EstadosBr } from './../shared/models/estados-br';
import { DropdownService } from './../shared/services/dropdown.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map, tap, distinctUntilChanged, switchMap, concatMapTo } from 'rxjs/operators';
import { componentFactoryName } from '@angular/compiler';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { empty, Observable, Subscriber } from 'rxjs';
import { BaseFormComponent } from '../shared/base-form/base-form.component';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent extends BaseFormComponent implements OnInit {


  //public formulario: FormGroup;
  public estados: EstadosBr[];
  public cidades: Cidade[];
  //public estados: Observable <EstadosBr[]>;
  public cargos: any[];
  public tecnologias: any[];
  public newslatterOp: any[];

  public frameworks = ['Angular', 'React', 'Vue', 'Sencha'];


  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private cepServoce: ConsultaCepService,
    private verificaEmailService: VerificaEmailService
    ) {
      super();
    }

  ngOnInit(): void {

    //this.verificaEmailService.verificarEmail('email@gmail.com').subscribe();

    this.dropdownService.getEstadosBr()
      .subscribe(dados => this.estados= dados)

    this.cargos = this.dropdownService.getCargos();

    this.tecnologias = this.dropdownService.getTecnologias();

    this.newslatterOp = this.dropdownService.getNewslatter();

    /*this.dropdownService.getEstadosBr()
    .subscribe(dados => {dados = this.estados ; console.log(dados)})*/

    /*this.formulario= new FormGroup({
      nome: new FormControl(null),
      email: new FormControl(null),

      endereco:new FormGroup({
        cep: new FormControl(null),
      })
    })*/

    this.formulario = this.formBuilder.group({
      nome: [null,[Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email: [null, [Validators.required, Validators.email],[this.validarEmail.bind(this)]],
      confirmarEmail: [null, [FormValidations.equalsTo('email')]],

      endereco: this.formBuilder.group({
        cep: [null,[Validators.required, FormValidations.cepValidation] ],
        numero: [null,Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required ],
        estado: [null, Validators.required],
      }),

      cargo:[null],

      tecnologias:[null],

      newslatter:['s'],

      termos:[null, Validators.pattern('true')],

      frameworks:this.buildFraneworks,
    });

    this.formulario.get('endereco.cep').statusChanges
      .pipe(
        distinctUntilChanged(),
        tap(value => console.log('status CEP: ', value)),
        switchMap(status => status === 'valid' ?
        this.cepServoce.consultaCep(this.formulario.get('endereco.cep').value ) : empty()  )

      )
      .subscribe( dados => dados ? this.populaDadosForm(dados) : {});

    //this.dropdownService.getCidaes(8) .subscribe(console.log )

    this.formulario.get('endereco.estado').valueChanges
    .pipe(
      tap(estado => console.log('Novo estado: ', estado)),
      map(estado => this.estados.filter(e => e.sigla === estado)),
      map(estados => estados && estados.length > 0 ? estados[0].id : empty()),
      switchMap((estadoId: number) => this.dropdownService.getCidaes(estadoId)),
      tap(console.log)
    )
    .subscribe(cidades => this.cidades = cidades);
  }

  buildFraneworks(){

    const values = this.frameworks.map(v => new FormControl(false))

    return this.formBuilder.array(values, FormValidations.requiredMinCheckbox(1));

  }

  submit() {
    console.log(this.formulario);
    console.log(this.formulario.value)

    let valueSubmit = Object.assign({}, this.formulario.value)

    valueSubmit = Object.assign(valueSubmit,{
      frameworks: valueSubmit.frameworks
      .map((v, i) => v ? this.frameworks[i] : null)
      .filter(v => v !== null)
    })
    console.log(valueSubmit);

    this.http.post('https://httpbin.org/post', JSON.stringify(valueSubmit))
    .pipe(map((res: any) => res))
    .subscribe((dados: any) => {
      console.log(dados)
      this.formulario.reset();
    },
    (error: any) => alert ('erro')
    )
  }


  vericaValidacoesForm(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(campo=>{
      console.log(campo)

      const controle = formGroup.get(campo);

      controle.markAsDirty()

      if(controle instanceof FormGroup){
        this.vericaValidacoesForm(controle)
      }

    })
  }

  consultaCep(){

    const cep = this.formulario.get('endereco.cep').value;


    if(cep != null && cep !== ''){
        this.cepServoce.consultaCep(cep)
        .subscribe(dados => this.populaDadosForm(dados));
      }

  }

  populaDadosForm(dados){

    this.formulario.patchValue({

      endereco: {
        cep: dados.logradouro,
        complemento: dados.complemento,
        rua: dados.bairro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
      }
    })

    this.formulario.get('nome').setValue('leonardo');
  }

  resetaDadosForm(){
    this.formulario.patchValue({

      endereco: {
        cep: null,
        complemento: null,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null,
      }
    })
  }

  setarCargo(){
    const cargo = {nome: 'dev', nivel: 'Junior', desc:'Dev Jr'};
    this.formulario.get('cargo').setValue(cargo);
  }

  compararCargos(obg1,obg2){
    return obg1 && obg2 ? (obg1.nome === obg2.nome ) : obg1 === obg2
  }

  setarTecnologias(){
    const tecnologias = {nome: 'PHP', desc:'PHP'};
    this.formulario.get('tecnologias').setValue(['java', 'javascript', 'PHP', 'ruby'])
  }

  validarEmail(formControl: FormControl){
    return this.verificaEmailService.verificarEmail(formControl.value)
      .pipe(map(emailExiste => emailExiste ? {emailInvalido:true } : null))

  }

}
