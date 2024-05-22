import { Injectable } from '@angular/core';
import {Factura,FacturaDetalle,Complemento,Bebida,Combo,Postre,Paquete, ReporteEmpleados, ReporteProductos, ReporteSucursal, ReporteCompleto} from '../models/FacturaViewModel'
import {HttpClient} from '@angular/common/http'
import { Observable, catchError, map } from 'rxjs';
import { BASE_URL } from './UrlParaAPI';
import { Empleado } from '../models/EmpleadoViewModel';


@Injectable({
  providedIn: 'root'
})
export class FacturaServiceService {

  constructor(private http: HttpClient) { }


  ReporteIdentificador(Empl_Id:string,FechaInicio: string, FechaFinal: string): Observable<ReporteProductos> {
    return this.http.get<ReporteProductos>(`${BASE_URL}API/Factura/ReporteIdentificador/${Empl_Id}/${FechaInicio}/${FechaFinal}`);
  }

  ReporteEmpleadosTodos(FechaInicio: string, FechaFinal: string): Observable<ReporteEmpleados> {
    return this.http.get<ReporteEmpleados>(`${BASE_URL}API/Factura/ReporteEmpleadosTodos/${FechaInicio}/${FechaFinal}`);
  }

  ReporteSucursalTodos(FechaInicio: string, FechaFinal: string): Observable<ReporteSucursal> {
    return this.http.get<ReporteSucursal>(`${BASE_URL}API/Factura/ReporteSucursalesTodos/${FechaInicio}/${FechaFinal}`);
  }


  ReporteEmpleados(Empl_Id:number,FechaInicio: string, FechaFinal: string): Observable<ReporteEmpleados> {
    return this.http.get<ReporteEmpleados>(`${BASE_URL}API/Factura/ReporteEmpleados/${Empl_Id}/${FechaInicio}/${FechaFinal}`);
  }
  ReporteProductos(FechaInicio: string, FechaFinal: string): Observable<ReporteProductos> {
    return this.http.get<ReporteProductos>(`${BASE_URL}API/Factura/ReporteProductos/${FechaInicio}/${FechaFinal}`);
  }
  ReporteCompleto(FechaInicio: string, FechaFinal: string): Observable<ReporteCompleto> {
    return this.http.get<ReporteCompleto>(`${BASE_URL}API/Factura/ReporteCompleto/${FechaInicio}/${FechaFinal}`);
  }
  ReporteSucursales(Empl_Id:number,FechaInicio: string, FechaFinal: string): Observable<ReporteSucursal> {
    return this.http.get<ReporteSucursal>(`${BASE_URL}API/Factura/ReporteSucursal/${Empl_Id}/${FechaInicio}/${FechaFinal}`);
  }

  Url = 'http://sistemarestaurante.somee.com/API/Factura/List';
  getFacturas (){
    return this.http.get<Factura[]>(this.Url);
  }

  ComplementoURL = 'http://sistemarestaurante.somee.com/ComplementoAutoCompletado';
  getComplemento (){
    return this.http.get<Complemento[]>(this.ComplementoURL);
  }

  PostreUrl = 'http://sistemarestaurante.somee.com/PostreAutoCompletado';
  getPostre (){
    return this.http.get<Postre[]>(this.PostreUrl);
  }

  BebidaUrl = 'http://sistemarestaurante.somee.com/AutoCompletado';
  getBebida (){
    return this.http.get<Bebida[]>(this.BebidaUrl);
  }

  PaqueteUrl = 'http://sistemarestaurante.somee.com/PaqueteAutoCompletado';
  getPaquete (){
    return this.http.get<Paquete[]>(this.PaqueteUrl);
  }

  ComboUrl = 'http://sistemarestaurante.somee.com/ComboAutoCompletado';
  getCombo (){
    return this.http.get<Combo[]>(this.ComboUrl);
  }
  FacturaDetalleURL = 'http://sistemarestaurante.somee.com/API/Factura/ListaDetalles';
  getFacturasDetalle(id){
    return this.http.get<FacturaDetalle[]>(`${this.FacturaDetalleURL}/${id}`)
  }



  EliminarDetalle = 'http://sistemarestaurante.somee.com/API/Factura/DeleteFactura';
  eliminarFacturaDetalle(fact_Id) : Observable<any>{
    return this.http.delete<any>(`${this.EliminarDetalle}/${fact_Id}`);
  }


  CrearFactura = 'http://sistemarestaurante.somee.com/API/Factura/Create/';
  EnviarFactura(Usua_id: number,Sucu_Id: number, Empl_Id: number,formData: any): Observable<any> {
    return this.http.post<any>(`${this.CrearFactura}${Usua_id}/${Sucu_Id}/${Empl_Id}`, formData).pipe(
      map(response => {
        console.log('Respuesta del servidor:', response);
        return response;
      }),
      catchError(error => {
        console.error('Error en la llamada al servicio:', error);
        throw error; // Relanzar el error para que el componente pueda manejarlo
      })
    );
  }
}
