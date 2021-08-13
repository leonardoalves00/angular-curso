import { AlertModalService } from './../../shared/alert-modal.service';
import { CursosService } from './../cursos.service';
import { Component, OnInit } from '@angular/core';
import { Curso } from './curso';
import { empty, Observable, pipe, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces:true
})
export class CursosListaComponent implements OnInit {

  //public cursos: Curso[];

  public cursos$ : Observable<Curso[]>;
  public error$ = new Subject<boolean>();
  bsModalRef: BsModalRef;

  constructor(
    private service:CursosService,
    private alertService: AlertModalService
  ) { }

  ngOnInit() {

    //this.service.list()
    //.subscribe(dados => this.cursos = dados)
    this.onRefresh();

  }

  onRefresh(){
    this.cursos$ = this.service.list()
    .pipe(
      catchError(error => {
        console.error(error);
        this.handleError();
        return empty();
      })
    )
  }

  handleError(){
    this.alertService.showAlertDanger('Erro ao carregar cursos. Tente mais tarde.')
    /*this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type= 'danger';
    this.bsModalRef.content.messege= 'Erro ao carrregar cursos. Temte mais tarde.';*/
  }
}



