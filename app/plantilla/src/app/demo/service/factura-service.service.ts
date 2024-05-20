import { Injectable } from '@angular/core';
import {Factura,FacturaDetalle,Complemento,Bebida,Combo,Postre,Paquete} from '../models/FacturaViewModel'
import {HttpClient} from '@angular/common/http'
import { Observable, catchError, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FacturaServiceService {

  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44332/API/Factura/List';
  getFacturas (){
    return this.http.get<Factura[]>(this.Url);
  }

  ComplementoURL = 'https://localhost:44332/ComplementoAutoCompletado';
  getComplemento (){
    return this.http.get<Complemento[]>(this.ComplementoURL);
  }

  PostreUrl = 'https://localhost:44332/PostreAutoCompletado';
  getPostre (){
    return this.http.get<Postre[]>(this.PostreUrl);
  }

  BebidaUrl = 'https://localhost:44332/AutoCompletado';
  getBebida (){
    return this.http.get<Bebida[]>(this.BebidaUrl);
  }

  PaqueteUrl = 'https://localhost:44332/PaqueteAutoCompletado';
  getPaquete (){
    return this.http.get<Paquete[]>(this.PaqueteUrl);
  }

  ComboUrl = 'https://localhost:44332/ComboAutoCompletado';
  getCombo (){
    return this.http.get<Combo[]>(this.ComboUrl);
  }
  FacturaDetalleURL = 'https://localhost:44332/API/Factura/ListaDetalles';
  getFacturasDetalle(id){
    return this.http.get<FacturaDetalle[]>(`${this.FacturaDetalleURL}/${id}`)
  }



  EliminarDetalle = 'https://localhost:44332/API/Factura/DeleteFactura';
  eliminarFacturaDetalle(fact_Id) : Observable<any>{
    return this.http.delete<any>(`${this.EliminarDetalle}/${fact_Id}`);
  }


  CrearFactura = 'https://localhost:44332/API/Factura/Create';
  EnviarFactura(formData: any): Observable<any> {
    return this.http.post<any>(this.CrearFactura, formData).pipe(
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
