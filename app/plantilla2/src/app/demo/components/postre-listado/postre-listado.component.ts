import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Postre } from '../../models/PostreViewModel';
import { PostreServiceService } from '../../service/postre-service.service';
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
  selector: 'app-postre-listado',
  templateUrl: './postre-listado.component.html',
  styleUrl: './postre-listado.component.scss'
})
export class PostreListadoComponent implements OnInit {
  Postre!: Postre[];

  constructor(private service: PostreServiceService, private router: Router) {}

  ngOnInit(): void {
    this.service.getPostre().subscribe(
      (data: any) => {
        console.log(data);
        this.Postre = data;
        console.log(this.Postre);
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
  declarations: [PostreListadoComponent]
})
export class PostresListadoModule {}
