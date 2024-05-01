import { Injectable } from '@angular/core';
import {EstadoCivil} from '../models/EstadoCivilViewModel'
import {HttpClient} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class EstadoCivilServiceService {

  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44332/API/EstadoCivil/List';

  getEstadoCivil (){
    return this.http.get<EstadoCivil[]>(this.Url);
  }
}
