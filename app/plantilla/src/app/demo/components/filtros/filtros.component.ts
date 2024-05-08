import { Chart, registerables } from 'chart.js';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ChartData, ChartOptions } from 'chart.js'; 
import { ChartModule } from 'primeng/chart';
import { Component, OnInit, NgModule,Inject } from '@angular/core';
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

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.scss',
  providers: [MessageService] // Agregar MessageService como proveedor
})
export class FiltrosComponent implements OnInit{

  fechaInicio: string;
  fechaFin: string;

  chartDataAlimento: ChartData;
  chartOptionsAlimento: ChartOptions;

  chartDataPostre: ChartData;
  chartOptionsPostre: ChartOptions;

  chartDataCombo: ChartData;
  chartOptionsCombo: ChartOptions;

  chartDataPaquete: ChartData;
  chartOptionsPaquete: ChartOptions;

  usuario: string;
  // chartDataModelo: ChartData;
  // chartOptionsModelo: ChartOptions;

  constructor(
    private alimentoFiltro: ObtenerFiltros,
    private messageService: MessageService ,// Inyectar MessageService
    private route: ActivatedRoute
  ) { }

ngOnInit(): void {

  this.route.queryParams.subscribe(params => {
    this.usuario = params['usuario'];
    if (this.usuario) {
        // this.filtro();
    }
});

  const fechaActual = new Date();
    
  fechaActual.setMonth(fechaActual.getMonth() - 1);
  const fechaMesAnterior = fechaActual.toISOString().slice(0, 10);
  const fechaActualISO = new Date().toISOString().slice(0, 10);
  this.fechaInicio = fechaMesAnterior;
  this.fechaFin = fechaActualISO;

  this.filtro()
}

  filtro(){
    const fechaInicio = new Date(this.fechaInicio);
    const fechaFin = new Date(this.fechaFin);

    if (fechaInicio <= fechaFin) {
      const fechasEnRango: string[] = [];
      let fechaActual = new Date(fechaInicio);
      while (fechaActual <= fechaFin) {
        fechasEnRango.push(fechaActual.toISOString().slice(0, 7));
        fechaActual.setMonth(fechaActual.getMonth() + 1);
      }

      
      this.alimentoFiltro.obtenerAlimentosFiltro(this.usuario,this.fechaInicio, this.fechaFin).subscribe(
        data => {
          this.GraficoAlimentoFiltro(data);
        },
        error => {
          console.error('Error al obtener datos de préstamos:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al obtener datos de la API.' });
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'La fecha de inicio debe ser anterior o igual a la fecha de fin.' });
    }
  }


  GraficoAlimentoFiltro(compras: { alim_Id: number, alim_Descripcion: string, totalPedidosAlimentos: number }[]) {

    const labels = compras.map(compra => ` ${compra.alim_Descripcion}`);
    const data = compras.map(compra => compra.totalPedidosAlimentos);
  

    this.chartDataAlimento = {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], // Colores para cada sector del gráfico
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'] // Colores para el efecto hover
        }
      ]
    };
  
    this.chartOptionsAlimento = {
      responsive: true,
      maintainAspectRatio: false,
      // Otras opciones que desees configurar...
    };
  }


  cambiarFechaInicio(event: Event) {
    this.fechaInicio = (event.target as HTMLInputElement).value;
    this.filtro();
  }
  
  cambiarFechaFin(event: Event) {
    this.fechaFin = (event.target as HTMLInputElement).value;
    this.filtro();
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
    DataViewModule
  ],
  declarations: [
    FiltrosComponent
  ]
})
export class  FiltrosComponentModule { }