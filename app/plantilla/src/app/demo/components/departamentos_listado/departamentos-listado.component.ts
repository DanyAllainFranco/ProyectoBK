import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Departamento } from '../../models/DepartamentosViewModel';
import { DepartamentoServiceService } from '../../service/departamento-service.service';
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
  selector: 'app-departamentos-listado',
  templateUrl: './departamentos-listado.component.html',
  styleUrls: ['./departamentos-listado.component.scss']
})
export class DepartamentosListadoComponent implements OnInit {
  departamento!: Departamento[];

  constructor(private service: DepartamentoServiceService, private router: Router) {}

  ngOnInit(): void {
    this.service.getDepartamento().subscribe(
      (data: any) => {
        console.log(data);
        this.departamento = data;
        console.log(this.departamento);
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
  declarations: [DepartamentosListadoComponent]
})
export class DepartamentosListadoModule {}
