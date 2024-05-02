import { Injectable } from '@angular/core';
import {Sucursales} from '../models/SucursalesViewModel'
import {HttpClient} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class SucursalServiceService {

  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44332/API/Sucursal/List';
  getSucursal (){
    return this.http.get<Sucursales[]>(this.Url);
  }
}
