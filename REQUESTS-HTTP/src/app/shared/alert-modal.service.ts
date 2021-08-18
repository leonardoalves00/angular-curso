import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ComfirmModalComponent } from './comfirm-modal/comfirm-modal.component';

export enum AlertTypes{
  DANGER = 'danger',
  SUCCESS = 'success',
}

@Injectable({
  providedIn: 'root',
})
export class AlertModalService {

  constructor(private modalService: BsModalService) {}

  private showAlert(message:string, type:string, dismissTimeout?: number){

    const bsModalRef:BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type= type;
    bsModalRef.content.messege= message ;

    if(dismissTimeout){
      setTimeout(() => bsModalRef.hide(), dismissTimeout)
    }
  }

  showAlertDanger(message: string){
    this.showAlert(message, AlertTypes.DANGER)
  }

  showAlertSuccess(message: string){
    this.showAlert(message, AlertTypes.SUCCESS, 3000)
  }

  showConfirm(title: string, msg: string, okTxt?: string, cancelTxt?: string ){
    const bsModalRef:BsModalRef = this.modalService.show(ComfirmModalComponent);
    bsModalRef.content.title = title;
    bsModalRef.content.msg = msg;

    if(okTxt){
      bsModalRef.content.okTxt = okTxt;
      }
    if(okTxt){
      bsModalRef.content.cancelTxt = cancelTxt;
    }

    return (<ComfirmModalComponent>bsModalRef.content).confirmResult;
  }

}
