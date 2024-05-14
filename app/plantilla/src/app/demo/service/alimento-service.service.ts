import { Injectable } from '@angular/core';
import {Alimento, Alimento2, AlimentoActualizar, CargarAlimentos, LlenarAlimentos} from '../models/AlimentosViewModel'
import {HttpClient} from '@angular/common/http'
import { Observable, map } from 'rxjs';
import { BASE_URL } from './UrlParaAPI';


@Injectable({
  providedIn: 'root'
})
export class AlimentosServiceService {

  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44332/API/Alimento/List';


  getAlimento (){
    return this.http.get<CargarAlimentos[]>(this.Url);
  }

  obtenerPostrePorId(idCombo: number): Observable<LlenarAlimentos> {
    return this.http.get<LlenarAlimentos>(`${BASE_URL}API/Alimento/Find/${idCombo}`);
  }


  EnviarImagen(file : any): Observable<any>{
    return this.http.post<Alimento2[]>(BASE_URL + 'API/Alimento/Subir/', file).pipe(
      map(response => {
        return response;
      }),
    );
  }
  

  agregar(modelo: Alimento2): Observable<Alimento2> {
    return this.http.post<Alimento2>(`${BASE_URL}` + 'API/Alimento/Insert', modelo);
  }

  eliminar(Dept_Codigo:number):Observable<void>{
    return this.http.delete<void>(BASE_URL + 'API/Alimento/Delete/' + Dept_Codigo	);
  }
  actualizar(modelo:AlimentoActualizar):Observable<AlimentoActualizar>{
   return this.http.put<AlimentoActualizar>(BASE_URL + 'API/Alimento/Update',modelo);
  }
}
