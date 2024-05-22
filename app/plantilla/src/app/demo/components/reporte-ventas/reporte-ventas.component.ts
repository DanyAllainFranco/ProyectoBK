import { Component,NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-reporte-ventas',
  templateUrl:'./reporte-ventas.component.html',
  styleUrls: ['./reporte-ventas.component.scss']
})

export class ReporteVentasComponent {

  DescargrPDF() {
   
}

}
 @NgModule({
  imports: [
    CommonModule,
    PdfViewerModule
  ],
  declarations: [ReporteVentasComponent]
})
export class ReporteVentasModule { }

