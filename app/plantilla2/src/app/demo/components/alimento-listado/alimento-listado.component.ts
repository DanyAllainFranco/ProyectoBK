import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Alimento } from '../../models/AlimentosViewModel';
import { AlimentosServiceService } from '../../service/alimento-service.service';
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
  selector: 'app-aliment-listado',
  templateUrl:'./alimento-listado.component.html',
  styleUrl: './alimento-listado.component.scss'
})

export class AlimentosListadoComponent implements OnInit {
  alimentos!: Alimento[];

  constructor(private service: AlimentosServiceService, private router: Router) {}

  ngOnInit(): void {
    this.service.getAlimento().subscribe(
      (data: any) => {
        console.log(data);
        this.alimentos = data;
        console.log(this.alimentos);
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
  declarations: [AlimentosListadoComponent]
})
export class AlimentossListadoModule {}
