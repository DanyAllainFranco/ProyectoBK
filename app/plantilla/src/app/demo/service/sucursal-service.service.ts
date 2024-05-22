import { Injectable } from '@angular/core';
import {Sucursales} from '../models/SucursalesViewModel'
import {DropMunicipios} from '../models/MunicipioViewModel'
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import {Municipio} from '../models/MunicipioViewModel'
import {Empleado} from '../models/EmpleadoViewModel'


@Injectable({
  providedIn: 'root'
})
export class SucursalServiceService {

  constructor(private http: HttpClient) { }
  Url = 'http://sistemarestaurante.somee.com/API/Sucursal/List';
  getSucursal (){
    return this.http.get<Sucursales[]>(this.Url);
  }

  MuniDDL= 'http://sistemarestaurante.somee.com/API/Departamento/MunicipioDDL';
  MuninicioDDL (){
    return this.http.get<DropMunicipios[]>(this.MuniDDL);
  }

  EmplDDL= 'http://sistemarestaurante.somee.com/API/Empleado/EmpleadoDDL';
  EmpleadoDDL (){
    return this.http.get<Empleado[]>(this.Url);
  }

  UrlAgregar =  'http://sistemarestaurante.somee.com/API/Sucursal/Insert' ;
  agregar(modelo:Sucursales):Observable<Sucursales>{
    return this.http.post<Sucursales>(this.UrlAgregar,modelo);
  }
  
  UrlObtener = 'http://sistemarestaurante.somee.com/API/Sucursal/Find';
    obtener(sucu_Id:number){
    return this.http.get<Sucursales>(`${this.UrlObtener}?Sucu_Id=${sucu_Id}`);
  }

  UrlUpdate = 'http://sistemarestaurante.somee.com/API/Sucursal/Update';
  actualizar(sucu_Id:number,modelo:Sucursales):Observable<Sucursales>{
    return this.http.put<Sucursales>(this.UrlUpdate,modelo);
  }
  
  UrlEliminar = 'http://sistemarestaurante.somee.com/API/Sucursal/Delete';
  eliminar(sucu_Id:number):Observable<void>{
    return this.http.delete<void>(`${this.UrlEliminar}?Sucu_Id=${sucu_Id}`);
  }
  
}
