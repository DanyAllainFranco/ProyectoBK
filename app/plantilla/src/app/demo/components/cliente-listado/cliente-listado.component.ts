import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Clientes, LlenarClientes } from '../../models/ClientesViewModel';
import { ClientesServiceService } from '../../service/cliente-service.service';
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
import { MessageService } from 'primeng/api';
import { Fill, Rol } from '../../../demo/models/RolesViewModel';
import { RolService } from '../../../demo/service/rol.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { Subscription } from 'rxjs';
import {InicioDeSesionComponent} from 'src/app/demo/components/inicio-de-sesion/inicio-de-sesion.component';
import { LoginComponent } from '../auth/login/login.component';
import {AlmacenardatosService} from 'src/app/demo/service/almacenardatos.service';
import { Llenar } from '../../models/ComboPersonalViewModel';

@Component({
  selector: 'app-cliente-listado',
  templateUrl: './cliente-listado.component.html',
  styleUrl: './cliente-listado.component.scss',
  providers: [MessageService]
})

export class ClientesListadoComponent implements OnInit {
  clientes!: Clientes[];
  confirmacionVisible: boolean = false;
  departamentoAEliminar: LlenarClientes | null = null;
  constructor(private service: ClientesServiceService, private messageService: MessageService,private router: Router) {}

  ngOnInit(): void {
  this.getClientes();

     // Mostrar el mensaje de éxito si está disponible
     console.log("prueba: " + this.service.successMessage)
     if (this.service.successMessage) {
  
      setTimeout(() => {
        console.log("Mensaje: " + this.service.successMessage)
        if(this.service.successMessage == '¡Cliente registrado correctamente!')
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: '¡Cliente registrado correctamente!'});
        // Reiniciar el mensaje de éxito después de mostrarlo
        else{
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: '¡Cliente actualizado correctamente!' });
        }
        this.service.successMessage = '';
      });

    
    }
    
  }

  detalleCombo(combId: number) {
    this.router.navigate(['app/DetalleCliente', combId]); // Redirige a la ruta de edición con el ID del rol
  }

  getClientes(){
    this.service.getCliente().subscribe(
      (data: any) => {
        console.log(data);
        this.clientes = data;
        console.log(this.clientes);
      },
       error => {
        console.log(error);
      }
    );
  }
  confirmarEliminarDepartamento(departamento: LlenarClientes) {

    this.departamentoAEliminar = departamento;
    console.log(this.departamentoAEliminar)
    this.confirmacionVisible = true;
  }
  
  eliminarDepartamento() {
    if (this.departamentoAEliminar) {
      console.log(this.departamentoAEliminar.clie_Id)
      const idDepartamento = this.departamentoAEliminar.clie_Id;
      this.service.eliminar(idDepartamento).subscribe({
        next: (data) => {
          this.getClientes();
          this.confirmacionVisible = false;
          console.log(idDepartamento);
          this.messageService.add({severity:'success', summary:'Éxito', detail:'!Cliente eliminado correctamente!'});
        },
        error: (e) => {
          console.log(e);
          this.messageService.add({severity:'error', summary:'Error', detail:'Este combo no se puede eliminar.'});
        }
      });
    }
  }
  
  cancelarEliminar() {
    this.confirmacionVisible = false;
  }

  editarCombo(combId: number) {
    this.router.navigate(['app/EditarCliente', combId]); // Redirige a la ruta de edición con el ID del rol
  }

  Nuevo(){
    this.router.navigate(['app/CreateCliente'])
  }
}
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    DialogModule,
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
  declarations: [ClientesListadoComponent]
})
export class ClientessListadoModule {}
