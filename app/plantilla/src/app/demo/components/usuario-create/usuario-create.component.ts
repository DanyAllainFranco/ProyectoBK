import { Component, OnInit, NgModule,Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';
import { ProductService } from 'src/app/demo/service/product.service';
import { SelectItem } from 'primeng/api';
import { Respuesta } from 'src/app/demo/models/ServiceResult';
import { MessageService } from 'primeng/api';
import {AlimentosServiceService} from 'src/app/demo/service/alimento-service.service'; 
import { CargarAlimentos } from '../../models/AlimentosViewModel';
import { BebidasServiceService } from '../../service/bebida-service.service';
import { PostreServiceService } from '../../service/postre-service.service';
import { ImageModule } from 'primeng/image';
import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'primeng/carousel';
import { FileUploadModule } from 'primeng/fileupload';
import { UsuariosServiceService } from '../../service/usuario-service.service';
import { EmpleadoDDL } from '../../models/EmpleadoViewModel';
import { UsuarioEnviar } from '../../models/UsuariosViewModel';
import { RolService } from '../../service/rol.service';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-usuario-create',
  templateUrl: './usuario-create.component.html',
  styleUrl: './usuario-create.component.scss',
  providers: [MessageService]
})
export class UsuarioCreateComponent implements OnInit{

  form: FormGroup;
      empleados: any[] = [];
valCheck: string[] = [];
    complementos: SelectItem[] = [];
    constructor(
      private router: Router,
      private fb: FormBuilder,
      private complementoService: RolService,
      private messageService: MessageService,
      private rolService: UsuariosServiceService) {
        this.form = this.fb.group({
          Usua_Usuario: ['', Validators.required],
          Usua_Contra: ['', Validators.required],
          Empl_Id: ['', Validators.required],
          Rol_Id: ['', Validators.required],
          Usua_Admin: [false],
        });
        }
  ngOnInit(): void {
    this.EmpleDLL();
    this.cargarRoles();
  }

  EmpleDLL() {
    this.rolService.EmpleadoDDL().subscribe(
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


  Volver(){
    this.router.navigate(['app/IndexUsuarios'])
  }

  guardar() {    
    if (this.form.valid) {
      const nuevoUsuario: UsuarioEnviar = this.form.value;
      this.rolService.agregar(nuevoUsuario).subscribe(
        (respuesta: Respuesta) => {
          if (respuesta.success) {
            // this.messageService.add({severity:'success', summary:'Éxito', detail:'!Combo registrado correctamente!'});
            this.rolService.successMessage = '¡Usuario registrado correctamente!';
            this.router.navigate(['app/IndexUsuarios']);
          } else {
            this.messageService.add({severity:'error', summary:'Error', detail:'Error al registrar el combo'});
            console.error('Error al crear el combo:', respuesta.message);
          }
        },
        error => {
          this.messageService.add({severity:'error', summary:'Error', detail:'Error al comunicarse con el servidor'});
          console.error('Error al crear el combo:', error);
        }
      );
    } else {
      console.log("Ingrese los campos")
    }
  }
}


@NgModule({
  imports: [
    FileUploadModule,
    ImageModule,
    GalleriaModule,
    OrderListModule,
    PickListModule,
    CommonModule,
    CheckboxModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ToggleButtonModule,
    CarouselModule,
    RippleModule,
    FormsModule,
    MultiSelectModule,
    DropdownModule,
    ProgressBarModule,
    DialogModule,
    ToastModule,
    SliderModule,
    RatingModule,
    MatButtonModule,
    DataViewModule
  ],
  declarations: [
    UsuarioCreateComponent
  ]
})
export class  UsuarioCreateModule { }