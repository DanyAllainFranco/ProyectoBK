import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { ComboPersonal } from '../../models/ComboPersonalViewModel';
import { ComboPersonalServiceService } from '../../service/combopersonal-service.service';
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
  selector: 'app-combopersonal-listado',
  standalone: true,
  imports: [],
  templateUrl: './combopersonal-listado.component.html',
  styleUrl: './combopersonal-listado.component.scss'
})

export class CombopersonalListadoComponent implements OnInit {
  ComboPersonal!: ComboPersonal[];

  constructor(private service: ComboPersonalServiceService, private router: Router) {}

  ngOnInit(): void {
    this.service.getComboPersonal().subscribe(
      (data: any) => {
        console.log(data);
        this.ComboPersonal = data;
        console.log(this.ComboPersonal);
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
  declarations: [CombopersonalListadoComponent]
})
export class ComboPersonalsListadoModule {}
