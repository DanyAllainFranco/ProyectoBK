import { Injectable } from '@angular/core';
import {Alimento} from '../models/AlimentosViewModel'
import {HttpClient} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class AlimentosServiceService {

  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44332/API/Alimento/List';
  getAlimento (){
    return this.http.get<Alimento[]>(this.Url);
  }
}
