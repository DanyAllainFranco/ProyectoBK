import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../models/UsuariosViewModel';
import { UsuariosServiceService } from '../../service/usuario-service.service';
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
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-usuario-listado',
  templateUrl: './usuario-listado.component.html',
  styleUrl: './usuario-listado.component.scss',
  providers: [MessageService]
})

export class UsuariosListadoComponent implements OnInit {
  usuarios!: Usuario[];

  constructor(private service: UsuariosServiceService, private router: Router) {}

  ngOnInit(): void {
    this.service.getUsuario().subscribe(
      (data: any) => {
        console.log(data);
        this.usuarios = data;
        console.log(this.usuarios);
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
  declarations: [UsuariosListadoComponent]
})
export class UsuariossListadoModule {}
