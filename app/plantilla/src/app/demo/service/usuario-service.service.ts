import { Injectable } from '@angular/core';
import {Usuario} from '../models/UsuariosViewModel'
import {HttpClient} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class UsuariosServiceService {

  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44332/API/Usuario/List';
  getUsuario (){
    return this.http.get<Usuario[]>(this.Url);
  }
}
