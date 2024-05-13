import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GraficosComponent } from './chartsdemo.component';
import { GraficosGuard } from './guardarURL'; // Importar el guardia

@NgModule({
  imports: [RouterModule.forChild([
    { 
      path: '', 
      component: GraficosComponent,
      canActivate: [GraficosGuard] 
    }
  ])],
  exports: [RouterModule]
})
export class ChartsDemoRoutingModule { }
