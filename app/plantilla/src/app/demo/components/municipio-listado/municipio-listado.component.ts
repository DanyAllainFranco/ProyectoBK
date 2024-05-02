import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Municipio } from '../../models/MunicipioViewModel';
import { MunicipioServiceService } from '../../service/municipio-service.service';
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
  selector: 'app-municipio-listado',
  standalone: true,
  imports: [],
  templateUrl: './municipio-listado.component.html',
  styleUrl: './municipio-listado.component.scss'
})
export class MunicipioListadoComponent implements OnInit {
  Municipio!: Municipio[];

  constructor(private service: MunicipioServiceService, private router: Router) {}

  ngOnInit(): void {
    this.service.getMunicipio().subscribe(
      (data: any) => {
        console.log(data);
        this.Municipio = data;
        console.log(this.Municipio);
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
  declarations: [MunicipioListadoComponent]
})
export class MunicipiosListadoModule {}
