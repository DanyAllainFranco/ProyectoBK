import { Injectable } from '@angular/core';
import {Postre} from '../models/PostreViewModel'
import {HttpClient} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class PostreServiceService {

  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44332/API/Postre/List';

  getPostre (){
    return this.http.get<Postre[]>(this.Url);
  }
}
