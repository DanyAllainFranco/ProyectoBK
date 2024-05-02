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

@Component({
  selector: 'app-promocion-listado',
  standalone: true,
  imports: [],
  templateUrl: './promocion-listado.component.html',
  styleUrl: './promocion-listado.component.scss'
})
export class PromocionListadoComponent implements OnInit {
  Promocion!: Promocion[];

  constructor(private service: PromocionServiceService, private router: Router) {}

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