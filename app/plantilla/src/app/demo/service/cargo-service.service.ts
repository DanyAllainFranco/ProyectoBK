import { Injectable } from '@angular/core';
import {Cargos} from '../models/CargosViewModel'
import {HttpClient} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class CargosServiceService {

  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44332/API/Cargo/List';
  getCargo (){
    return this.http.get<Cargos[]>(this.Url);
  }
}
