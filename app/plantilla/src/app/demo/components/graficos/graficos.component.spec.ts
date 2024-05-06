import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart'; // Asegúrate de importar ChartModule aquí
import { GraficosComponent } from './graficos.component';
import { ChartsDemoRoutingModule } from '../uikit/charts/chartsdemo-routing.module';

@NgModule({
  declarations: [GraficosComponent],
  imports: [
    CommonModule,
    ChartsDemoRoutingModule,
    ChartModule 
  ]
})
export class ChartsDemoModule { }


