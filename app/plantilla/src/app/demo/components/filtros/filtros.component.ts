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
import { CookieService } from 'ngx-cookie-service';
import { DataView } from 'primeng/dataview';
import { dA } from '@fullcalendar/core/internal-common';
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

  chartDataAlimento2: ChartData;
  chartOptionsAlimento2: ChartOptions;

  chartDataPostre: ChartData;
  chartOptionsPostre: ChartOptions;

  chartDataEmpleado: ChartData;
  chartOptionsEmpleado: ChartOptions;

  chartDataSucursal: ChartData;
  chartOptionsSucursal: ChartOptions;

  cantidadVentasAlimentos: number = 0;
  alim_Descripcion: string;

  cantidadVentasBebidas: number = 0;
  bebi_Descripcion: string;


  cantidadVentasComplementos: number = 0;
  comp_Descripcion: string;


  cantidadVentasPostres: number = 0;
  post_Descripcion: string;


  usuario: string;
  alimentos: any[];
  complementos: any[];
  postres: any[];
  bebidas: any[];
  sortOptionsP: SelectItem[] = [];
  sortOrder: number = 0;
  cantidadVentas: number;
  sortField: string = '';
  nombreAlimento: string;
  // chartDataModelo: ChartData;
  // chartOptionsModelo: ChartOptions;

  constructor(
    private alimentoFiltro: ObtenerFiltros,
    private messageService: MessageService ,// Inyectar MessageService
    private route: ActivatedRoute,
    private cookieService: CookieService,
  ) { }

ngOnInit(): void {

  this.usuario = this.cookieService.get('Usua_Usuario').toString();
  console.log("USAURIO: " + this.usuario)
  const fechaActual = new Date();
    
  fechaActual.setMonth(fechaActual.getMonth() - 1);
  const fechaMesAnterior = fechaActual.toISOString().slice(0, 10);
  const fechaActualISO = new Date().toISOString().slice(0, 10);
  this.fechaInicio = fechaMesAnterior;
  this.fechaFin = fechaActualISO;

  this.filtro();

  this.sortOptionsP = [
    { label: 'Precio mas alto', value: '!post_Precio' },
    { label: 'Precio mas bajo', value: 'post_Precio' }
];
}

onSortChange(event: any) {
  const value = event.value;

  if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
  } else {
      this.sortOrder = 1;
      this.sortField = value;
  }
}

onFilter(dv: DataView, event: Event) {
  dv.filter((event.target as HTMLInputElement).value);
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
      
  
      this.alimentoFiltro.obtenerAlimentosMasVendidos(this.usuario, this.fechaInicio, this.fechaFin).subscribe(
        data => {
            // Llamar al método para actualizar el gráfico de alimentos más vendidos
            this.GraficoAlimentoMasVendido(data);
        },
        error => {
            console.error('Error al obtener datos de alimentos más vendidos:', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al obtener datos de la API.' });
        }
    );


    this.alimentoFiltro.obtenerComplementosMasVendidos(this.usuario,this.fechaInicio, this.fechaFin).subscribe(
       data => {
         
           this.GraficoComplementoMasVendido(data);
         },
         error => {
           console.error('Error al obtener datos de préstamos:', error);
           this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al obtener datos de la API.' });
         }
       );
       this.alimentoFiltro.obtenerBebidaMasVendidos(this.usuario,this.fechaInicio, this.fechaFin).subscribe(
         data => {
           
           this.GraficoBebidaMasVendido(data);
         },
         error => {
           console.error('Error al obtener datos de préstamos:', error);
           this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al obtener datos de la API.' });
         }
       );
       this.alimentoFiltro.obtenerPostresMasVendidos(this.usuario,this.fechaInicio, this.fechaFin).subscribe(
       data => {
          
           this.GraficoPostreMasVendido(data);
         },
         error => {
           console.error('Error al obtener datos de préstamos:', error);
           this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al obtener datos de la API.' });
         }
       );
      this.alimentoFiltro.obtenerSucursalesTop5(this.usuario,this.fechaInicio, this.fechaFin).subscribe(
        data => {
          this.GraficoSucursales(data);
        },
        error => {
          console.error('Error al obtener datos de préstamos:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al obtener datos de la API.' });
        }
      );

      this.alimentoFiltro.obtenerEmpleadosTop5(this.usuario,this.fechaInicio, this.fechaFin).subscribe(
        data => {
          this.GraficoEmpleados(data);
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

  GraficoAlimentoMasVendido(compras: any[]) {
    console.log(compras);

    const labels = compras.map(compra => ` ${compra.alim_Descripcion}`);
    const data = compras.map(compra => compra.cantidadVentas);

    // Asignar la cantidad total de ventas de alimentos
    this.cantidadVentasAlimentos = data.reduce((total, cantidad) => total + cantidad, 0);

    // Obtener la descripción del primer alimento
    if (compras.length > 0) {
        this.alim_Descripcion = compras[0].alim_Descripcion;
    } else {
        // Si no hay datos, reiniciar las variables
        this.cantidadVentasAlimentos = 0;
        this.alim_Descripcion = '';
    }
}

GraficoBebidaMasVendido(compras: any[]) {
  console.log(compras);

  const labels = compras.map(compra => ` ${compra.bebi_Descripcion}`);
  const data = compras.map(compra => compra.cantidadVentas);

  // Asignar la cantidad total de ventas de alimentos
  this.cantidadVentasBebidas = data.reduce((total, cantidad) => total + cantidad, 0);

  // Obtener la descripción del primer alimento
  if (compras.length > 0) {
      this.bebi_Descripcion = compras[0].bebi_Descripcion;
  } else {
      // Si no hay datos, reiniciar las variables
      this.cantidadVentasBebidas = 0;
      this.bebi_Descripcion = '';
  }
}

GraficoPostreMasVendido(compras: any[]) {
  console.log(compras);

  const labels = compras.map(compra => ` ${compra.post_Descripcion}`);
  const data = compras.map(compra => compra.cantidadVentas);

  // Asignar la cantidad total de ventas de alimentos
  this.cantidadVentasPostres = data.reduce((total, cantidad) => total + cantidad, 0);

  // Obtener la descripción del primer alimento
  if (compras.length > 0) {
      this.post_Descripcion = compras[0].post_Descripcion;
  } else {
      // Si no hay datos, reiniciar las variables
      this.cantidadVentasPostres = 0;
      this.post_Descripcion = '';
  }
}

GraficoComplementoMasVendido(compras: any[]) {
  console.log(compras);

  const labels = compras.map(compra => ` ${compra.comp_Descripcion}`);
  const data = compras.map(compra => compra.cantidadVentas);

  // Asignar la cantidad total de ventas de alimentos
  this.cantidadVentasComplementos = data.reduce((total, cantidad) => total + cantidad, 0);

  // Obtener la descripción del primer alimento
  if (compras.length > 0) {
      this.comp_Descripcion = compras[0].comp_Descripcion;
  } else {
      // Si no hay datos, reiniciar las variables
      this.cantidadVentasComplementos = 0;
      this.comp_Descripcion = '';
  }
}





  GraficoSucursales(compras: { sucu_Descripcion: string, cantidadVentas: number }[]) {

    const labels = compras.map(compra => ` ${compra.sucu_Descripcion}`);
    const data = compras.map(compra => compra.cantidadVentas);
  

    this.chartDataSucursal = {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], // Colores para cada sector del gráfico
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'] // Colores para el efecto hover
        }
      ]
    };
  
    this.chartOptionsSucursal = {
      responsive: true,
      maintainAspectRatio: false,
      // Otras opciones que desees configurar...
    };
  }


  GraficoEmpleados(compras: { empleado: string, cantidadVentas: number }[]) {

    const labels = compras.map(compra => ` ${compra.empleado}`);
    const data = compras.map(compra => compra.cantidadVentas);
  

    this.chartDataEmpleado = {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], // Colores para cada sector del gráfico
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'] // Colores para el efecto hover
        }
      ]
    };
  
    this.chartOptionsEmpleado = {
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
    DataViewModule,
  ],
  declarations: [
    FiltrosComponent
  ]
})
export class  FiltrosComponentModule { }