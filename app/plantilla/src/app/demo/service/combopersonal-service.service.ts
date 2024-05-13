import { Injectable } from '@angular/core';

import { BASE_URL } from './UrlParaAPI';
import { ComboPEnviar, ComboPersonal,Fill, Llenar } from '../models/ComboPersonalViewModel';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';
import { dropBebida } from '../models/BebidasViewModel';
import { dropComplemento } from '../models/ComplementoViewModel';
import { dropAlimento } from '../models/AlimentosViewModel';
import { dropPostre } from '../models/PostreViewModel';
import { Respuesta } from '../models/ServiceResult';



@Injectable({
  providedIn: 'root'
})
export class ComboPersonalServiceService {
  successMessage: string = '';
  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44332/API/ComboPersonal/List';

  getComboPersonal (){
    return this.http.get<ComboPersonal[]>(this.Url);
  }

  getDetalles(codigo: string): Observable<Fill> {
    return this.http.get<Fill>(`${BASE_URL + 'API/Municipio/Fill/' + codigo}`);
  }
  actualizar(modelo:ComboPEnviar):Observable<Respuesta>{
    return this.http.put<Respuesta>(`${BASE_URL}API/ComboPersonal/Update`,modelo);
  }

  urlDropBe = BASE_URL + 'API/Bebida/DropDown'

  getDropDownsBebidas(){
    return this.http.get<dropBebida[]>(this.urlDropBe)
  }


  urlDropPos = BASE_URL + 'API/Postre/DropDown'
  getDropDownsPostres(){
    return this.http.get<dropPostre[]>(this.urlDropPos)
  }

  eliminar(idDepartamento:number):Observable<void>{
    return this.http.delete<void>(`${BASE_URL}API/ComboPersonal/Delete/${idDepartamento}`);
  }


  urlDropC = BASE_URL + 'API/Complemento/DropDown'

  getDropDownComplemento(){
    return this.http.get<dropComplemento[]>(this.urlDropC)
  }


  urlDropAli = BASE_URL + 'API/Alimento/DropDown'

  getDropDownsAlimento(){
    return this.http.get<dropAlimento[]>(this.urlDropAli)
  }




  agregar(modelo: ComboPEnviar): Observable<Respuesta> {
    console.log(modelo)
    return this.http.post<Respuesta>(`${BASE_URL}API/ComboPersonal/Insert`, modelo);
  }
  

  EnviarComboP(formData: any): Observable<any> {
    return this.http.post<any>(BASE_URL + 'API/ComboPersonal/Insert/', formData).pipe(
      map(response => {
        return response;
      }),
    );
  }

  obtenerComboPorId(idCombo: number): Observable<Llenar> {
    return this.http.get<Llenar>(`${BASE_URL}API/ComboPersonal/Fill/${idCombo}`);
  }

  getFill(codigo: string): Observable<Fill> {
    return this.http.get<Fill>(`${BASE_URL + 'API/ComboPersonal/Fill/' + codigo}`);
  }
  EliminarComboP(ID): Observable<any>{
    return this.http.delete<any>(`${BASE_URL + 'API/ComboPersonal/Delete/' + ID}`)
  }
  ActualizarComboP(formData){
    return this.http.put(BASE_URL + 'API/ComboPersonal/Update/', formData)
  }


}
