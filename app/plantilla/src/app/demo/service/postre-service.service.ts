import { Injectable } from '@angular/core';
import { BASE_URL } from './UrlParaAPI';
import {Postre,Fill, Postre2, CargarPostres } from '../models/PostreViewModel'
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';
import { CargarAlimentos } from '../models/AlimentosViewModel';



@Injectable({
  providedIn: 'root'
})
export class PostreServiceService {

  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44332/API/Postre/List';

  getPostre (){
    return this.http.get<CargarPostres[]>(this.Url);
  }

  
  agregar(modelo: Postre2): Observable<Postre2> {
    return this.http.post<Postre2>(`${BASE_URL}` + 'API/Postre/Insert', modelo);
  }
  
  getFill(codigo: string): Observable<Fill> {
    return this.http.get<Fill>(`${BASE_URL + 'API/Postre/Fill/' + codigo}`);
  }
  EliminarPost(ID): Observable<any>{
    return this.http.delete<any>(`${BASE_URL + 'API/Postre/Delete/' + ID}`)
  }
  ActualizarPost(formData){
    return this.http.put(BASE_URL + 'API/Postre/Update/', formData)
  }
}