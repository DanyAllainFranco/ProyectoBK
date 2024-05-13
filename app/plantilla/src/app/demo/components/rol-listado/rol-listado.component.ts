import { Component, OnInit, NgModule,Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fill, Rol } from '../../../demo/models/RolesViewModel';
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
  display: boolean = false;
  formDepartamento: FormGroup;
  selectedDepartamento: any;
  modalTitle: string = 'Nuevo Registro';
  modalButtonLabel: string = 'Guardar';
  confirmacionVisible: boolean = false;
  departamentoAEliminar: Rol | null = null;

  departamento: Fill[] = [];

  Collapse: boolean = false;
  DataTable: boolean = true;
  Detalles: boolean = false;
  Agregar: boolean = true;
  MunCodigo: boolean = true;
  Valor: string = "";
  staticData = [{}];
  RolCodigo: boolean = true;

  //DETALLE
  Rol: String = "";
  Codigo: number = 0;
  Panta: [] = [];
  UsuarioCreacion: String = "";
  UsuarioModificacion: String = "";
  FechaCreacion: String = "";
  FechaModificacion: String = "";

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
        if(this.service.successMessage == '¡Rol registrado correctamente!')
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: '¡Rol registrado correctamente!' });
        // Reiniciar el mensaje de éxito después de mostrarlo
        else{
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: '¡Rol actualizado correctamente!' });
        }
        this.service.successMessage = '';
      });
    }
}
detalleRol(combId: number) {
  this.router.navigate(['app/DetalleRol', combId]); // Redirige a la ruta de edición con el ID del rol
}
detalles(codigo){
  this.Collapse= false;
  this.DataTable = false;
  this.Detalles = true;
  this.service.Detalle(codigo).subscribe(
    (data: any) => {
      console.log(data)
      this.departamento = data;
      this.Rol = data.rol_Descripcion,
      console.log(this.departamento)
      console.log("Rol:" + " " + this.Rol)
               this.Codigo = data.rol_Id,
               this.Panta = data.pant_Descripcion,
               this.UsuarioCreacion = data.UsuarioCreacion,
               this.UsuarioModificacion = data.UsuarioModificacion
               this.FechaCreacion = data.rol_Fecha_Creacion,
               this.FechaModificacion = data.rol_Fecha_Modifica
    },
    error => {
      console.log(error);
    }
    );
}
//Cerrar Collapse y reiniciar el form
cancelar(){
  this.Collapse= false;
  this.DataTable = true;
  this.Detalles = false;
  this.RolCodigo=true;
}



confirmarEliminarDepartamento(departamento: Rol) {
  this.departamentoAEliminar = departamento;
  this.confirmacionVisible = true;
}

eliminarDepartamento() {
  if (this.departamentoAEliminar) {
    const idDepartamento = this.departamentoAEliminar.rol_Id;
    this.service.eliminar(idDepartamento).subscribe({
      next: (data) => {
        this.getRoles();
        this.confirmacionVisible = false;
        console.log(idDepartamento);
        this.messageService.add({severity:'success', summary:'Éxito', detail:'Rol eliminado correctamente!'});
      },
      error: (e) => {
        console.log(e);
        this.messageService.add({severity:'error', summary:'Error', detail:'Este rol no se puede eliminar.'});
      }
    });
  }
}

cancelarEliminar() {
  this.confirmacionVisible = false;
}

editarRol(rolId: number) {
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
