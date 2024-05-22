import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Promocion } from '../../models/PromocionViewModel';
import { PromocionServiceService } from '../../service/promocion-service.service';
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
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { CreationGuard } from '../../service/autguard-url.service';

@Component({
  selector: 'app-promocion-listado',
  templateUrl: './promocion-listado.component.html',
  styleUrl: './promocion-listado.component.scss',
  providers: [MessageService]
})
export class PromocionListadoComponent implements OnInit {
  Promocion!: Promocion[];
  confirmacionVisible: boolean = false;
  departamentoAEliminar: any | null = null;
  constructor(private service: PromocionServiceService,   private creationGuard: CreationGuard, private messageService: MessageService, private router: Router) {}

  ngOnInit(): void {
    this.getPromocion();
     // Mostrar el mensaje de éxito si está disponible
     console.log(this.service.successMessage)
     if (this.service.successMessage) {
      setTimeout(() => {
        if(this.service.successMessage == '¡Promocion registrada correctamente!')
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: '¡Promocion registrada correctamente!' });
        // Reiniciar el mensaje de éxito después de mostrarlo
        else{
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: '¡Promocion actualizada correctamente!' });
        }
        this.service.successMessage = '';
      });
    }
  }
  getPromocion(){
    this.service.getPromocion().subscribe(
      (data: any) => {
        console.log(data);
        this.Promocion = data;
        console.log(this.Promocion);
      },
       error => {
        console.log(error);
      }
    );
  }
  editarPromo(rolId: number) {
    this.creationGuard.allow();
    this.router.navigate(['app/EditarPromocion', rolId]); // Redirige a la ruta de edición con el ID del rol
  }
  Nuevo(){
    this.creationGuard.allow();
    this.router.navigate(['app/CreatePromocion'])
  }

  confirmarEliminarDepartamento(departamento: any) {
    this.departamentoAEliminar = departamento;
    this.confirmacionVisible = true;
  }

  eliminarDepartamento() {
    if (this.departamentoAEliminar) {
      const idDepartamento = this.departamentoAEliminar.prom_Id;
      console.log()
      this.service.eliminar(idDepartamento).subscribe({
        next: (data) => {
          this.getPromocion();
          this.confirmacionVisible = false;
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: '¡Postre eliminado correctamente!' });
        },
        error: (e) => {
          console.log(e);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Este Departamento no se puede eliminar.' });
        }
      });
    }
  }

  cancelarEliminar() {
    this.confirmacionVisible = false;
  }

  detallePromo(combId: number) {
    this.creationGuard.allow();
    this.router.navigate(['app/DetallePromocion', combId]); // Redirige a la ruta de edición con el ID del rol
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
    DialogModule,
    RatingModule
  ],
  declarations: [PromocionListadoComponent]
})
export class PromocionsListadoModule {}