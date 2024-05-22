import { Injectable } from '@angular/core';
import {PromocionComida} from '../models/PromocionPorComidaViewModel'
import {HttpClient} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class PromocionPorComidaServiceService {

  constructor(private http: HttpClient) { }
  Url = 'http://sistemarestaurante.somee.com/API/PromocionPorComida/List';

  getPromocionPorComida (){
    return this.http.get<PromocionComida[]>(this.Url);
  }
}
