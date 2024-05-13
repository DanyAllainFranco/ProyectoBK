import { Injectable } from '@angular/core';
import {Paquetes} from '../models/PaquetesViewModel'
import {HttpClient} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class PaquetesServiceService {

  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44332/API/Paquete/List';
  getPaquete (){
    return this.http.get<Paquetes[]>(this.Url);
  }
}
