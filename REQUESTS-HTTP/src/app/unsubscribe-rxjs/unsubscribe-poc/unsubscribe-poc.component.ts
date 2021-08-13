import { Component, OnInit, OnDestroy } from '@angular/core';
import { tap } from 'rxjs/operators';
import { EnviarValorService } from '../enviar-valor.service';

@Component({
  selector: 'app-unsubscribe-poc',
  templateUrl: './unsubscribe-poc.component.html',
  styleUrls: ['./unsubscribe-poc.component.scss']
})
export class UnsubscribePocComponent implements OnInit {

  mostrarComponentes = true;

  constructor(private service: EnviarValorService) { }

  ngOnInit() {


  }

  emitirValor(valor: string) {
    this.service.emitirValor(valor);
  }

  destruirComponentes() {
    this.mostrarComponentes = !this.mostrarComponentes;
  }

}
