import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario, UsuarioActualizar, UsuarioEnviar } from '../../models/UsuariosViewModel';
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
import { MessageService, SelectItem } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { BadgeModule } from 'primeng/badge';
import { CheckboxModule } from 'primeng/checkbox';
import { RolService } from '../../service/rol.service';

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

  formDepartamento: FormGroup;
  
  confirmacionTitulo: string;
  confirmacionMensaje: string;
  confirmacionBotonLabel: string;
  confirmacionBotonClase: string;
  selectedDepartamento: any;
  complementos: SelectItem[] = [];

  constructor(
    private service: UsuariosServiceService,
    private router: Router,
    private fb: FormBuilder,
    private _usuarioServicio: UsuariosServiceService,
    private complementoService: RolService,
    private messageService: MessageService,
  ) {
    this.formDepartamento = this.fb.group({
      // post_Id: ["", Validators.required],
      usuario: ["", Validators.required],
      admin: ["", Validators.required],
      empl_Id: ["", Validators.required],
      rol_Id: ["", Validators.required],
      //  post_Imagen: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.getUsuarios();
    this.EmpleDLL();
    this.cargarRoles();
  }

  EmpleDLL() {
    this._usuarioServicio.EmpleadoDDL().subscribe(
      (data: EmpleadoDDL[]) => {
        this.empleados = data.map(item => ({ label: item.empl_Nombre, value: item.empl_Id }));;
        
      },
      error => {
        console.log(error);
      }
    );
  }

  cargarRoles(){
    this.complementoService.getRol().subscribe(
      (data: any[]) => {
        console.log(data)
        this.complementos = data.map(item => ({ label: item.rol_Descripcion, value: item.rol_Id }));
      },
      error => {
        console.log(error);
      }
    );
  }

  Nuevo() {
    this.router.navigate(['app/CreateUsuario']);
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


  confirmarEliminarUsuario(usuario: Usuario) {
    this.usuarioAEliminar = usuario;
    this.confirmacionVisible = true;
    
    if (usuario.estado === 'Activo') {
        this.confirmacionTitulo = 'Confirmar Inactivación';
        this.confirmacionMensaje = '¿Está seguro de que desea inactivar este usuario?';
        this.confirmacionBotonLabel = 'Inactivar';
        this.confirmacionBotonClase = 'p-button-danger';
    } else {
        this.confirmacionTitulo = 'Confirmar Activación';
        this.confirmacionMensaje = '¿Está seguro de que desea activar este usuario?';
        this.confirmacionBotonLabel = 'Activar';
        this.confirmacionBotonClase = 'p-button-success';
    }
}


  getBotonEliminarLabel(usuario: Usuario): string {
    return usuario.estado === 'Activo' ? 'Inactivar' : 'Activar';
  }
  
  getBotonIcono(usuario: Usuario): string {
    return usuario.estado === 'Activo' ? 'pi pi-times' : 'pi pi-check';
}


editDepartamento(departamento: any) {
  this.selectedDepartamento = departamento.usua_Id;
  console.log("ID: " + this.selectedDepartamento),
  this.modalTitle = 'Editar Registro';
  this.modalButtonLabel = 'Actualizar';
  this.formDepartamento.patchValue({
    usuario: departamento.usua_Usuario,
    admin: departamento.usua_Admin,
    empl_Id: departamento.empl_Id,
    rol_Id: departamento.rol_Id
  });
  this.display = true;
}

guardarDepartamento() {
  if (this.formDepartamento.invalid) {
    return;
  }
   this.actualizarDepartamento();
}

actualizarDepartamento() {
  const idDepartamento = this.selectedDepartamento;
  const modelo: UsuarioActualizar = {
    Usua_Id: idDepartamento,
    Usua_Usuario: this.formDepartamento.value.usuario,
    Usua_Admin: this.formDepartamento.value.admin,
    Empl_Id: this.formDepartamento.value.empl_Id,
    Rol_Id: this.formDepartamento.value.rol_Id,
    Usua_Usua_Modifica: 1
  }

  this._usuarioServicio.actualizar(modelo).subscribe({
    next: (data) => {
      this.getUsuarios();
      this.messageService.add({ severity: 'succes', summary: 'Error', detail: 'Usuario editaro correctamente.' });
    },
    error: (e) => {
      console.log(e);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Departamento ya existente.' });
    }
  });
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
  getBotonSeverity(usuario: Usuario): string {
    return usuario.estado === 'Activo' ? 'danger' : 'success';
  }
  

  cancelarEliminar() {
    this.confirmacionVisible = false;
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
    CheckboxModule,
    DropdownModule,
    ProgressBarModule,
    BadgeModule,
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
