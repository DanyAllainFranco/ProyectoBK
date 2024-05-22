import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class ImpresionService {
    constructor(private sanitizer: DomSanitizer) {}

    imprimir(encabezado: string[], cuerpo: Array<any>, titulo: string, usuario: string): SafeResourceUrl {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: 'letter'
        });
        const img = new Image();
        img.src = 'assets/layout/images/bk.png';

        const addHeader = () => {
            // Draw polygon background
            this.drawPolygonBackground(doc);

            // Add the image
            const imgX = 20;
            const imgY = 40;
            const imgWidth = 100;
            const imgHeight = 80;
            const cornerRadius = 10;
               // Draw a colored rectangle with rounded corners as background for the image
               this.drawRoundedRect(doc, imgX, imgY, imgWidth, imgHeight, cornerRadius, [214, 39, 0]);

               // Add the image
               doc.addImage(img, 'PNG', imgX, imgY, imgWidth, imgHeight);

            // Add title text
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(20);
            doc.setFont('helvetica', 'bold');
            doc.text(titulo, 110, 90, { align: 'left' });
        };

        const addFooter = (pageNumber: number, pageCount: number) => {
            doc.setFillColor(247, 247, 247);
            doc.rect(doc.internal.pageSize.getWidth() - 80, doc.internal.pageSize.getHeight() - 35, 60, 25, 'F');
            doc.setFontSize(13);
            doc.setTextColor(0);
            doc.text(`Página ${pageNumber} de ${pageCount}`, doc.internal.pageSize.getWidth() - 50, doc.internal.pageSize.getHeight() - 22, { align: 'center' });
            const fechaImpresion = new Date().toLocaleDateString();
            doc.text(`Usuario: ${usuario}      Fecha: ${fechaImpresion}`, 10, doc.internal.pageSize.getHeight() - 22);
            doc.setFillColor(214, 39, 0) ;
            doc.rect(0, doc.internal.pageSize.getHeight() - 20, doc.internal.pageSize.getWidth(), 20, 'F');
        };

        const cuerpoConNumeros = cuerpo.map((fila, index) => [index + 1, ...fila]);

        autoTable(doc, {
            head: [['N.', ...encabezado]],
            body: cuerpoConNumeros,
            startY: 150,
            theme: 'grid',
            styles: {
                fontSize: 12,
                cellPadding: 5,
                textColor: [0, 0, 0],
                valign: 'middle',
                halign: 'center'
            },
            headStyles: {
                fillColor: [223, 113, 24],
                textColor: [255, 255, 255],
                fontStyle: 'bold'
            },
            alternateRowStyles: {
                fillColor: [240, 240, 240]
                },
            didDrawPage: (data) => {
                addHeader();
                const pageCount = doc.getNumberOfPages();
                addFooter(data.pageNumber, pageCount);
                
            },
            margin: { top: 140 }
        });

        const blobUrl = doc.output('bloburl');
        return this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl.toString());
    }

     // Utility function to draw rounded rectangles
     drawRoundedRect(doc, x, y, width, height, radius, color) {
        doc.setFillColor(...color);
        doc.roundedRect(x, y, width, height, radius, radius, 'F');
    }

    drawPolygonBackground(doc) {
        const width = 330;
        const height = 95;
        const x = 0;
        const y = 0;

        // Define the points of the polygon
        const points = [
            [x, y],
            [x + width, y],
            [x + width, y],
            [x + 0.9 * width, y + height],
            [x, y + height]
        ];

        // Draw the polygon
        doc.setFillColor(223, 113, 24);
        doc.setDrawColor(104, 200, 0);
        doc.lines(points, x, y, [1, 1], 'F');
    }
}
