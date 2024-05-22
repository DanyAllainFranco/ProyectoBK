import { Injectable } from '@angular/core';
import {PromocionSucursal} from '../models/PromocionPorSucursalViewModel'
import {HttpClient} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class PromocionPorSucursalServiceService {

  constructor(private http: HttpClient) { }
  Url = 'http://sistemarestaurante.somee.com/API/PromocionPorSucursal/List';

  getPromocionPorSucursal (){
    return this.http.get<PromocionSucursal[]>(this.Url);
  }
}
