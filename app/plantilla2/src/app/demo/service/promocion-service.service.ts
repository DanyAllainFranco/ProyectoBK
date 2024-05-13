import { Injectable } from '@angular/core';
import {Promocion} from '../models/PromocionViewModel'
import {HttpClient} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class PromocionServiceService {

  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44332/API/Promocion/List';

  getPromocion (){
    return this.http.get<Promocion[]>(this.Url);
  }
}
