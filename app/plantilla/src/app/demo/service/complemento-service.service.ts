import { Injectable } from '@angular/core';
import { BASE_URL } from './UrlParaAPI';
import { CargarComplementos, Complemento,Complemento2,ComplementoActualizar,Fill, LlenarComplementos } from '../models/ComplementoViewModel';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplementoServiceService {

  constructor(private http: HttpClient) { }
  Url = 'http://sistemarestaurante.somee.com/API/Complemento/List';

  getComplemento (){
    return this.http.get<CargarComplementos[]>(this.Url);
  }

  obtenerCoplementoPorId(idCombo: number): Observable<LlenarComplementos> {
    return this.http.get<LlenarComplementos>(`${BASE_URL}API/Complemento/Fill/${idCombo}`);
  }

  EnviarImagen(file : any): Observable<any>{
    return this.http.post<Complemento2[]>(BASE_URL + 'API/Complemento/Subir/', file).pipe(
      map(response => {
        return response;
      }),
    );
  }


  agregar(modelo: Complemento2): Observable<Complemento2> {
    return this.http.post<Complemento2>(`${BASE_URL}` + 'API/Complemento/Insert', modelo);
  }
  
  eliminar(Dept_Codigo:number):Observable<void>{
    return this.http.delete<void>(BASE_URL + 'API/Complemento/Delete/' + Dept_Codigo	);
  }
  actualizar(modelo:ComplementoActualizar):Observable<ComplementoActualizar>{
    return this.http.put<ComplementoActualizar>(BASE_URL + 'API/Complemento/Update',modelo);
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
