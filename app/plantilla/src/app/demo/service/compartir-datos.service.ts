import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FacturaDetalle } from '../models/FacturaViewModel';

@Injectable({
  providedIn: 'root'
})
export class DatosCompartidosService {
  private facturaDetalleSource = new BehaviorSubject<FacturaDetalle[]>([]);
  facturaDetalleActual = this.facturaDetalleSource.asObservable();

  constructor() { }

  actualizarDetalleFactura(detalle: FacturaDetalle[]) {
    this.facturaDetalleSource.next(detalle);
  }
}