import { Injectable } from '@angular/core';
import { BASE_URL } from './UrlParaAPI';
import { Empleado,Fill } from '../models/EmpleadoViewModel';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';
import { dropDepartamento } from '../models/DepartamentosViewModel';
import { dropMunicipio } from '../models/MunicipioViewModel';
import { dropEstadoCivil } from '../models/EstadoCivilViewModel';
import { dropCargo } from '../models/CargosViewModel';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http:HttpClient) { }
  url = BASE_URL + 'API/Empleado/List'


  urlDrop = BASE_URL + 'API/Departamento/DropDown'

  getDropDownsDepartamentos(){
    return this.http.get<dropDepartamento[]>(this.urlDrop)
  }

  getMunicipios(codigo){
    return this.http.get<dropMunicipio[]>(BASE_URL + 'API/Municipio/Lista/' + codigo )
  }



  urlDropC = BASE_URL + 'API/Cargo/DropDown'

  getDropDownCargo(){
    return this.http.get<dropCargo[]>(this.urlDropC)
  }
  urlDropE = BASE_URL + 'API/EstadoCivil/DropDown'

  getDropDownsEstado(){
    return this.http.get<dropEstadoCivil[]>(this.urlDropE)
  }









  getEmpleados(){
    return this.http.get<Empleado[]>(this.url)
  }

  


  EnviarEmpleado(formData: any): Observable<any> {
    return this.http.post<any>(BASE_URL + 'API/Empleado/Insert/', formData).pipe(
      map(response => {
        return response;
      }),
    );
  }

    
  getFill(codigo: string): Observable<Fill> {
    return this.http.get<Fill>(`${BASE_URL + 'API/Empleado/Fill/' + codigo}`);
  }
  EliminarEmpleado(ID): Observable<any>{
    return this.http.delete<any>(`${BASE_URL + 'API/Empleado/Delete/' + ID}`)
  }
  ActualizarEmpleado(formData){
    return this.http.put(BASE_URL + 'API/Empleado/Update/', formData)
  }

}
