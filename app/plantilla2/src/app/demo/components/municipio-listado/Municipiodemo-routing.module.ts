import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MunicipioListadoComponent } from './municipio-listado.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: MunicipioListadoComponent }
	])],
	exports: [RouterModule]
})
export class MunicipioRoutingModule { }
