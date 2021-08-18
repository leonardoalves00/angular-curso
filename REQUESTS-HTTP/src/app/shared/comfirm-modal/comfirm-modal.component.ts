import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-comfirm-modal',
  templateUrl: './comfirm-modal.component.html',
  styleUrls: ['./comfirm-modal.component.scss']
})
export class ComfirmModalComponent implements OnInit {

  @Input() title: string;
  @Input() msg: string;
  @Input() cancelTxt = 'Cancelar';
  @Input() okTxt = 'Sim';

  confirmResult: Subject<boolean>;


  constructor(
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit(): void {

    this.confirmResult = new Subject();

  }

  onConfirm(){
    this.confirmAndClose(true)
  }

  onClose(){
    this.confirmAndClose(false)
  }

  private confirmAndClose(value:boolean){
    this.confirmResult.next(value)
    this.bsModalRef.hide();
  }


}
