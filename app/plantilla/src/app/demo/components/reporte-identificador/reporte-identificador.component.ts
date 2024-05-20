import { Chart, registerables } from 'chart.js';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ChartData, ChartOptions } from 'chart.js'; 
import { ChartModule } from 'primeng/chart';
import { Component, OnInit, NgModule,Inject, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DataViewModule } from 'primeng/dataview';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { SelectItem } from 'primeng/api';
import { ObtenerFiltros } from 'src/app/demo/service/grafico-service.service';
import { CookieService } from 'ngx-cookie-service';
import { DataView } from 'primeng/dataview';
import { dA } from '@fullcalendar/core/internal-common';
import { ServiceService } from '../../service/empleado-service.service';
import { EmpleadoDDL } from '../../models/EmpleadoViewModel';
import { FacturaServiceService } from '../../service/factura-service.service';
import { ReporteEmpleados } from '../../models/FacturaViewModel';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-reporte-identificador',
  templateUrl: './reporte-identificador.component.html',
  styleUrl: './reporte-identificador.component.scss'
})
export class ReporteIdentificadorComponent implements OnInit{
  fechaInicio: string;
  fechaFin: string;
  empleados: SelectItem[] = [];
  categorias: SelectItem[] = [];
  Empl_Id: number;
  ReporteEmpleado: ReporteEmpleados[] = [];
  Categoria_Id: string;
  mostrar: boolean = false;
  @ViewChild('invoiceContent') invoiceContent: ElementRef;
  constructor(
    private empleadoService: ServiceService,
    private alimentoFiltro: ObtenerFiltros,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private facturaService: FacturaServiceService
  ) { }

  ngOnInit(): void {
    const fechaActual = new Date();
    
    fechaActual.setMonth(fechaActual.getMonth() - 1);
    const fechaMesAnterior = fechaActual.toISOString().slice(0, 10);
    const fechaActualISO = new Date().toISOString().slice(0, 10);
    this.fechaInicio = fechaMesAnterior;
    this.fechaFin = fechaActualISO;
    this.EmpleDLL();
    this.cargarCategorias();
  }

  EmpleDLL() {
    this.empleadoService.EmpleadoDDL().subscribe(
      (data: EmpleadoDDL[]) => {
        this.empleados = data.map(item => ({ label: item.empl_Nombre, value: item.empl_Id }));;
        
      },
      error => {
        console.log(error);
      }
    );
  }


  cargarCategorias() {
    this.categorias = [
      { label: 'Paquetes', value: 'P' },
      { label: 'Postres', value: 'D' },
      { label: 'Complementos', value: 'N' },
      { label: 'Bebidas', value: 'B' },
      { label: 'Combos', value: 'C' }
    ];
  }



  onChangeCategoria(event: any) {
    this.Categoria_Id = event.value; // Obtener el identificador de la categoría seleccionada
    console.log("Identificador de la categoría seleccionado:", this.Categoria_Id);
  }

 onChangeEmpleado(event: any) {
    this.Empl_Id = event.value; // Obtener el ID del empleado seleccionado
    console.log("ID del empleado seleccionado:", this.Empl_Id);
    
  }

  cambiarFechaInicio(event: Event) {
    this.fechaInicio = (event.target as HTMLInputElement).value;
  }
  
  cambiarFechaFin(event: Event) {
    this.fechaFin = (event.target as HTMLInputElement).value;
    
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
        pdf.save("reporteempledo.pdf");
    });
  }

  Nuevo(){
    const FechaInicio = this.fechaInicio;
    const FechaFinal = this.fechaFin;
    const Empl_Id = this.Empl_Id;
  
    this.facturaService.ReporteIdentificador(this.Categoria_Id,FechaInicio, FechaFinal).subscribe(
      (data: any) => {
         this.ReporteEmpleado = data;
         this.mostrar = true;
       },
     error => {
         console.log(error);
       }
   );
  }

}


@NgModule({
  imports: [
    OrderListModule,
    PickListModule,
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ToggleButtonModule,
    RippleModule,
    FormsModule,ChartModule,
    FormsModule,
    MultiSelectModule,
    DropdownModule,
    ProgressBarModule,
    DialogModule,
    ToastModule,
    SliderModule,
    RatingModule,
    MatButtonModule,
    DataViewModule,
  ],
  declarations: [
    ReporteIdentificadorComponent
  ]
})
export class  FiltrosComponentModule { }