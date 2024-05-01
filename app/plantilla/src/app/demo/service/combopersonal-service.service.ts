import { Injectable } from '@angular/core';
import {ComboPersonal} from '../models/ComboPersonalViewModel'
import {HttpClient} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class ComboPersonalServiceService {

  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44332/API/ComboPersonal/List';

  getComboPersonal (){
    return this.http.get<ComboPersonal[]>(this.Url);
  }
}
