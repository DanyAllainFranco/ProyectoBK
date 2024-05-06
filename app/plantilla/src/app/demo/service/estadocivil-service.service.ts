import { Injectable } from '@angular/core';
import {Estado, Fill} from '../models/EstadoCivilViewModel'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EstadoCivilServiceService {

  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44332/API/EstadoCivil/List';

  getEstadoCivil (){
    return this.http.get<Estado[]>(this.Url);
  }



  EnviarEstadoCivil(formData: any): Observable<any> {
    return this.http.post<any>('https://localhost:44332/API/EstadoCivil/Insert', formData).pipe(
      map(response => {
        return response;
      }),
    );
  }

  getFill(codigo: string): Observable<Fill> {
    return this.http.get<Fill>('https://localhost:44332/API/EstadoCivil/Fill/' + codigo);
  }

  EliminarEstadoCivil(ID): Observable<any>{
    return this.http.delete<any>('https://localhost:44332/API/EstadoCivil/Delete/' + ID)
  }
  ActualizarEstadoCivil(formData){
    return this.http.put('https://localhost:44332/API/EstadoCivil/Update/', formData)
  }
}
