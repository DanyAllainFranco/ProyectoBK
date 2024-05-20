import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DatosCompartidosService } from '../../service/compartir-datos.service';
import { FacturaDetalle } from '../../models/FacturaViewModel';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss']
})
export class FacturaComponent implements OnInit {
  clie_Nombre: string;
  producto: string;
  precio: string;
  cantidad: string;
  fact_Id: number;
  factura: FacturaDetalle[];

  constructor(private facturaService: DatosCompartidosService) { }

  ngOnInit(): void {
    this.facturaService.facturaDetalleActual.subscribe(detalle => {
      if (detalle && detalle.length > 0) {
        console.log(detalle);
        this.factura = detalle;
        console.log(this.factura) // Asignar todos los detalles de la factura
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
      }
    });
  }
  
  DescargrPDF() {
    'use strict';
    var contentWidth = document.getElementById("invoice_wrapper").offsetWidth;
    var contentHeight = document.getElementById("invoice_wrapper").offsetHeight;
    var topLeftMargin = 20;
    var pdfWidth = contentWidth + (topLeftMargin * 2);
    var pdfHeight = (pdfWidth * 1.5) + (topLeftMargin * 2);
    var canvasImageWidth = contentWidth;
    var canvasImageHeight = contentHeight;
    var totalPDFPages = Math.ceil(contentHeight / pdfHeight) - 1;

    html2canvas(document.getElementById("invoice_wrapper")).then(function (canvas) {
        canvas.getContext('2d');
        var imgData = canvas.toDataURL("image/jpeg", 1.0);
        var pdf = new jsPDF('p', 'pt', [pdfWidth, pdfHeight]);
        pdf.addImage(imgData, 'JPEG', topLeftMargin, topLeftMargin, canvasImageWidth, canvasImageHeight);
        for (var i = 1; i <= totalPDFPages; i++) {
            pdf.addPage(pdfWidth, pdfHeight);
            pdf.addImage(imgData, 'JPEG', topLeftMargin, -(pdfHeight * i) + (topLeftMargin * 4), canvasImageWidth, canvasImageHeight);
        }
        pdf.save("Factura.pdf");
    });
  }
}

@NgModule({
  imports: [
    CommonModule,
    PdfViewerModule
  ],
  declarations: [FacturaComponent]
})
export class FacturaModule { }
