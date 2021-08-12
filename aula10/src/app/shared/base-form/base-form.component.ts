import { FormArray, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-form',
  template: '<div></div>',
})
export abstract class BaseFormComponent implements OnInit {
  formulario: FormGroup;

  constructor() {}

  ngOnInit() {}

  abstract submit();

  onSubmit() {
    if (this.formulario.valid) {
      this.submit();
    } else {
        console.log('Formulario invalido');
        this.vericaValidacoesForm(this.formulario);
    }
  }

  vericaValidacoesForm(formGroup:FormGroup | FormArray){
    Object.keys(formGroup.controls).forEach(campo=>{
      console.log(campo)

      const controle = formGroup.get(campo);

      controle.markAsDirty()
      controle.markAsTouched()

      if(controle instanceof FormGroup || controle instanceof FormArray){
        this.vericaValidacoesForm(controle)
      }

    })
  }

  verificaValidTouched(campo:string){
    return this.formulario.get(campo).valid && (this.formulario.get(campo).touched || this.formulario.get(campo).dirty)
  }

  resetar(){
    this.formulario.reset();
  }

  verificaEmailInvalido(){
    let campoEmail = this.formulario.get('email')
    if(campoEmail.errors){
      return campoEmail.errors['email'] && campoEmail.touched;
    }
  }

  aplicaCssErro(campo: string){
    return{
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo),
    }
  }

  getCampo(campo: string){
    return this.formulario.get(campo);
  }

}

