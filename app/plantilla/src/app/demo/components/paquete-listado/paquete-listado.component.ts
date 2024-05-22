import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Paquetes } from '../../models/PaquetesViewModel';
import { PaquetesServiceService } from '../../service/paquetes-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { CreationGuard } from '../../service/autguard-url.service';

@Component({
  selector: 'app-paquete-listado',
  templateUrl: './paquete-listado.component.html',
  styleUrl: './paquete-listado.component.scss'
})

export class PaqueteListadoComponent implements OnInit {
  paquete!: Paquetes[];

  constructor(private service: PaquetesServiceService, private creationGuard: CreationGuard,private router: Router) {}

  ngOnInit(): void {
  this.getPaquete();
  }
  getPaquete(){
    this.service.getPaquete().subscribe(
      (data: any) => {
        console.log(data);
        this.paquete = data;
        console.log(this.paquete);
      },
       error => {
        console.log(error);
      }
    );
  }

  editarPromo(rolId: number) {
    this.creationGuard.allow();
    this.router.navigate(['app/EditarPaquete', rolId]); // Redirige a la ruta de edición con el ID del rol
  }
  Nuevo(){
    this.creationGuard.allow();
    this.router.navigate(['app/CreatePaquete'])
  }
  detalleRol(combId: number) {
    this.creationGuard.allow();
    this.router.navigate(['app/DetallePaquete', combId]); // Redirige a la ruta de edición con el ID del rol
  }
}
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ToggleButtonModule,
    RippleModule,
    MultiSelectModule,
    DropdownModule,
    ProgressBarModule,
    ToastModule,
    SliderModule,
    RatingModule
  ],
  declarations: [PaqueteListadoComponent]
})
export class bebidasListadoModule {}
