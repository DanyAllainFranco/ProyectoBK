import { Injectable } from '@angular/core';
import {Factura,FacturaDetalle} from '../models/FacturaViewModel'
import {HttpClient} from '@angular/common/http'
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FacturaServiceService {

  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44332/API/FacturaContoller/List';
  getFacturas (){
    return this.http.get<Factura[]>(this.Url);
  }

  FacturaDetalleURL = 'https://localhost:44332/API/Factura/ListaDetalles/';
  getFacturasDetalle(id){
    return this.http.get<FacturaDetalle[]>(this.FacturaDetalleURL,id)
  }

 CrearFactura = 'https://localhost:44332/API/Factura/Creat' ;
  EnviarFactura(formData: any): Observable<any> {
    return this.http.post<any>(this.CrearFactura, formData).pipe(
      map(response => {
        return response;
      }),
    );
  }




//DROPDOWNS



//DROPDOWNS

  UrlAgregar =  'https://localhost:44332/API/FacturaContoller/Insert' ;
  agregar(modelo:Factura):Observable<Factura>{
    return this.http.post<Factura>(this.UrlAgregar,modelo);
  }
  
  UrlFactura = 'https://localhost:44332/API/FacturaContoller/Find';
    obtener(fact_id:number){
    return this.http.get<Factura>(`${this.UrlFactura}?Fact_Id=${fact_id}`);
  }
}
