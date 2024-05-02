import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-de-sesion',
  templateUrl:'./inicio-de-sesion.component.html',
  styleUrls: ['./inicio-de-sesion.component.scss']
})

export class InicioDeSesionComponent {
  constructor(private router: Router) {}

  // Método para redirigir a la página principal
  irAPaginaPrincipal() {
    this.router.navigate(['/app/Principal']); // La ruta '/app/Principal' corresponde a la página principal
  }
}
