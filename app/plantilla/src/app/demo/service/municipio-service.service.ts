import { Injectable } from '@angular/core';
import { Municipio,Fill } from '../models/MunicipioViewModel';
import { dropDepartamento } from '../models/DepartamentosViewModel';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from './UrlParaAPI';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';
import { MensajeViewModel } from '../models/MensajeVIewModel';




@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  urlDrop = BASE_URL + 'API/Departamento/DropDown'

  getDropDownsDepartamentos(){
    return this.http.get<dropDepartamento[]>(this.urlDrop)
  }
  url = BASE_URL + 'API/Municipio/List'

  getMunicipios(){
    return this.http.get<Municipio[]>(this.url)
  }
  getFill(codigo: string): Observable<Fill> {
    return this.http.get<Fill>(`${BASE_URL + 'API/Municipio/Fill/' + codigo}`);
  }
  getDetalles(codigo: string): Observable<Fill> {
    return this.http.get<Fill>(`${BASE_URL + 'API/Municipio/Fill/' + codigo}`);
  }
  
  EnviarMunicipios(formData){
    return this.http.post(BASE_URL + 'API/Municipio/Insert/', formData)
  }
  EliminarMunicipios(ID): Observable<any>{
    return this.http.delete<any>(`${BASE_URL + 'API/Municipio/Delete/' + ID}`)
  }
  ActualizarMunicipios(formData){
    return this.http.put(BASE_URL + 'API/Municipio/Update/', formData)
  }

  
}
