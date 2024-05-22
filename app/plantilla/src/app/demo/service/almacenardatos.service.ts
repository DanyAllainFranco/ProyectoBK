import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlmacenardatosService {
  loadPermissions() {
    throw new Error('Method not implemented.');
  }
  private userIdSource = new Subject<number>();
  userId$ = this.userIdSource.asObservable();

  setUserId(userId: number) {
    this.userIdSource.next(userId);
  }
}
