import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Graficos } from '../models/GraficosViewModel';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


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
