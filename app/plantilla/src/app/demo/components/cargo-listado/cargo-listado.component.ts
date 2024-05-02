import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Cargos } from '../../models/CargosViewModel';
import { CargosServiceService } from '../../service/cargo-service.service';
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
  selector: 'app-cargo-listado',
  templateUrl: './cargo-listado.component.html',
  styleUrl: './cargo-listado.component.scss'
})

export class CargoListadoComponent implements OnInit {
  cargo!: Cargos[];

  constructor(private service: CargosServiceService, private router: Router) {}

  ngOnInit(): void {
    this.service.getCargo().subscribe(
      (data: any) => {
        console.log(data);
        this.cargo = data;
        console.log(this.cargo);
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
  declarations: [CargoListadoComponent]
})
export class cargosListadoModule {}
