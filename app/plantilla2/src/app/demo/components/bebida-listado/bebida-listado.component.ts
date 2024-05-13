import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Bebidas } from '../../models/BebidasViewModel';
import { BebidasServiceService } from '../../service/bebida-service.service';
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
  selector: 'app-bebida-listado',
  templateUrl: './bebida-listado.component.html',
  styleUrl: './bebida-listado.component.scss'
})

export class BebidaListadoComponent implements OnInit {
  bebida!: Bebidas[];

  constructor(private service: BebidasServiceService, private router: Router) {}

  ngOnInit(): void {
    this.service.getBebidas().subscribe(
      (data: any) => {
        console.log(data);
        this.bebida = data;
        console.log(this.bebida);
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
  declarations: [BebidaListadoComponent]
})
export class bebidasListadoModule {}
