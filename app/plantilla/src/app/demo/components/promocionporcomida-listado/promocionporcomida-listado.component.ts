import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { PromocionComida } from '../../models/PromocionPorComidaViewModel';
import { PromocionPorComidaServiceService } from '../../service/promocionporcomida-service.service';
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
  selector: 'app-promocionporcomida-listado',
  templateUrl: './promocionporcomida-listado.component.html',
  styleUrl: './promocionporcomida-listado.component.scss'
})
export class PromocionporcomidaListadoComponent implements OnInit {
  PromocionComida!: PromocionComida[];

  constructor(private service: PromocionPorComidaServiceService, private router: Router) {}

  ngOnInit(): void {
    this.service.getPromocionPorComida().subscribe(
      (data: any) => {
        console.log(data);
        this.PromocionComida = data;
        console.log(this.PromocionComida);
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
  declarations: [PromocionporcomidaListadoComponent]
})
export class PromocionComidasListadoModule {}
