import { Injectable } from '@angular/core';
import {Clientes} from '../models/ClientesViewModel'
import {HttpClient} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class ClientesServiceService {

  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44332/API/Cliente/List';
  getCliente (){
    return this.http.get<Clientes[]>(this.Url);
  }
}
