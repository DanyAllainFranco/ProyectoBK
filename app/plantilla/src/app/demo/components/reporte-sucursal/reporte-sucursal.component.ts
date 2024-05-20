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
import { SucursalServiceService } from '../../service/sucursal-service.service';

@Component({
  selector: 'app-reporte-sucursal',
  templateUrl: './reporte-sucursal.component.html',
  styleUrl: './reporte-sucursal.component.scss'
})
export class ReporteSucursalComponent implements OnInit{
  fechaInicio: string;
  fechaFin: string;
  empleados: SelectItem[] = [];
  Empl_Id: number;
  ReporteEmpleado: ReporteEmpleados[] = [];
  mostrar: boolean = false;
  todos: boolean = false;
  @ViewChild('invoiceContent') invoiceContent: ElementRef;
  constructor(
    private empleadoService: SucursalServiceService,
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
  }

  EmpleDLL() {
    this.empleadoService.getSucursal().subscribe(
      (data:any[]) => {
        this.empleados = data.map(item => ({ label: item.sucu_Descripcion, value: item.sucu_Id }));;
        // this.empleados = [
        //   {label: 'Ver Todos', value: 'T'},
        //   {label: 'Prueba', value: 'P'}
        // ]

      },
      error => {
        console.log(error);
      }
    );
  }

  onChangeEmpleado(event: any) {
    this.Empl_Id = event.value;
    const prueba = event.value;
    if(prueba == 'T'){
      console.log("SIII")
      this.todos = true;
      console.log("BOOL: " + this.todos)
    }
    else{
      this.todos = false;
      console.log("BOOL: " + this.todos)
    }
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
        pdf.save("reportesucursal.pdf");
    });
  }

  Nuevo(){
    const FechaInicio = this.fechaInicio;
    const FechaFinal = this.fechaFin;
    const Empl_Id = this.Empl_Id;
  
    if(this.todos){
      this.facturaService.ReporteSucursalTodos(FechaInicio, FechaFinal).subscribe(
        (data: any) => {
           this.ReporteEmpleado = data;
           this.mostrar = true;
         },
       error => {
           console.log(error);
         }
     );
    }
    else{
      this.facturaService.ReporteSucursales(Empl_Id,FechaInicio, FechaFinal).subscribe(
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
    ReporteSucursalComponent
  ]
})
export class  FiltrosComponentModule { }