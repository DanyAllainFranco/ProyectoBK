import { Injectable } from '@angular/core';
import {CargarDias, Promocion, Promociones} from '../models/PromocionViewModel'
import {HttpClient} from '@angular/common/http'
import { Alimento, Alimentos } from '../models/AlimentosViewModel';
import { Observable } from 'rxjs';
import { BASE_URL } from './UrlParaAPI';
import { Respuesta } from '../models/ServiceResult';
import { Rol } from '../models/RolesViewModel';
import { Bebida, Bebidas, Complemento, Postre } from '../models/BebidasViewModel';


@Injectable({
  providedIn: 'root'
})
export class PromocionServiceService {
  successMessage: string = '';
  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44332/API/Promocion/List';

  getPromocion (){
    return this.http.get<Promocion[]>(this.Url);
  }
  getDias (){
    return this.http.get<CargarDias[]>(BASE_URL + "API/Promocion/ListDias");
  }
  
  getAlimentos(RolId: number): Observable<Alimentos[]> {
    return this.http.get<Alimentos[]>( BASE_URL + "API/Promocion/ListAlimentos/" + RolId);
  }

  getBebidas(RolId: number): Observable<Bebida[]> {
    return this.http.get<Bebida[]>( BASE_URL + "API/Promocion/ListBebidas/" + RolId);
  }

  getPostres(RolId: number): Observable<Postre[]> {
    return this.http.get<Postre[]>( BASE_URL + "API/Promocion/ListPostres/" + RolId);
  }

  getComplementos(RolId: number): Observable<Complemento[]> {
    return this.http.get<Complemento[]>( BASE_URL + "API/Promocion/ListComplementos/" + RolId);
  }

  agregar(modelo: Promociones): Observable<Respuesta> {
    console.log(modelo)
    return this.http.post<Respuesta>(`${BASE_URL}API/Promocion/Insert`, modelo);
  }

  agregarAlimentos(AlimIds: number[], PromId: number): Observable<Respuesta> {
    console.log("PRUEBA2: " + AlimIds + " " + PromId)
    return this.http.post<Respuesta>(`${BASE_URL}API/Promocion/AgregarAlimentos`, { AlimIds, PromId});
}
}
