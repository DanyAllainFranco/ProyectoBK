import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'; 
@Injectable({
  providedIn: 'root'
})
export class MostrarmensajeService {
  private successMessageSource = new Subject<string>();
  successMessage$ = this.successMessageSource.asObservable();

  constructor() { }

  addSuccessMessage(message: string) {
    this.successMessageSource.next(message);
  }
}
