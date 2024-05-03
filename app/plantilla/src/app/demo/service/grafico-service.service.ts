import { Injectable } from '@angular/core';
import {Graficos} from '../models/GraficosViewModel'
import {HttpClient} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class AlimentomasPedidoServiceService {

  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44332/API/ComboPersonal/GrafiAlimentos?Usua_Usuario=Admin';

  getAlimentomasPedido (){
    return this.http.get<Graficos[]>(this.Url);
  }
}

export class CombomasPedidoServiceService {

    constructor(private http: HttpClient) { }
    Url = 'https://localhost:44332/API/ComboPersonal/GrafiCombos?Usua_Usuario=Admin';
  
    getCombomasPedido (){
      return this.http.get<Graficos[]>(this.Url);
    }
  }

  
  export class PaquetemasPedidoServiceService {

    constructor(private http: HttpClient) { }
    Url = 'https://localhost:44332/API/ComboPersonal/GrafiPaquetes?Usua_Usuario=Admin';
  
    getPaquetemasPedido (){
      return this.http.get<Graficos[]>(this.Url);
    }
  }

  
  export class PostremasPedidoServiceService {

    constructor(private http: HttpClient) { }
    Url = 'https://localhost:44332/API/ComboPersonal/GrafiPostres?Usua_Usuario=Admin';
  
    getPostremasPedido (){
      return this.http.get<Graficos[]>(this.Url);
    }
  }
  