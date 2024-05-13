import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EstadocivilListadoComponent } from './estadocivil-listado.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: EstadocivilListadoComponent }
	])],
	exports: [RouterModule]
})
export class EstadoCivilRoutingModule { }
