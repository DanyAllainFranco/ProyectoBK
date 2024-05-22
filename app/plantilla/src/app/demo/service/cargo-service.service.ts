import { Injectable } from '@angular/core';
import {Cargos, LlenarCargo} from '../models/CargosViewModel'
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { BASE_URL } from './UrlParaAPI';


@Injectable({
  providedIn: 'root'
})
export class CargosServiceService {

  constructor(private http: HttpClient) { }
  Url = 'http://sistemarestaurante.somee.com/API/Cargo/List';
  getCargo (){
    return this.http.get<Cargos[]>(this.Url);
  }

  obtenerCargoPorId(idCombo: number): Observable<LlenarCargo> {
    return this.http.get<LlenarCargo>(`${BASE_URL}API/Cargo/Find/${idCombo}`);
  }

  UrlAgregar =  'http://sistemarestaurante.somee.com/API/Cargo/Insert' ;
  agregar(modelo:Cargos):Observable<Cargos>{
    return this.http.post<Cargos>(this.UrlAgregar,modelo);
  }
  
  UrlObtener = 'http://sistemarestaurante.somee.com/API/Cargo/Find';
    obtener(Carg_Id:number){
    return this.http.get<Cargos>(`${this.UrlObtener}?Carg_Id=${Carg_Id}`);
  }

  UrlUpdate = 'http://sistemarestaurante.somee.com/API/Cargo/Update';
  actualizar(carg_id:number,modelo:Cargos):Observable<Cargos>{
    return this.http.put<Cargos>(this.UrlUpdate,modelo);
  }
  
  UrlEliminar = 'http://sistemarestaurante.somee.com/API/Cargo/Delete';
  eliminar(Carg_Id:number):Observable<void>{
    return this.http.delete<void>(`${this.UrlEliminar}?Carg_Id=${Carg_Id}`);
  }
}
