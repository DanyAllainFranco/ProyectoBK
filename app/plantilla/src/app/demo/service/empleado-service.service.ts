import { Injectable } from '@angular/core';
import {Empleado} from '../models/EmpleadoViewModel'
import {HttpClient} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class EmpleadoServiceService {

  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44332/API/Empleado/List';

  getEmpleado (){
    return this.http.get<Empleado[]>(this.Url);
  }
}
