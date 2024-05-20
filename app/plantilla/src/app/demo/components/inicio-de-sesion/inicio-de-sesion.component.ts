import { Component,EventEmitter,NgModule, Output } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';
import { UsuariosServiceService } from '../../service/usuario-service.service';
import { Usuario } from '../../models/UsuariosViewModel';
import { Login } from '../../models/LoginViewModel';
import { CommonModule } from '@angular/common';
import {AlmacenardatosService} from 'src/app/demo/service/almacenardatos.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-inicio-de-sesion',
  templateUrl:'./inicio-de-sesion.component.html',
  styleUrls: ['./inicio-de-sesion.component.scss'],
  providers: [CookieService]
})

export class InicioDeSesionComponent {
  loginForm: FormGroup;  
  constructor(public layoutService: LayoutService, 
    private cookieService: CookieService,
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
            console.log("Datos: " + response[0].usua_Id)
            this.authService.setUserId(loginData.Usua_Id);
            localStorage.setItem('usuario', loginData.Usua_Usuario); 
          
             this.cookieService.set('Usua_Id', response[0].usua_Id);
             this.cookieService.set('Usua_Usuario', response[0].usua_Usuario);
             this.cookieService.set('Rol_Id', response[0].rol_Id);
             this.cookieService.set('Usua_Admin', response[0].usua_Admin);
            const valor = this.cookieService.get('Usua_Id');
            console.log("PRUEBA: " + valor)
            console.log("ROL: " + this.cookieService.get("Rol_Id"))
            console.log("Admin: " + this.cookieService.get("Usua_Admin"))
            this.router.navigate(['/app/Inicio'], { queryParams: { usuario: loginData.Usua_Usuario } });
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

