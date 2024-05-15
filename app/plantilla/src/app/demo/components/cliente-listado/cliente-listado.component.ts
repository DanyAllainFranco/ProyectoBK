import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Clientes } from '../../models/ClientesViewModel';
import { ClientesServiceService } from '../../service/cliente-service.service';
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
  selector: 'app-cliente-listado',
  templateUrl: './cliente-listado.component.html',
  styleUrl: './cliente-listado.component.scss'
})

export class ClientesListadoComponent implements OnInit {
  clientes!: Clientes[];

  constructor(private service: ClientesServiceService, private router: Router) {}

  ngOnInit(): void {
    this.service.getCliente().subscribe(
      (data: any) => {
        console.log(data);
        this.clientes = data;
        console.log(this.clientes);
      },
       error => {
        console.log(error);
      }
    );
  }

  Nuevo(){
    this.router.navigate(['app/CreateCliente'])
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
  declarations: [ClientesListadoComponent]
})
export class ClientessListadoModule {}
