import { Injectable } from '@angular/core';
import {Factura} from '../models/FacturaViewModel'
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FacturaServiceService {

  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44332/API/FacturaContoller/List';
  getFactura (){
    return this.http.get<Factura[]>(this.Url);
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
