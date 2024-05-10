import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Rol} from '../models/RolesViewModel'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pantallas, PantallasAgregadas } from '../models/PantallaViewMode';
import { Respuesta } from '../models/ServiceResult';
import { BASE_URL } from './UrlParaAPI';
@Injectable({
  providedIn: 'root'
})
export class RolService {
  successMessage: string = '';
  constructor(private http: HttpClient) { }

  getRol (){
    return this.http.get<Rol[]>(BASE_URL + "API/Rol/List");
  }

  getPantallas(): Observable<Pantallas[]> {
    return this.http.get<Pantallas[]>( BASE_URL + "API/Rol/ListPantallas");
  }
  getPantallas2(RolId: number): Observable<Pantallas[]> {
    return this.http.get<Pantallas[]>( BASE_URL + "API/Rol/ListPantallas2/" + RolId);
  }
  getPantallasAgregadas(Rol_Id: number): Observable<PantallasAgregadas[]> {
    return this.http.get<PantallasAgregadas[]>( BASE_URL + "API/Rol/PantallasAgregadas/" + Rol_Id);
  }
  
  agregar(modelo: Rol): Observable<Respuesta> {
    console.log(modelo)
    return this.http.post<Respuesta>(`${BASE_URL}API/Rol/Insert`, modelo);
  }
  agregarPantallaARol(pantIds: number[], rolId: number, Usua_Id: number): Observable<Respuesta> {
    console.log(pantIds + " " + rolId)
    return this.http.post<Respuesta>(`${BASE_URL}API/Rol/Agregarpant`, { pantIds, rolId, Usua_Id });
}

eliminarPantallasDeRol(RolId: number): Observable<Respuesta> {
  return this.http.delete<Respuesta>(`${BASE_URL}API/Rol/EliminarPantallas/${RolId}`);
}

  actualizar(modelo:Rol):Observable<Rol>{
    return this.http.put<Rol>(`${BASE_URL}API/Rol/Update`,modelo);
  }
  
  eliminar(idDepartamento:string):Observable<void>{
    return this.http.delete<void>(`${BASE_URL}API/Rol/Delete/${idDepartamento}`);
  }
  obtenerRolPorId(idRol: number): Observable<Rol> {
    return this.http.get<Rol>(`${BASE_URL}API/Rol/Find?Rol_Id=${idRol}`);
  }
}
