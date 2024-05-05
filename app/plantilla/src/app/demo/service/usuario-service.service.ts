import { Injectable } from '@angular/core';
import {Login} from '../models/LoginViewModel';
import {Usuario} from '../models/UsuariosViewModel'
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuariosServiceService {

  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44332/API/Usuario/List';
  getUsuario (){
    return this.http.get<Usuario[]>(this.Url);
  }

  UrlLogin = 'https://localhost:44332/API/Usuario/Login';
  login(loginData: Login): Observable<any> {
    return this.http.get<any>(`${this.UrlLogin}?Usua_Usuario=${loginData.Usua_Usuario}&Usua_Contra=${loginData.Usua_Contra}`);
  }
}  
