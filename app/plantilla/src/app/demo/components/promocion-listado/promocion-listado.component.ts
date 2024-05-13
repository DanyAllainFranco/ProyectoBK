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
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-promocion-listado',
  templateUrl: './promocion-listado.component.html',
  styleUrl: './promocion-listado.component.scss',
  providers: [MessageService]
})
export class PromocionListadoComponent implements OnInit {
  Promocion!: Promocion[];

  constructor(private service: PromocionServiceService,  private messageService: MessageService, private router: Router) {}

  ngOnInit(): void {
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

     // Mostrar el mensaje de éxito si está disponible
     console.log(this.service.successMessage)
     if (this.service.successMessage) {
      setTimeout(() => {
        if(this.service.successMessage == '¡Promocion registrada correctamente!')
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: '¡Promocion registrada correctamente!' });
        // Reiniciar el mensaje de éxito después de mostrarlo
        else{
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: '¡Rol actualizado correctamente!' });
        }
        this.service.successMessage = '';
      });
    }
  }

  Nuevo(){
    this.router.navigate(['app/CreatePromocion'])
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
  declarations: [PromocionListadoComponent]
})
export class PromocionsListadoModule {}