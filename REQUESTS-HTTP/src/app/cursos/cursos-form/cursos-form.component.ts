import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

  public form: FormGroup;
  public submitted: boolean ;

  constructor(
    private fb: FormBuilder
    ) { }

  ngOnInit() {

    this.form = this.fb.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]]
    })

  }

  onSubmit(){
    this.submitted = true;
    console.log(this.form.value)
    if(this.form.valid){
      console.log('submit')
    }
  }

  isValid(field:string){
    return
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
