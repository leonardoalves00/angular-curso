import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComfirmModalComponent } from './comfirm-modal/comfirm-modal.component';



@NgModule({
  declarations: [
    AlertModalComponent,
    ComfirmModalComponent
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    AlertModalComponent,
    ComfirmModalComponent
  ]
})
export class SharedModule { }
