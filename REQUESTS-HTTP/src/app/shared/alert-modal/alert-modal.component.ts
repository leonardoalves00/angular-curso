import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {

  @Input() messege: string;
  @Input() type = 'primary';

  constructor(
    public bsModalRef: BsModalRef
    ) { }

  ngOnInit() {
  }

  onClose(){
    this.bsModalRef.hide();
  }

}
