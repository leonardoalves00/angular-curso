import { Cidade } from './../models/cidade';
import { EstadosBr } from './../models/estados-br';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstadosBr(){
    return this.http.get<EstadosBr[]>('assets/dados/estadosbr.json');
  }

  getCidaes(idEstado: number){
    return this.http.get<Cidade[]>('assets/dados/cidades.json')
    .pipe(
      map((cidade: Cidade[]) => cidade.filter(c => c.estado == idEstado)))
  }


  getCargos(){
    return[
      {nome: 'dev', nivel: 'Junior', desc:'Dev Jr'},
      {nome: 'dev', nivel: 'pleno', desc:'Dev pl'},
      {nome: 'dev', nivel: 'Senhor', desc:'Dev sr'},
    ]
  }

  getTecnologias(){
    return[
      {nome: 'java', desc:'java'},
      {nome: 'javascript', desc:'javascript'},
      {nome: 'PHP', desc:'PHP'},
      {nome: 'ruby', desc:'ruby'},]
  }

  getNewslatter(){
    return [
      {nome:'s', desc:'sim'},
      {nome:'n', desc:'não'},]
  }

}
