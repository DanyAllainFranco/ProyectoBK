import { Injectable } from '@angular/core';
import {Login} from '../models/LoginViewModel';
import {LlenarSucursal, LlenarUsuario, Usuario, UsuarioActualizar, UsuarioEnviar} from '../models/UsuariosViewModel'
import {EmpleadoDDL} from '../models/EmpleadoViewModel'
import {RolesDLL} from '../models/RolesViewModel'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs';
import { Respuesta } from '../models/ServiceResult';
import { BASE_URL } from './UrlParaAPI';


@Injectable({
  providedIn: 'root'
})
export class UsuariosServiceService {
  successMessage: string = '';
  constructor(private http: HttpClient) { }
  Url = 'http://sistemarestaurante.somee.com/API/Usuario/List';
  getUsuario (){
    return this.http.get<Usuario[]>(this.Url);
  }

  prueba = 'http://sistemarestaurante.somee.com/API/Usuario/Insert';
  agregar(modelo: UsuarioEnviar): Observable<Respuesta> {
    console.log(modelo)
    return this.http.post<Respuesta>(this.prueba, modelo);
  }

  obtenerPostrePorId(idCombo: number): Observable<LlenarUsuario> {
    return this.http.get<LlenarUsuario>(`${BASE_URL}API/Usuario/Find/${idCombo}`);
  }

  obtenerSucuPorId(idCombo: number): Observable<LlenarSucursal> {
    return this.http.get<LlenarSucursal>(`${BASE_URL}API/Sucursal/Find/${idCombo}`);
  }
  
  actualizar(modelo:UsuarioActualizar):Observable<Respuesta>{
    return this.http.put<Respuesta>(`${BASE_URL}API/Usuario/Update`,modelo);
  }

  eliminar(idDepartamento:number):Observable<void>{
    return this.http.delete<void>(`${BASE_URL}API/Usuario/Delete/${idDepartamento}`);
  }
  obtenerUsuarioPorId(idCombo: number): Observable<LlenarUsuario> {
    return this.http.get<LlenarUsuario>(`${BASE_URL}API/Usuario/Fill/${idCombo}`);
  }
















  UrlLogin = 'http://sistemarestaurante.somee.com/API/Usuario/Login';
  login(loginData: Login): Observable<any> {
    return this.http.get<any>(`${this.UrlLogin}?Usua_Usuario=${loginData.Usua_Usuario}&Usua_Contra=${loginData.Usua_Contra}`);
  }

  RolDDL= 'http://sistemarestaurante.somee.com/API/Rol/RolesDDL';
  RolesDLL (){
    return this.http.get<RolesDLL[]>(this.RolDDL);
  }

  EmplDDL= 'http://sistemarestaurante.somee.com/API/Empleado/EmpleadoDDL';
  EmpleadoDDL (){
    return this.http.get<EmpleadoDDL[]>(this.EmplDDL);
  }

  // UrlAgregar =  'http://sistemarestaurante.somee.com/API/Usuario/Insert' ;
  // agregar(modelo:Usuario):Observable<Usuario>{
  //   return this.http.post<Usuario>(this.UrlAgregar,modelo);
  // }
  
  UrlObtener = 'http://sistemarestaurante.somee.com/API/Usuario/Find';
    obtener(Usua_Id:number){
    return this.http.get<Usuario>(`${this.UrlObtener}?Usua_Id=${Usua_Id}`);
  }

  // UrlUpdate = 'http://sistemarestaurante.somee.com/API/Usuario/Update';
  // actualizar(sucu_Id:number,modelo:Usuario):Observable<Usuario>{
  //   return this.http.put<Usuario>(this.UrlUpdate,modelo);
  // }
  
  // UrlEliminar = 'http://sistemarestaurante.somee.com/API/Usuario/Delete';
  // eliminar(Usua_Id:number):Observable<void>{
  //   return this.http.delete<void>(`${this.UrlEliminar}?Usua_Id=${Usua_Id}`);
  // }
}  
