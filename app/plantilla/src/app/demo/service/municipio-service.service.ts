import { Injectable } from '@angular/core';
import {Municipio} from '../models/MunicipioViewModel'
import {HttpClient} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class MunicipioServiceService {

  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44332/API/Municipio/List';

  getMunicipio (){
    return this.http.get<Municipio[]>(this.Url);
  }
}
