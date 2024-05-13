import { Component,EventEmitter,NgModule, Output } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';
import { UsuariosServiceService } from '../../service/usuario-service.service';
import { Usuario } from '../../models/UsuariosViewModel';
import { Login } from '../../models/LoginViewModel';
import { CommonModule } from '@angular/common';
import {AlmacenardatosService} from 'src/app/demo/service/almacenardatos.service';


@Component({
  selector: 'app-inicio-de-sesion',
  templateUrl:'./inicio-de-sesion.component.html',
  styleUrls: ['./inicio-de-sesion.component.scss']
})

export class InicioDeSesionComponent {
  loginForm: FormGroup;  
  constructor(public layoutService: LayoutService, 
    private formBuilder: FormBuilder,
    private authService: AlmacenardatosService,
     private usuarioService: UsuariosServiceService,
     private router: Router) {
      this.loginForm = this.formBuilder.group({
        Usua_Usuario: ['', [Validators.required]],
        Usua_Contra: ['', [Validators.required]]
        });
   }

  

  // Método para redirigir a la página principal
  irAPaginaPrincipal(): void {
    if (this.loginForm.valid) {
      const loginData: Login = this.loginForm.value;
      this.usuarioService.login(loginData).subscribe(
        response => {
          console.log('Respuesta del servidor:', response);
          if (response !== "Error") {
            this.authService.setUserId(loginData.Usua_Id);
            localStorage.setItem('usuario', loginData.Usua_Usuario); 
            this.router.navigate(['/app/PrincipalGraficos'], { queryParams: { usuario: loginData.Usua_Usuario } });
          }
        },
        error => {
          console.error('Error al iniciar sesión:', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }
  
 }

 @NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule // Add ReactiveFormsModule here
  ],
  declarations: [InicioDeSesionComponent]
})
export class InicioDeSesionModule { }

