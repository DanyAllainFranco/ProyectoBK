import { Injectable } from '@angular/core';
import { BASE_URL } from './UrlParaAPI';
import { Empleado,EmpleadoDDL,Fill } from '../models/EmpleadoViewModel';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';
import { dropDepartamento } from '../models/DepartamentosViewModel';
import { CargarMunicipios, dropMunicipio } from '../models/MunicipioViewModel';
import { dropEstadoCivil } from '../models/EstadoCivilViewModel';
import { dropCargo } from '../models/CargosViewModel';
import { EmpleadosEnviar, LlenarEmpleados } from '../models/ClientesViewModel';
import { Respuesta } from '../models/ServiceResult';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http:HttpClient) { }
  url = BASE_URL + 'API/Empleado/List'
  successMessage: string = '';

  EmplDDL= 'http://sistemarestaurante.somee.com/API/Empleado/EmpleadoDDL';
  EmpleadoDDL (){
    return this.http.get<EmpleadoDDL[]>(this.EmplDDL);
  }

  obtenerCliePorId(idCombo: number): Observable<LlenarEmpleados> {
    return this.http.get<LlenarEmpleados>(`${BASE_URL}API/Empleado/Fill/${idCombo}`);
  }

  prueba = 'https://localhost:44332/API/Empleado/Insert';
  agregarEmpleados(modelo: EmpleadosEnviar): Observable<Respuesta> {

    console.log(modelo)
    return this.http.post<Respuesta>(this.prueba, modelo);
  }


  obtenerClientePorId(idCombo: number): Observable<LlenarEmpleados> {
    return this.http.get<LlenarEmpleados>(`${BASE_URL}API/Empleado/Fill/${idCombo}`);
  }

  
  eliminar(idDepartamento:number):Observable<void>{
    return this.http.delete<void>(`${BASE_URL}API/Cliente/Delete/${idDepartamento}`);
  }

  actualizar(modelo:EmpleadosEnviar):Observable<Respuesta>{
    return this.http.put<Respuesta>(`${BASE_URL}API/Empleado/Update`,modelo);
  }













  urlDrop = BASE_URL + 'API/Departamento/DropDown'

  getDropDownsDepartamentos(){
    return this.http.get<dropDepartamento[]>(this.urlDrop)
  }

  getMunicipios(codigo){
    return this.http.get<dropMunicipio[]>(BASE_URL + 'API/Municipio/Lista/' + codigo )
  }

  getMunicipiosPorDepartamento(codigo){
    return this.http.get<CargarMunicipios[]>(BASE_URL + 'API/Municipio/MunicipioPorDepartamento/' + codigo )
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
