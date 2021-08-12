import { FormArray, FormControl, FormGroup } from "@angular/forms";

export class FormValidations {

  static requiredMinCheckbox(min = 1){
    const validators = (formArray: FormArray) => {
      /*const values = formArray.controls;
      let totalChecked = 0;
      for(let i=0; i<values.length; i++){
        if(values[i].value){
          totalChecked += 1;
        }
      }*/
      const totalChecked = formArray.controls
        .map(v => v.value)
        .reduce((total, current) => current ? total + current : total, 0) ;
      return totalChecked >= min ? null : {require: true};
    }
    return validators
  }

  static cepValidation(control: FormControl){

    const cep = control.value;
    if(cep == null && cep !== '' ){
      const validacep = /^[0-9]{8}$/;
      return validacep.test(cep) ? null : {cepValidation : true}
    }
    return null;
  }

  static equalsTo(otherField:string){
    const validator = (formControl: FormControl) => {
      if (otherField == null){
        throw new Error('Preencha corretament!');
      }

      if(!formControl.root || !(<FormGroup> formControl.root).controls){
        return null
      }

      const field = (<FormGroup>formControl.root).get(otherField)

      if(!field){
        throw new Error ('È preencha todos dos campos.');
      }

      if(field.value !== formControl.value){
        return{ equalsTo : otherField}
      }
      return null;
    }
    return validator;
  }


  static getErrorMsg(fieldName: string, validatorName:string, validatorValue?: any){
    const config = {
      'required': `${fieldName} é Obrigatorio.`,
      'mimlength': `precisa ter no mínimo ${validatorValue.requiredLength} caracteres.`,
      'maxlength': `precisa ter no máximo ${validatorValue.requiredLength} caracteres.`,
      'cepInvalido': `CEP invalido.`,
    }

    return config[validatorName]
  }
}
