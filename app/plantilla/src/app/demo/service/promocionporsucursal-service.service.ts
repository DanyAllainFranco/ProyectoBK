import { Injectable } from '@angular/core';
import {PromocionSucursal} from '../models/PromocionPorSucursalViewModel'
import {HttpClient} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class PromocionPorSucursalServiceService {

  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44332/API/PromocionPorSucursal/List';

  getPromocionPorSucursal (){
    return this.http.get<PromocionSucursal[]>(this.Url);
  }
}
