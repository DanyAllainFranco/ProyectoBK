import { Injectable } from '@angular/core';
import {Departamento, Departamento2, LlenarDepartamento} from '../models/DepartamentosViewModel'
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { BASE_URL } from './UrlParaAPI';


@Injectable({
  providedIn: 'root'
})
export class DepartamentoServiceService {

  constructor(private http: HttpClient) { }
  Url = 'http://sistemarestaurante.somee.com/API/Departamento/List';

  getDepartamento (){
    return this.http.get<Departamento[]>(this.Url);
  }

  obtenerDepaPorId(idCombo: string): Observable<LlenarDepartamento> {
    return this.http.get<LlenarDepartamento>(`${BASE_URL}API/Departamento/Fill/${idCombo}`);
  }
  
  UrlAgregar =  'http://sistemarestaurante.somee.com/API/Departamento/Insert' ;

  agregar(modelo:Departamento):Observable<Departamento>{
    return this.http.post<Departamento>(this.UrlAgregar,modelo);
  }
  
  UrlObtener = 'http://sistemarestaurante.somee.com/API/Departamento/Fill';
    obtener(id:string){
    return this.http.get<Departamento>(`${this.UrlObtener}?Dept_Codigo=${id}`);
  }

  UrlUpdate = 'http://sistemarestaurante.somee.com/API/Departamento/Update';
  actualizar(dept_Codigo:number,modelo:Departamento2):Observable<Departamento>{
    return this.http.put<Departamento>(this.UrlUpdate,modelo);
  }
  
  UrlEliminar = 'http://sistemarestaurante.somee.com/API/Departamento/Delete';
  eliminar(Dept_Codigo:string):Observable<void>{
    return this.http.delete<void>(`${this.UrlEliminar}?Dept_Codigo=${Dept_Codigo}`);
  }
}



