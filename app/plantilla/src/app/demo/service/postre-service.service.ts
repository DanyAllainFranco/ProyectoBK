import { Injectable } from '@angular/core';
import { BASE_URL } from './UrlParaAPI';
import {Postre,Fill } from '../models/PostreViewModel'
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PostreServiceService {

  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44332/API/Postre/List';

  getPostre (){
    return this.http.get<Postre[]>(this.Url);
  }

  EnviarPost(formData: any): Observable<any> {
    return this.http.post<any>(BASE_URL + 'API/Postre/Insert/', formData).pipe(
      map(response => {
        return response;
      }),
    );
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