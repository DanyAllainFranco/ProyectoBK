import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlimentosVendidos, Graficos } from '../models/GraficosViewModel';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { BASE_URL } from './UrlParaAPI';



@Injectable({
  providedIn: 'root'
})
export class ObtenerFiltros {

  constructor(private http: HttpClient) { }
  baseUrl = 'https://localhost:44332/API/ComboPersonal';


  obtenerAlimentosMasVendidos(Usua_Usuario:string,FechaInicio: string, FechaFinal: string): Observable<any> {
    return this.http.get<any>(`${BASE_URL}API/Factura/AlimentoMasVendido/${Usua_Usuario}/${FechaInicio}/${FechaFinal}`);
  }

  obtenerBebidaMasVendidos(Usua_Usuario:string,FechaInicio: string, FechaFinal: string): Observable<{ bebi_Descripcion: number, bebi_Precio: string,  bebi_Imagen:string, cantidadVentas: number }[]> {
    return this.http.get<{ bebi_Descripcion: number, bebi_Precio: string,  bebi_Imagen:string, cantidadVentas: number }[]>(`${BASE_URL}API/Factura/BebidaMasVendido/${Usua_Usuario}/${FechaInicio}/${FechaFinal}`);
  }


  obtenerComplementosMasVendidos(Usua_Usuario:string,FechaInicio: string, FechaFinal: string): Observable<{ comp_Descripcion: number, comp_Precio: string,  comp_Imagen:string, cantidadVentas: number }[]> {   console.log(FechaInicio)
    return this.http.get<{ comp_Descripcion: number, comp_Precio: string,  comp_Imagen:string, cantidadVentas: number }[]>(`${BASE_URL}API/Factura/ComplementosMasVendido/${Usua_Usuario}/${FechaInicio}/${FechaFinal}`);
  }

  obtenerPostresMasVendidos(Usua_Usuario:string,FechaInicio: string, FechaFinal: string): Observable<{ post_Descripcion: number, post_Precio: string,  post_Imagen:string, cantidadVentas: number }[]> {
    return this.http.get<{ post_Descripcion: number, post_Precio: string,  post_Imagen:string, cantidadVentas: number }[]>(`${BASE_URL}API/Factura/PostreMasVendido/${Usua_Usuario}/${FechaInicio}/${FechaFinal}`);
  }


  obtenerSucursalesTop5(Usua_Usuario:string,FechaInicio: string, FechaFinal: string): Observable<{ sucu_Descripcion: string,cantidadVentas: number }[]> {
    return this.http.get<{ sucu_Descripcion: string, cantidadVentas: number }[]>(`${BASE_URL}API/Factura/SucursalesTop5/${Usua_Usuario}/${FechaInicio}/${FechaFinal}`);
  }

  obtenerEmpleadosTop5(Usua_Usuario:string,FechaInicio: string, FechaFinal: string): Observable<{ empleado: string, cantidadVentas: number }[]> {
    return this.http.get<{ empleado: string, cantidadVentas: number }[]>(`${BASE_URL}API/Factura/EmpleadosTop5/${Usua_Usuario}/${FechaInicio}/${FechaFinal}`);
  }
  // obtenerAlimentosMasVendidos(Usua_Usuario:string,FechaInicio: string, FechaFinal: string): Observable<{ alim_Id: number, alim_Descripcion: string, totalPedidosAlimentos: number }[]> {
  //   const url = `${this.baseUrl}/GrafiAlimentosFiltro/${Usua_Usuario}/${FechaInicio}/${FechaFinal}`;
  //   console.log("Esta es la url:" + " " + url)
  //   return this.http.get<{ alim_Id: number, alim_Descripcion: string, totalPedidosAlimentos: number }[]>(url);
  // } 

  obtenerAlimentosFiltro(Usua_Usuario:string,FechaInicio: string, FechaFinal: string): Observable<{ alim_Id: number, alim_Descripcion: string, totalPedidosAlimentos: number }[]> {
    const url = `${this.baseUrl}/GrafiAlimentosFiltro/${Usua_Usuario}/${FechaInicio}/${FechaFinal}`;
    console.log("Esta es la url:" + " " + url)
    return this.http.get<{ alim_Id: number, alim_Descripcion: string, totalPedidosAlimentos: number }[]>(url);
  } 
  
  obtenerPostresFiltro(Usua_Usuario:string,FechaInicio: string, FechaFinal: string): Observable<{ post_id: number, post_Descripcion: string, totalPedidosAlimentos: number }[]> {
    const url = `${this.baseUrl}/GrafiPostresFiltro/${Usua_Usuario}/${FechaInicio}/${FechaFinal}`;
    console.log("Esta es la url:" + " " + url)
    return this.http.get<{ post_id: number, post_Descripcion: string, totalPedidosAlimentos: number }[]>(url);
  } 

  obtenerCombosFiltro(Usua_Usuario:string,FechaInicio: string, FechaFinal: string): Observable<{ comb_Id: number, comb_Descripcion: string, totalPedidosAlimentos: number }[]> {
    const url = `${this.baseUrl}/GrafiCombosFiltro/${Usua_Usuario}/${FechaInicio}/${FechaFinal}`;
    console.log("Esta es la url:" + " " + url)
    return this.http.get<{ comb_Id: number, comb_Descripcion: string, totalPedidosAlimentos: number }[]>(url);
  } 

  obtenerPaquetesFiltro(Usua_Usuario:string,FechaInicio: string, FechaFinal: string): Observable<{ paqe_Id: number, paqe_Descripcion: string, totalPedidosAlimentos: number }[]> {
    const url = `${this.baseUrl}/GrafiPaquetesFiltro/${Usua_Usuario}/${FechaInicio}/${FechaFinal}`;
    console.log("Esta es la url:" + " " + url)
    return this.http.get<{ paqe_Id: number, paqe_Descripcion: string, totalPedidosAlimentos: number }[]>(url);
  } 
}


@Injectable({
  providedIn: 'root'
})
export class AlimentomasPedidoServiceService {

  constructor(private http: HttpClient) { }
  baseUrl = 'https://localhost:44332/API/ComboPersonal';

  getAlimentomasPedido(Usua_Usuario: string) {
    const url = `${this.baseUrl}/GrafiAlimentos?Usua_Usuario=${Usua_Usuario}`;
    return this.http.get<Graficos[]>(url).pipe(
      catchError(error => {
        console.error('Error al obtener datos de alimentos:', error);
        return throwError(error);
      })
    );
  }
}

@Injectable({
  providedIn: 'root'
})
export class CombomasPedidoServiceService {

  constructor(private http: HttpClient) { }
  baseUrl = 'https://localhost:44332/API/ComboPersonal';

  getCombomasPedido(Usua_Usuario: string) {
    const url = `${this.baseUrl}/GrafiCombos?Usua_Usuario=${Usua_Usuario}`;
    return this.http.get<Graficos[]>(url);
  }
}

@Injectable({
  providedIn: 'root'
})
export class PaquetemasPedidoServiceService {

  constructor(private http: HttpClient) { }
  baseUrl = 'https://localhost:44332/API/ComboPersonal';

  getPaquetemasPedido(Usua_Usuario: string) {
    const url = `${this.baseUrl}/GrafiPaquetes?Usua_Usuario=${Usua_Usuario}`;
    return this.http.get<Graficos[]>(url);
  }

}

@Injectable({
  providedIn: 'root'
})
export class PostremasPedidoServiceService {

  constructor(private http: HttpClient) { }
  baseUrl = 'https://localhost:44332/API/ComboPersonal';

  getPostremasPedido(Usua_Usuario: string) {
    const url = `${this.baseUrl}/GrafiPostres?Usua_Usuario=${Usua_Usuario}`;
    return this.http.get<Graficos[]>(url);
  }
}



