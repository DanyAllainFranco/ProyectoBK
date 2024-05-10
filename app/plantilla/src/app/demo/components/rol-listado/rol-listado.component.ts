import { Component, OnInit, NgModule,Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Rol } from '../../../demo/models/RolesViewModel';
import { RolService } from '../../../demo/service/rol.service';
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
import { MessageService } from 'primeng/api';
import { SplitButtonModule } from 'primeng/splitbutton';
import {MostrarmensajeService} from 'src/app/demo/service/mostrarmensaje.service'; 
import { Subscription } from 'rxjs';
import { MensajeViewModel } from '../../models/MensajeVIewModel';
import { TimeScale } from 'chart.js';

@Component({
  selector: 'app-rol-listado',
  templateUrl: './rol-listado.component.html',
  styleUrl: './rol-listado.component.scss',
  providers: [MessageService]
})
export class RolListadoComponent implements OnInit{
  rol: Rol[] = [];
  successMessage: string = '';
  successMessageSubscription: Subscription;
  constructor(
    private service: RolService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService
  ) {
  }
ngOnInit(): void {
  this.getRoles();
  
    // Mostrar el mensaje de éxito si está disponible
    if (this.service.successMessage) {
      setTimeout(() => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: this.service.successMessage });
        // Reiniciar el mensaje de éxito después de mostrarlo
        this.service.successMessage = '';
      });
    }
}

editarRol(rolId: number) {
  console.log(rolId)
  this.router.navigate(['app/EditarRol', rolId]); // Redirige a la ruta de edición con el ID del rol
}

  Nuevo(){
    this.router.navigate(['app/CreateRol'])
  }
getRoles() {
  this.service.getRol().subscribe(
    (data: any) => {
      this.rol = data;
    },
    error => {
      console.log(error);
    }
  );
}
}


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ToggleButtonModule,
    RippleModule,
    SplitButtonModule,
    MultiSelectModule,
    DropdownModule,
    ProgressBarModule,
    DialogModule,
    ToastModule,
    SliderModule,
    RatingModule,
    MatButtonModule
  ],
  declarations: [
    RolListadoComponent
  ]
})
export class RolListadoModule { }
