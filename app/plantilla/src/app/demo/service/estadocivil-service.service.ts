import { Injectable } from '@angular/core';
import {Estado, Estado2, Fill} from '../models/EstadoCivilViewModel'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';
import { BASE_URL } from './UrlParaAPI';


@Injectable({
  providedIn: 'root'
})
export class EstadoCivilServiceService {

  constructor(private http: HttpClient) { }


  Url = 'https://localhost:44332/API/EstadoCivil/List';

  getEstadoCivil (){
    return this.http.get<Estado[]>(this.Url);
  }

  agregar(modelo: Estado2): Observable<Estado2> {
    return this.http.post<Estado2>(`${BASE_URL}` + 'API/EstadoCivil/Create', modelo);
  }
  
  eliminar(Dept_Codigo:number):Observable<void>{
    return this.http.delete<void>(BASE_URL + 'API/EstadoCivil/Delete/' + Dept_Codigo	);
  }

  actualizar(modelo:Estado2):Observable<Estado2>{
    return this.http.put<Estado2>(BASE_URL + 'API/EstadoCivil/Update',modelo);
  }

  EnviarEstadoCivil(formData: any): Observable<any> {
    return this.http.post<any>('https://localhost:44332/API/EstadoCivil/Create', formData).pipe(
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
