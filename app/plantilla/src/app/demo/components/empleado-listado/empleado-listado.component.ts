import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from '../../models/EmpleadoViewModel';
import { EmpleadoServiceService } from '../../service/empleado-service.service';
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
  selector: 'app-empleado-listado',
  standalone: true,
  imports: [],
  templateUrl: './empleado-listado.component.html',
  styleUrl: './empleado-listado.component.scss'
})
export class EmpleadoListadoComponent implements OnInit {
  Empleado!: Empleado[];

  constructor(private service: EmpleadoServiceService, private router: Router) {}

  ngOnInit(): void {
    this.service.getEmpleado().subscribe(
      (data: any) => {
        console.log(data);
        this.Empleado = data;
        console.log(this.Empleado);
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
  declarations: [EmpleadoListadoComponent]
})
export class EmpleadosListadoModule {}
