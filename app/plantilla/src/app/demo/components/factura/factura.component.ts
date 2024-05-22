import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { DatosCompartidosService } from '../../service/compartir-datos.service';
import { FacturaDetalle } from '../../models/FacturaViewModel';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss'],
  providers: [DatePipe] // Asegúrate de incluir DatePipe en los proveedores
})
export class FacturaComponent implements OnInit {
  clie_Nombre: string;
  producto: string;
  precio: string;
  cantidad: string;
  fact_Fecha: string; // Cambiado a string para almacenar la fecha formateada
  fact_Id: number;
  factura: FacturaDetalle[];
  sumaTotal: number = 0;

  constructor(private facturaService: DatosCompartidosService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.facturaService.facturaDetalleActual.subscribe(detalle => {
      if (detalle && detalle.length > 0) {
        this.factura = detalle;
        const primerDetalle = detalle[0]; 
        if (primerDetalle.producto) {
          this.producto = primerDetalle.producto;
        }
        if (primerDetalle.precio) {
          this.precio = primerDetalle.precio;
        }
        if (primerDetalle.cantidad) {
          this.cantidad = primerDetalle.cantidad;
        }
        if (primerDetalle.fact_Id) {
          this.fact_Id = primerDetalle.fact_Id;
        }
        if (primerDetalle.fact_Fecha) {
          this.fact_Fecha = this.datePipe.transform(primerDetalle.fact_Fecha, 'yyyy-MM-dd'); // Formatear la fecha
        }
        this.sumaTotal = this.factura.reduce((acc, cur) => acc + parseFloat(cur.total), 0);
      }
    });
  }

  DescargrPDF() {
    'use strict';
    var contentWidth = document.getElementById("invoice_wrapper").offsetWidth;
    var contentHeight = document.getElementById("invoice_wrapper").offsetHeight;
    var topLeftMargin = 15;
    var pdfWidth = contentWidth + (topLeftMargin * 2);
    var pdfHeight = (pdfWidth * 1) + (topLeftMargin * 2);
    var canvasImageWidth = contentWidth;
    var canvasImageHeight = contentHeight;
    var totalPDFPages = Math.ceil(contentHeight / pdfHeight) - 1;

    html2canvas(document.getElementById("invoice_wrapper")).then(function (canvas) {
        canvas.getContext('2d');
        var imgData = canvas.toDataURL("image/jpeg", 1.0);
        var pdf = new jsPDF('p', 'pt', [pdfWidth, pdfHeight]);
        var position = 0;

        for (var i = 0; i <= totalPDFPages; i++) {
            if (i > 0) {
                position = -(pdfHeight * i) + (topLeftMargin * 4); 
                pdf.addPage([pdfWidth, pdfHeight]); 
              
            }
            pdf.addImage(imgData, 'JPEG', topLeftMargin, position, canvasImageWidth, canvasImageHeight);
        }
        pdf.save("factura.pdf");
    });
}
}

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [FacturaComponent]
})
export class FacturaModule { }
