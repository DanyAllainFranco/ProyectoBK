import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Sucursales } from '../../models/SucursalesViewModel';
import { SucursalServiceService } from '../../service/sucursal-service.service';
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
  selector: 'app-sucursal-listado',
  templateUrl: './sucursal-listado.component.html',
  styleUrl: './sucursal-listado.component.scss'
})

export class SucursalListadoComponent implements OnInit {
  sucursal!: Sucursales[];

  constructor(private service: SucursalServiceService, private router: Router) {}

  ngOnInit(): void {
    this.service.getSucursal().subscribe(
      (data: any) => {
        console.log(data);
        this.sucursal = data;
        console.log(this.sucursal);
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
  declarations: [SucursalListadoComponent]
})
export class UsuariossListadoModule {}
