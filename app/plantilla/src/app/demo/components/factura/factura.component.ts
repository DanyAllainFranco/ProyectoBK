import { Component,NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-factura',
  templateUrl:'./factura.component.html',
  styleUrls: ['./factura.component.scss']
})
export class FacturaComponent {
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
        pdf.save("reporte.pdf");
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
export class ReporteVentasModule { }

