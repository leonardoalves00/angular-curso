import { environment } from './../../environments/environment';
import { CrudService } from './../shared/crud-service';
import { Injectable } from '@angular/core';
import { Curso } from './cursos-lista/curso';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Curso2Service extends CrudService<Curso> {

  constructor(
    protected http:HttpClient,
  ) {

    super(http, `${environment.API}cursos`);
  }
}
