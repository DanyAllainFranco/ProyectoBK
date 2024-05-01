import { Injectable } from '@angular/core';
import {PromocionComida} from '../models/PromocionPorComidaViewModel'
import {HttpClient} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class PromocionPorComidaServiceService {

  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44332/API/PromocionPorComida/List';

  getPromocionPorComida (){
    return this.http.get<PromocionComida[]>(this.Url);
  }
}
