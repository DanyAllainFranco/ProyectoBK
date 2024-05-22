import { Injectable } from '@angular/core';
import {AlimentosAgregados, BebidasAgregadas, CargarDias, ComplementosAgregados, LlenarPromocion, PostresAgregados, Promocion, Promociones, SucursalesAgregados} from '../models/PromocionViewModel'
import {HttpClient} from '@angular/common/http'
import { Alimento, Alimentos } from '../models/AlimentosViewModel';
import { Observable, map } from 'rxjs';
import { BASE_URL } from './UrlParaAPI';
import { Respuesta } from '../models/ServiceResult';
import { Rol } from '../models/RolesViewModel';
import { Bebida, Bebidas, Complemento, Postre, SucursalesPromocion } from '../models/BebidasViewModel';


@Injectable({
  providedIn: 'root'
})
export class PromocionServiceService {
  successMessage: string = '';
  constructor(private http: HttpClient) { }
  Url = 'http://sistemarestaurante.somee.com/API/Promocion/List';


  actualizar(modelo:Promociones):Observable<Respuesta>{
    return this.http.put<Respuesta>(`${BASE_URL}API/Promocion/Update`,modelo);
  }
  eliminar(Dept_Codigo:string):Observable<void>{
    return this.http.delete<void>(BASE_URL + 'API/Promocion/Delete/' + Dept_Codigo	);
  }

  EnviarImagen(file : any): Observable<any>{
    return this.http.post<Promocion[]>(BASE_URL + 'API/Promocion/Subir/', file).pipe(
      map(response => {
        return response;
      }),
    );
  }
  getPromocion (){
    return this.http.get<Promocion[]>(this.Url);
  }
  getDias (){
    return this.http.get<CargarDias[]>(BASE_URL + "API/Promocion/ListDias");
  }
  

  eliminarAlimentos(RolId: number): Observable<Respuesta> {
    return this.http.delete<Respuesta>(`${BASE_URL}API/Promocion/EliminarAlimentos/${RolId}`);
  }
  eliminarBebidas(RolId: number): Observable<Respuesta> {
    return this.http.delete<Respuesta>(`${BASE_URL}API/Promocion/EliminarBebidas/${RolId}`);
  }
  eliminarPostres(RolId: number): Observable<Respuesta> {
    return this.http.delete<Respuesta>(`${BASE_URL}API/Promocion/EliminarPostres/${RolId}`);
  }
  eliminarComplementos(RolId: number): Observable<Respuesta> {
    return this.http.delete<Respuesta>(`${BASE_URL}API/Promocion/EliminarComplementos/${RolId}`);
  }

  eliminarSucursales(RolId: number): Observable<Respuesta> {
    return this.http.delete<Respuesta>(`${BASE_URL}API/Promocion/EliminarSucursales/${RolId}`);
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

  getSucursales(RolId: number): Observable<SucursalesPromocion[]> {
    return this.http.get<SucursalesPromocion[]>( BASE_URL + "API/Promocion/ListSucursales/" + RolId);
  }

  agregar(modelo: Promociones): Observable<Respuesta> {
    console.log(modelo)
    return this.http.post<Respuesta>(`${BASE_URL}API/Promocion/Insert`, modelo);
  }
  
  obtenerPromoPorId(idRol: number): Observable<LlenarPromocion> {
    return this.http.get<LlenarPromocion>(`${BASE_URL}API/Promocion/Fill/${idRol}`);
  }

  obtenerPaquePorId(idRol: number): Observable<any> {
    return this.http.get<any>(`${BASE_URL}API/Paquete/Find/${idRol}`);
  }

  getPostresAgregadas(Rol_Id: number): Observable<PostresAgregados[]> {
    return this.http.get<PostresAgregados[]>( BASE_URL + "API/Promocion/PostresAgregados/" + Rol_Id);
  }
  getComplementosAgregadas(Rol_Id: number): Observable<ComplementosAgregados[]> {
    return this.http.get<ComplementosAgregados[]>( BASE_URL + "API/Promocion/ComplementosAgregados/" + Rol_Id);
  }
  getBebidasAgregadas(Rol_Id: number): Observable<BebidasAgregadas[]> {
    return this.http.get<BebidasAgregadas[]>( BASE_URL + "API/Promocion/BebidasAgregadas/" + Rol_Id);
  }

  getAlimentosAgregadas(Rol_Id: number): Observable<AlimentosAgregados[]> {
    return this.http.get<AlimentosAgregados[]>( BASE_URL + "API/Promocion/AlimentosAgregados/" + Rol_Id);
  }

  getSucursalesAgregadas(Rol_Id: number): Observable<SucursalesAgregados[]> {
    return this.http.get<SucursalesAgregados[]>( BASE_URL + "API/Promocion/SucursalesAgregadas/" + Rol_Id);
  }

  agregarAlimentos(AlimIds: number[], PromId: number): Observable<Respuesta> {
    console.log("PRUEBA2: " + AlimIds + " " + PromId)
    return this.http.post<Respuesta>(`${BASE_URL}API/Promocion/AgregarAlimentos`, { AlimIds, PromId});
}

agregarBebidas(BebiIds: number[], PromId: number): Observable<Respuesta> {
  console.log("PRUEBA2: " + BebiIds + " " + PromId)
  return this.http.post<Respuesta>(`${BASE_URL}API/Promocion/AgregarBebidas`, { BebiIds, PromId});
}

agregarPostres(PostIds: number[], PromId: number): Observable<Respuesta> {
  console.log("PRUEBA2: " + PostIds + " " + PromId)
  return this.http.post<Respuesta>(`${BASE_URL}API/Promocion/AgregarPostres`, { PostIds, PromId});
}

agregarComplementos(CompIds: number[], PromId: number): Observable<Respuesta> {
  console.log("PRUEBA2: " + CompIds + " " + PromId)
  return this.http.post<Respuesta>(`${BASE_URL}API/Promocion/AgregarComplementos`, { CompIds, PromId});
}

agregarSucursales(SucuIds: number[], PromId: number, Usua_Id): Observable<Respuesta> {
  console.log("PRUEBA2: " + SucuIds + " " + PromId)
  return this.http.post<Respuesta>(`${BASE_URL}API/Promocion/AgregarSucursales`, { SucuIds, PromId, Usua_Id});
}

}
