import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../models/UsuariosViewModel';
import { RolesDLL } from '../../models/RolesViewModel';
import { EmpleadoDDL } from '../../models/EmpleadoViewModel';
import { UsuariosServiceService } from '../../service/usuario-service.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators,ReactiveFormsModule } from '@angular/forms';
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
import { DialogModule } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';


@Component({
  selector: 'app-usuario-listado',
  templateUrl: './usuario-listado.component.html',
  styleUrl: './usuario-listado.component.scss',
  providers: [MessageService]
})

export class UsuariosListadoComponent implements OnInit {
  display: boolean = false;
  submitted = false;
  usuario: Usuario[] = [];
  roles: any[] = [];
  empleados: any[] = [];
  formusuario: FormGroup;
  selectedusuario: any;
  modalTitle: string = 'Nuevo usuario';
  modalButtonLabel: string = 'Guardar';
  confirmacionVisible: boolean = false;
  usuarioAEliminar: Usuario | null = null;

  constructor(
    private service: UsuariosServiceService,
    private router: Router,
    private fb: FormBuilder,
    private _usuarioServicio: UsuariosServiceService,
    private messageService: MessageService,
  ) {
    this.formusuario = this.fb.group({
      id: [""],
      usuario: ["", Validators.required],
      contraseña: ["",Validators.required],
      admin: ["",Validators.required],
      Empl_Id: ["0",Validators.required],
      Rol_Id: ["0",Validators.required],
    });
  }

  ngOnInit(): void {
    this.getUsuarios();
    this.RolDLL();
    this.EmpleDLL(); 
  }

  getUsuarios() {
    this.service.getUsuario().subscribe(
      (data: any) => {
        this.usuario = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  RolDLL() {
    this.service.RolesDLL().subscribe(
      (data: RolesDLL[]) => {
        this.roles = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  EmpleDLL() {
    this.service.EmpleadoDDL().subscribe(
      (data: EmpleadoDDL[]) => {
        this.empleados = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  confirmarEliminarusuario(usuario: Usuario) {
    this.usuarioAEliminar = usuario;
    this.confirmacionVisible = true;
  }
  
  eliminarusuario() {
    if (this.usuarioAEliminar) {
      const idusuario = this.usuarioAEliminar.usua_Id;
      this._usuarioServicio.eliminar(idusuario).subscribe({
        next: (data) => {
          this.getUsuarios();
          this.confirmacionVisible = false;
          console.log(idusuario);
          this.messageService.add({severity:'success', summary:'Éxito', detail:'¡usuario eliminada correctamente!'});
        },
        error: (e) => {
          console.log(e);
          this.messageService.add({severity:'error', summary:'Error', detail:'Esta usuario no se puede eliminar.'});
        }
      });
    }
  }

  cancelarEliminar() {
    this.confirmacionVisible = false;
  }

  campoVacio(campo: string): boolean {
    return this.formusuario.get(campo)?.hasError('required') && this.formusuario.get(campo)?.touched;
  }

  displayNuevausuario() {
    this.formusuario.reset();
    this.modalTitle = 'Nueva usuario';
    this.modalButtonLabel = 'Guardar';
    this.display = true;
  }

  editusuario(usuario: any) {
    this.selectedusuario = usuario;
    this.modalTitle = 'Editar usuario';
    this.modalButtonLabel = 'Actualizar';
    this.formusuario.patchValue({

      // usua_Usuario: this.formusuario.value.usuario,
      // usua_Contra: this.formusuario.value.contraseña,
      // usua_Admin: this.formusuario.value.admin,
      // empl_Id: this.formusuario.value.Empl_Id,
      // rol_Id: this.formusuario.value.Rol_Id

      usuario: usuario.usua_Usuario,
      contraseña: usuario.usua_Contra,
      admin: usuario.usua_Admin,
      empleado: usuario.Empl_Id,
      rol: usuario.Rol_Id,
      id : usuario.usua_Id
    });
    this.display = true;
  }

  guardarusuario() {
    if (this.formusuario.invalid) {
      return;
    }
    if (this.modalTitle === 'Nueva usuario') {
      this.nuevausuario();
    } else {
      this.actualizarusuario();
    }
  }

  nuevausuario() {
    // usuario: ["", Validators.required],
    // contraseña: ["",Validators.required],
    // admin: ["",Validators.required],
    // Empl_Id: ["0",Validators.required],
    // Rol_Id: ["0",Validators.required],

    const modelo: Usuario = {
    usua_Usuario: this.formusuario.value.usuario,
    usua_Contra: this.formusuario.value.contraseña,
    usua_Admin: this.formusuario.value.admin,
    empl_Id: this.formusuario.value.Empl_Id,
    rol_Id: this.formusuario.value.Rol_Id
    }
    this._usuarioServicio.agregar(modelo).subscribe({
      next: (data) => {  
        this.getUsuarios();
        this.display = false;
        this.messageService.add({severity:'success', summary:'Éxito', detail:'¡usuario creada correctamente!'});
      },
      error: (e) => {
        console.log(e);
        this.messageService.add({severity:'error', summary:'Error', detail:'usuario ya existente.'});
      }
    })
  }

  actualizarusuario() {
    const idusuario = this.selectedusuario.usua_Id;
    const modelo: Usuario = {
      usua_Id: this.formusuario.value.id,
      usua_Usuario: this.formusuario.value.usuario,
      usua_Contra: this.formusuario.value.contraseña,
      usua_Admin: this.formusuario.value.admin,
      empl_Id: this.formusuario.value.Empl_Id,
      rol_Id: this.formusuario.value.Rol_Id
    }
    this._usuarioServicio.actualizar(idusuario, modelo).subscribe({
      next: (data) => {
        this.getUsuarios();
        this.display = false;
        console.log(data);
        console.log(idusuario);
        this.messageService.add({severity:'success', summary:'Éxito', detail:'¡usuario editada correctamente!'});
      },
      error: (e) => {
        console.log(e);
        this.messageService.add({severity:'error', summary:'Error', detail:'usuario ya existente.'});
      }
    })
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
    RatingModule,
    DialogModule,
    ReactiveFormsModule,
    InputSwitchModule
  ],
  declarations: [UsuariosListadoComponent]
})
export class UsuariossListadoModule {}
