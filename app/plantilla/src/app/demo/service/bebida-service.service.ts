import { Injectable } from '@angular/core';
import {Bebida2, BebidaActualizar, Bebidas, CargarBebidas, LlenarBebidas} from '../models/BebidasViewModel'
import {HttpClient} from '@angular/common/http'
import { BASE_URL } from './UrlParaAPI';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BebidasServiceService {

  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44332/API/Bebida/List';
  getBebidas (){
    return this.http.get<CargarBebidas[]>(this.Url);
  }

  obtenerBebidaPorId(idCombo: number): Observable<LlenarBebidas> {
    return this.http.get<LlenarBebidas>(`${BASE_URL}API/Bebida/Find/${idCombo}`);
  }

  EnviarImagen(file : any): Observable<any>{
    return this.http.post<Bebida2[]>(BASE_URL + 'API/Bebida/Subir/', file).pipe(
      map(response => {
        return response;
      }),
    );
  }
  agregar(modelo: Bebida2): Observable<Bebida2> {
    return this.http.post<Bebida2>(`${BASE_URL}` + 'API/Bebida/Insert', modelo);
  }
  
  eliminar(Dept_Codigo:number):Observable<void>{
    return this.http.delete<void>(BASE_URL + 'API/Bebida/Delete/' + Dept_Codigo	);
  }
  actualizar(modelo:BebidaActualizar):Observable<BebidaActualizar>{
    return this.http.put<BebidaActualizar>(BASE_URL + 'API/Bebida/Update',modelo);
  }

}
