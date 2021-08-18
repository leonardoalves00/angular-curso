import { CursosService } from './../cursos.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { error } from '@angular/compiler/src/util';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Curso2Service } from '../curso2.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

  public form: FormGroup;
  public submitted: boolean ;

  constructor(
    private fb: FormBuilder,
    private service: Curso2Service,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {

    /*this.route.params.subscribe(
      (params: any) => {
        const id = params ['id'];
        console.log(id);
        const curso$ =  this.service.loadById(id);
        curso$.subscribe( curso =>{
          this.updateForm(curso);
        })
      }
    )*/

   /* this.route.params
    .pipe(
      map((params:any) => params(['id'])),
      switchMap(id => this.service.loadById(id)))
      //switchMap(cursos => obterAulas)
    .subscribe(curso =>this.updateForm(curso))*/

    //oncatMap -> mapeia na ordem que foi registrado
    //mergeMap -> a ordem nao inporta
    //exhaustMap -> em casos de login

    const curso = this.route.snapshot.data['curso']

    this.form = this.fb.group({
      id: [curso.id],
      nome: [curso.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]]
    })

  }

  /*updateForm(curso){
    this.form.patchValue({
      id: curso.id,
      nome: curso.nome
    })
  }*/

  onSubmit(){
    this.submitted = true;
    console.log(this.form.value)
    if(this.form.valid){
      console.log('submit')

      let msgSuccess = 'Cruso criado com sucesso.';
      let msgError = 'Erro ao criar curso, tente Novamento.';

      if(this.form.value.id){
        msgSuccess = 'Cruso atualizado com sucesso.';
        msgError = 'Erro no Update, tente Novamento.';
      }

      this.service.save(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess(msgSuccess);
            this.location.back()
        },
        error => this.modal.showAlertDanger(msgError),
        () => console.log('request OK')
      )

      /*if(this.form.value.id){
        //update
        this.service.update(this.form.value).subscribe(
          success => {
            this.modal.showAlertSuccess('Cruso atualizado com sucesso.');
            this.location.back()
          },
          error => this.modal.showAlertDanger('Erro no Update, tente Novamento.'),
          () => console.log('update OK')
        )
      } else {
        this.service.create(this.form.value).subscribe(
          success => {
            this.modal.showAlertSuccess('Cruso criado com sucesso.');
            this.location.back()
          },
          error => this.modal.showAlertDanger('Erro ao criar curso, tente Novamento.'),
          () => console.log('request OK')
          )
      }*/

    }
  }

  isValid(field){
    return this.form.get(field).statusChanges
  }

  hasError(field: string){
    return this.form.get(field).errors;
  }


  onCancel(){
    this.submitted = false;
    this.form.reset();
    //console.log('cancel')
  }




}
