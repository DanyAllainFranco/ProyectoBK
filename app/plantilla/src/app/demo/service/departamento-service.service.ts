import { Injectable } from '@angular/core';
import {Departamento} from '../models/DepartamentosViewModel'
import {HttpClient} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class DepartamentoServiceService {

  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44332/API/Departamento/List';

  getDepartamento (){
    return this.http.get<Departamento[]>(this.Url);
  }
}
