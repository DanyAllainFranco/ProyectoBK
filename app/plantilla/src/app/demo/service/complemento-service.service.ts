import { Injectable } from '@angular/core';
import { BASE_URL } from './UrlParaAPI';
import { CargarComplementos, Complemento,Fill } from '../models/ComplementoViewModel';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplementoServiceService {

  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44332/API/Complemento/List';

  getComplemento (){
    return this.http.get<CargarComplementos[]>(this.Url);
  }


  EnviarComp(formData: any): Observable<any> {
    return this.http.post<any>(BASE_URL + 'API/Complemento/Insert/', formData).pipe(
      map(response => {
        return response;
      }),
    );
  }

    
  getFill(codigo: string): Observable<Fill> {
    return this.http.get<Fill>(`${BASE_URL + 'API/Complemento/Fill/' + codigo}`);
  }
  EliminarComp(ID): Observable<any>{
    return this.http.delete<any>(`${BASE_URL + 'API/Complemento/Delete/' + ID}`)
  }
  ActualizarComp(formData){
    return this.http.put(BASE_URL + 'API/Complemento/Update/', formData)
  }
}
