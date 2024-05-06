import { Injectable } from '@angular/core';
import {Departamento} from '../models/DepartamentosViewModel'
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DepartamentoServiceService {

  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44332/API/Departamento/List';

  getDepartamento (){
    return this.http.get<Departamento[]>(this.Url);
  }

  UrlAgregar =  'https://localhost:44332/API/Departamento/Insert' ;
  agregar(modelo:Departamento):Observable<Departamento>{
    return this.http.post<Departamento>(this.UrlAgregar,modelo);
  }
  
  UrlObtener = 'https://localhost:44332/API/Departamento/Fill';
    obtener(id:string){
    return this.http.get<Departamento>(`${this.UrlObtener}?Dept_Codigo=${id}`);
  }

  UrlUpdate = 'https://localhost:44332/API/Departamento';
  actualizar(dept_Codigo:number,modelo:Departamento):Observable<Departamento>{
    return this.http.put<Departamento>(this.UrlUpdate,modelo);
  }
  
  UrlEliminar = 'https://localhost:44332/API/Departamento/Delete';
  eliminar(Dept_Codigo:string):Observable<void>{
    return this.http.delete<void>(`${this.UrlEliminar}?Dept_Codigo=${Dept_Codigo}`);
  }
}



