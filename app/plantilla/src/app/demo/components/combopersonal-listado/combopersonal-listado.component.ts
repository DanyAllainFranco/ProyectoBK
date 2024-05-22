
import { ComboPersonal } from '../../models/ComboPersonalViewModel';
import { ComboPersonalServiceService } from '../../service/combopersonal-service.service';
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
import { Component, OnInit, NgModule,Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fill, Rol } from '../../../demo/models/RolesViewModel';
import { RolService } from '../../../demo/service/rol.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MessageService } from 'primeng/api';
import { SplitButtonModule } from 'primeng/splitbutton';
import { Subscription } from 'rxjs';
import {InicioDeSesionComponent} from 'src/app/demo/components/inicio-de-sesion/inicio-de-sesion.component';
import { LoginComponent } from '../auth/login/login.component';
import {AlmacenardatosService} from 'src/app/demo/service/almacenardatos.service';
import { CreationGuard } from '../../service/autguard-url.service';

@Component({
  selector: 'app-combopersonal-listado',
  templateUrl: './combopersonal-listado.component.html',
  styleUrl: './combopersonal-listado.component.scss',
  providers: [MessageService]
})

export class CombopersonalListadoComponent implements OnInit {
  ComboPersonal!: ComboPersonal[];
  confirmacionVisible: boolean = false;
  departamentoAEliminar: ComboPersonal | null = null;
  userId: number;
  constructor(private service: ComboPersonalServiceService, 
    private router: Router,
    private messageService: MessageService,
    private authService: AlmacenardatosService,
    private creationGuard: CreationGuard
  ) {}

  ngOnInit(): void {
    this.getCombos();

       // Mostrar el mensaje de éxito si está disponible
       console.log("prueba: " + this.service.successMessage)
       if (this.service.successMessage) {
    
        setTimeout(() => {
          console.log("Mensaje: " + this.service.successMessage)
          if(this.service.successMessage == '¡Combo registrado correctamente!')
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: '¡Combo registrado correctamente!'});
          // Reiniciar el mensaje de éxito después de mostrarlo
          else{
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: '¡Combo actualizado correctamente!' });
          }
          this.service.successMessage = '';
        });

      
      }
      
  }
getCombos(){
  this.service.getComboPersonal().subscribe(
    (data: any) => {
      console.log(data);
      this.ComboPersonal = data;
      console.log(this.ComboPersonal);
    },
     error => {
      console.log(error);
    }
  );
}
  
confirmarEliminarDepartamento(departamento: ComboPersonal) {

  this.departamentoAEliminar = departamento;
  console.log(this.departamentoAEliminar)
  this.confirmacionVisible = true;
}

eliminarDepartamento() {
  if (this.departamentoAEliminar) {
    console.log(this.departamentoAEliminar.comb_Id)
    const idDepartamento = this.departamentoAEliminar.comb_Id;
    this.service.eliminar(idDepartamento).subscribe({
      next: (data) => {
        this.getCombos();
        this.confirmacionVisible = false;
        console.log(idDepartamento);
        this.messageService.add({severity:'success', summary:'Éxito', detail:'!Combo eliminado correctamente!'});
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
    this.creationGuard.allow();
    this.router.navigate(['app/EditarCombo', combId]); // Redirige a la ruta de edición con el ID del rol
  }
  detalleCombo(combId: number) {
    this.creationGuard.allow();
    this.router.navigate(['app/DetalleCombo', combId]); // Redirige a la ruta de edición con el ID del rol
  }
  Nuevo(){
    this.creationGuard.allow();
    this.router.navigate(['app/CreateCombo'])
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
    RatingModule,
    DialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    SplitButtonModule
  ],
  declarations: [CombopersonalListadoComponent]
})
export class ComboPersonalsListadoModule {}
