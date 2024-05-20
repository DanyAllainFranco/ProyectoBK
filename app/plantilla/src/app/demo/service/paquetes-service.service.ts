import { Injectable } from '@angular/core';
import {LlenarPaquetes, Paquetes, PaquetesDetalles, PaquetesEnviar} from '../models/PaquetesViewModel'
import {HttpClient} from '@angular/common/http'
import { Respuesta } from '../models/ServiceResult';
import { BASE_URL } from './UrlParaAPI';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PaquetesServiceService {
  successMessage: string = '';
  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44332/API/Paquete/List';
  getPaquete (){
    return this.http.get<Paquetes[]>(this.Url);
  }
  agregar(modelo: PaquetesEnviar): Observable<Respuesta> {
    console.log(modelo)
    return this.http.post<Respuesta>(`${BASE_URL}API/Paquete/Insert`, modelo);
  }

  agregarDetalle(modelo: PaquetesDetalles): Observable<Respuesta> {
    console.log(modelo)
    return this.http.post<Respuesta>(`${BASE_URL}API/PaquetePorComida/Insert`, modelo);
  }
  obtenerPaquetePorId(idCombo: number): Observable<LlenarPaquetes> {
    return this.http.get<LlenarPaquetes>(`${BASE_URL}API/Paquete/Find/${idCombo}`);
  }

  actualizar(modelo:PaquetesEnviar):Observable<Respuesta>{
    return this.http.put<Respuesta>(`${BASE_URL}API/Paquete/Update`,modelo);
  }

  EnviarImagen(file : any): Observable<any>{
    return this.http.post<Paquetes[]>(BASE_URL + 'API/Paquete/Subir/', file).pipe(
      map(response => {
        return response;
      }),
    );
  }

}
