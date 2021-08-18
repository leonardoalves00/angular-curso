import { AlertModalService } from './../../shared/alert-modal.service';
import { CursosService } from './../cursos.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Curso } from './curso';
import { EMPTY, empty, Observable, pipe, Subject, Subscriber } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso2Service } from '../curso2.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces:true
})
export class CursosListaComponent implements OnInit {

  //public cursos: Curso[];
  @ViewChild('deleteModal') deleteModal;

  public cursos$ : Observable<Curso[]>;
  public error$ = new Subject<boolean>();
  //bsModalRef: BsModalRef;

  deleteModalRef: BsModalRef;

  cursoSelecionado: Curso;


  constructor(
    private service:Curso2Service,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService
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
        return EMPTY;
      })
    )
  }

  handleError(){
    this.alertService.showAlertDanger('Erro ao carregar cursos. Tente mais tarde.')
    /*this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type= 'danger';
    this.bsModalRef.content.messege= 'Erro ao carrregar cursos. Temte mais tarde.';*/
  }

  onEdit(id){
    this.router.navigate(['editar', id],{relativeTo:this.route})
    console.log()
  }

  onDelete(curso){
    this.cursoSelecionado = curso
    const result$ = this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja remover esse curso ?')
    result$.asObservable()
    .pipe(
      take(1),
      switchMap(result => result ? this.service.remove(curso.id) : EMPTY)
    )
    .subscribe(
      success => {
        this.onRefresh()
      },
      error => {
        this.alertService.showAlertDanger('Erro ao deletar cursos. Tente mais tarde.');
      }
    )
    //this.deleteModalRef = this.modalService.show(this.deleteModal, {class:'modal-sm'})
  }

  onConfirmDelete(){
    this.service.remove(this.cursoSelecionado.id)
    .subscribe(
      success => {
        this.onRefresh()
        this.deleteModalRef.hide();
      },
      error => {
        this.alertService.showAlertDanger('Erro ao deletar cursos. Tente mais tarde.');
        this.deleteModalRef.hide();
      }
    );
  }

  onDeclineDelete(){
    this.deleteModalRef.hide();
  }
}



