import { Injectable } from '@angular/core';
import {PaquetesporComida} from '../models/PaquetesporComidaViewModel'
import {HttpClient} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class PaquetesporComidaServiceService {
  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44332/API/PaquetePorComida/List';
  getPaqueteporComida (){
    return this.http.get<PaquetesporComida[]>(this.Url);
  }
}
