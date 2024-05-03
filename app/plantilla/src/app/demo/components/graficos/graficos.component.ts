import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Graficos } from '../../models/GraficosViewModel';
import { AlimentomasPedidoServiceService } from '../../service/grafico-service.service';
import { CombomasPedidoServiceService } from '../../service/grafico-service.service';
import { PostremasPedidoServiceService } from '../../service/grafico-service.service';
import { PaquetemasPedidoServiceService } from '../../service/grafico-service.service';
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
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrl: './graficos.component.scss'
})
export class GraficosComponent implements OnInit {
  Graficos!: Graficos[];

  constructor(private service: AlimentomasPedidoServiceService, private router: Router) {}

  ngOnInit(): void {
    this.service.getAlimentomasPedido().subscribe(
      (data: any) => {
        console.log(data);
        this.Graficos = data;
        console.log(this.Graficos);
      },
       error => {
        console.log(error);
      }
    );
  }
}

// constructor(private service: CombomasPedidoServiceService, private router: Router) {}

// ngOnInit(): void {
//   this.service.getAlimentomasPedido().subscribe(
//     (data: any) => {
//       console.log(data);
//       this.Graficos = data;
//       console.log(this.Graficos);
//     },
//      error => {
//       console.log(error);
//     }
//   );
// }


// constructor(private service: PaquetemasPedidoServiceService, private router: Router) {}

// ngOnInit(): void {
//   this.service.getAlimentomasPedido().subscribe(
//     (data: any) => {
//       console.log(data);
//       this.Graficos = data;
//       console.log(this.Graficos);
//     },
//      error => {
//       console.log(error);
//     }
//   );
// }


// constructor(private service: PostremasPedidoServiceService, private router: Router) {}

// ngOnInit(): void {
//   this.service.getAlimentomasPedido().subscribe(
//     (data: any) => {
//       console.log(data);
//       this.Graficos = data;
//       console.log(this.Graficos);
//     },
//      error => {
//       console.log(error);
//     }
//   );
// }


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
  declarations: [GraficosComponent]
})
export class GraficossListadoModule {}
