import { Component, OnInit, NgModule,Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { SelectItem } from 'primeng/api';
import {ComboPersonalServiceService} from 'src/app/demo/service/combopersonal-service.service'; 
import { Pantallas } from 'src/app/demo/models/PantallaViewMode';
import { Rol } from 'src/app/demo/models/RolesViewModel';
import { Respuesta } from 'src/app/demo/models/ServiceResult';
import { MessageService } from 'primeng/api';
import { ComboPEnviar } from '../../models/ComboPersonalViewModel';
import {AlimentosServiceService} from 'src/app/demo/service/alimento-service.service'; 
import { CargarAlimentos } from '../../models/AlimentosViewModel';
import { CargarBebidas } from '../../models/BebidasViewModel';
import { CargarPostres } from '../../models/PostreViewModel';
import { CargarComplementos } from '../../models/ComplementoViewModel';
import { BebidasServiceService } from '../../service/bebida-service.service';
import { PostreServiceService } from '../../service/postre-service.service';
import { ComplementoServiceService } from '../../service/complemento-service.service';
import { ImageModule } from 'primeng/image';
import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'primeng/carousel';
import { FileUploadModule } from 'primeng/fileupload';
import { Municipio } from '../../models/MunicipioViewModel';
import { MunicipioListadoComponent } from '../municipio-listado/municipio-listado.component';
import { ServiceService } from '../../service/empleado-service.service';
import { RolService } from '../../service/rol.service';
import { DepartamentoServiceService } from '../../service/departamento-service.service';
import { EstadoCivilServiceService } from '../../service/estadocivil-service.service';
import { ClientesEnviar, EmpleadosEnviar } from '../../models/ClientesViewModel';
import { ClientesServiceService } from '../../service/cliente-service.service';
import { CargosServiceService } from '../../service/cargo-service.service';
import { SucursalServiceService } from '../../service/sucursal-service.service';
import { CookieService } from 'ngx-cookie-service';
import { LlenarEmpleados } from '../../models/EmpleadoViewModel';

@Component({
  selector: 'app-empleado-detalle',
  templateUrl: './empleado-detalle.component.html',
  styleUrl: './empleado-detalle.component.scss',
  providers: [MessageService]
})
export class EmpleadoDetalleComponent implements OnInit{
  form: FormGroup;
  EditarCombo: LlenarEmpleados;
  ComboId: number;
  staticData = [{}];
  constructor(
    private route: ActivatedRoute,
    private rolService: ServiceService,
    private formBuilder: FormBuilder,
    private postreService: PostreServiceService,
    private alimentoService: AlimentosServiceService,
    private bebidaService: BebidasServiceService,
    private complementoService: ComplementoServiceService,
    private messageService: MessageService,
    private router: Router,
  ) { }
  

ngOnInit(): void {
   this.route.params.subscribe(params => {
      this.ComboId = +params['id'];
      this.obtenerRol(this.ComboId);

    });
    this.form = this.formBuilder.group({
      empl_Identidad: ['', Validators.required],
      empl_Nombre: ['',Validators.required],
      empl_Apellido: ['', Validators.required],
      empl_Sexo: ['', Validators.required],
      empl_Correo: ['', Validators.required],
      esta_Descripcion: ['', Validators.required],
      sucu_Descripcion: ['', Validators.required],
      carg_Descripcion: ['', Validators.required],
      muni_Descripcion: ['', Validators.required],
      depa_Descripcion: ['', Validators.required],
      creacion: ['', Validators.required],
      modifica: ['', Validators.required],
      FechaCreacion: ['', Validators.required],
      FechaModificacion: ['', Validators.required],
    });
}
obtenerRol(id: number) {
  this.rolService.obtenerCliePorId(id).subscribe(
    (data: any) => {
      this.EditarCombo = data;

       this.form.patchValue({
        empl_Identidad: this.EditarCombo.empl_Identidad,
        empl_Nombre: this.EditarCombo.empl_Nombre,
        empl_Apellido: this.EditarCombo.empl_Apellido,
        empl_Sexo: this.EditarCombo.empl_Sexo,
        empl_Correo: this.EditarCombo.empl_Correo,
        esta_Descripcion: this.EditarCombo.esta_Descripcion,
        sucu_Descripcion: this.EditarCombo.sucu_Descripcion,
        carg_Descripcion: this.EditarCombo.carg_Descripcion,
        muni_Descripcion: this.EditarCombo.muni_Descripcion,
        depa_Descripcion: this.EditarCombo.dept_Descripcion,
          creacion: this.EditarCombo.usua_Creacion,
          modifica: this.EditarCombo.usua_Modifica,
          FechaCreacion: this.EditarCombo.empl_Fecha_Creacion,
          FechaModificacion: this.EditarCombo.empl_Fecha_Modifica
       });
    },
    error => {
      console.log(error);
    }
  );
}
Volver(){
  this.router.navigate(['app/empleados'])
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
    EmpleadoDetalleComponent
  ]
})
export class  EmpleadoDetalleModule { }