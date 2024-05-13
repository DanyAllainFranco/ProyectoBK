import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { InicioDeSesionComponent } from './inicio-de-sesion.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule // Add ReactiveFormsModule here
  ],
  declarations: [InicioDeSesionComponent]
})
export class InicioDeSesionModule { }
