import { Injectable } from '@angular/core';
import {PaquetesporComida} from '../models/PaquetesporComidaViewModel'
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { BASE_URL } from './UrlParaAPI';


@Injectable({
  providedIn: 'root'
})
export class PaquetesporComidaServiceService {
  constructor(private http: HttpClient) { }
  Url = 'http://sistemarestaurante.somee.com/API/PaquetePorComida/List';
  getPaqueteporComida (){
    return this.http.get<PaquetesporComida[]>(this.Url);
  }


  getAlimentos3(Rol_Id: number): Observable<any[]> {
    return this.http.get<any[]>( BASE_URL + "API/Paquete/ListAlimentos3/" + Rol_Id);
  }

  getBebidas3(Rol_Id: number): Observable<any[]> {
    return this.http.get<any[]>( BASE_URL + "API/Paquete/ListBebidas3/" + Rol_Id);
  }
  getPostres3(Rol_Id: number): Observable<any[]> {
    return this.http.get<any[]>( BASE_URL + "API/Paquete/ListPostres3/" + Rol_Id);
  }

  getComplementos3(Rol_Id: number): Observable<any[]> {
    return this.http.get<any[]>( BASE_URL + "API/Paquete/ListComplementos3/" + Rol_Id);
  }
  getAlimentosAgregadas(Rol_Id: number): Observable<any[]> {
    return this.http.get<any[]>( BASE_URL + "API/PaquetePorComida/MostrarAlimentos/" + Rol_Id);
  }

  getBebidasAgregadas(Rol_Id: number): Observable<any[]> {
    return this.http.get<any[]>( BASE_URL + "API/PaquetePorComida/MostrarBebidas/" + Rol_Id);
  }

  getPostresAgregadas(Rol_Id: number): Observable<any[]> {
    return this.http.get<any[]>( BASE_URL + "API/PaquetePorComida/MostrarPostres/" + Rol_Id);
  }

  getComplementosAgregadas(Rol_Id: number): Observable<any[]> {
    return this.http.get<any[]>( BASE_URL + "API/PaquetePorComida/MostrarComplementos/" + Rol_Id);
  }
}
