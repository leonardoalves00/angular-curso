import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const INPUT_FIELD_VALUE: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputFieldComponent),
  multi:true,
}

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  providers: [INPUT_FIELD_VALUE]
})
export class InputFieldComponent implements ControlValueAccessor{

  @Input() classeCss;
  @Input() id: string;
  @Input() label: string;
  @Input() type: 'text';
  @Input() placeholder: 'Nome';
  @Input() control;
  @Input() isReadOnly = false;

  private innerValue:any;

  get value(){
    return this.innerValue
  }

  set value(v:any ){
    if(v !== this.innerValue){
      this.innerValue = v;
      //TUDO
    }
  }


  onChangeCB: (_:any) => void = () => {};
  onTouchedCB: (_:any) => void = () => {};

  writeValue(v: any): void {
    if(v !== this.innerValue){
      this.value = v;
    }
  }
  registerOnChange(fn: any): void {
    this.onChangeCB(fn)
  }
  registerOnTouched(fn: any): void {
    this.onTouchedCB(fn)
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isReadOnly = isDisabled
  }


}
