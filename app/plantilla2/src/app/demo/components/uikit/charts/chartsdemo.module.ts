import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsDemoRoutingModule } from './chartsdemo-routing.module';
import { ChartModule } from 'primeng/chart'
import { GraficosComponent } from './chartsdemo.component';

@NgModule({
	imports: [
		CommonModule,
		ChartsDemoRoutingModule,
		ChartModule
	],
	declarations: [GraficosComponent]
})
export class ChartsDemoModule { }
