import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EstadocivilListadoComponent } from './estadocivil-listado.component';
import { EstadoCivilRoutingModule } from './EstadoCivildemo-routing.module';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SidebarModule } from 'primeng/sidebar';
import { RippleModule } from 'primeng/ripple';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from "primeng/dropdown";
import { MatExpansionModule } from '@angular/material/expansion';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	imports: [
		CommonModule,
		EstadoCivilRoutingModule,
		ToastModule,
		DialogModule,
		FormsModule,
		TooltipModule,
		InputTextModule,
		DropdownModule,
		ReactiveFormsModule,

		ButtonModule,
		OverlayPanelModule,
		TableModule,
		ConfirmDialogModule,
		SidebarModule,
		RippleModule,
		MatExpansionModule,
		ConfirmPopupModule
	],
	declarations: [EstadocivilListadoComponent]
})
export class EstadoCivilDemoModule { }
