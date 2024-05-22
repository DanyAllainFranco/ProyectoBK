import { Injectable } from '@angular/core';
import {Clientes, ClientesEnviar, LlenarClientes} from '../models/ClientesViewModel'
import {HttpClient} from '@angular/common/http'
import { Respuesta } from '../models/ServiceResult';
import { Observable } from 'rxjs';
import { BASE_URL } from './UrlParaAPI';


@Injectable({
  providedIn: 'root'
})
export class ClientesServiceService {
  successMessage: string = '';
  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44332/API/Cliente/List';
  getCliente (){
    return this.http.get<Clientes[]>(this.Url);
  }

  obtenerCliePorId(idCombo: number): Observable<LlenarClientes> {
    return this.http.get<LlenarClientes>(`${BASE_URL}API/Cliente/Find/${idCombo}`);
  }


  agregar(modelo: ClientesEnviar): Observable<Respuesta> {
    console.log(modelo)
    return this.http.post<Respuesta>(`${BASE_URL}API/Cliente/Insert`, modelo);
  }
  obtenerClientePorId(idCombo: number): Observable<LlenarClientes> {
    return this.http.get<LlenarClientes>(`${BASE_URL}API/Cliente/Find/${idCombo}`);
  }

  
  eliminar(idDepartamento:number):Observable<void>{
    return this.http.delete<void>(`${BASE_URL}API/Cliente/Delete/${idDepartamento}`);
  }

  actualizar(modelo:ClientesEnviar):Observable<Respuesta>{
    return this.http.put<Respuesta>(`${BASE_URL}API/Cliente/Update`,modelo);
  }

}
