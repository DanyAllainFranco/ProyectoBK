import { Injectable } from '@angular/core';
import {Complemento} from '../models/ComplementoViewModel'
import {HttpClient} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class ComplementoServiceService {

  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44332/API/Complemento/List';

  getComplemento (){
    return this.http.get<Complemento[]>(this.Url);
  }
}
