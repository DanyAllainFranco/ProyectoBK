import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Graficos } from '../models/GraficosViewModel';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ObtenerFiltros {

  constructor(private http: HttpClient) { }
  baseUrl = 'https://localhost:44332/API/ComboPersonal';

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



