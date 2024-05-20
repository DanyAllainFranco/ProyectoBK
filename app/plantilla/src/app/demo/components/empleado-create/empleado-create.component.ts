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


@Component({
  selector: 'app-empleado-create',
  templateUrl: './empleado-create.component.html',
  styleUrl: './empleado-create.component.scss',
  providers: [MessageService]
})
export class EmpleadoCreateComponent implements OnInit{
  form: FormGroup;

    invalid: boolean = false;
    departamentos: SelectItem[] = [];
    municipios: SelectItem[] = [];
    estadosciviles: SelectItem[] = [];
    cargos: SelectItem[] = [];
    sucursales: SelectItem[] = [];
    DepartamentoId: string;
    submitted: boolean = false;
    constructor(private productService: ProductService,
      private router: Router,
      private fb: FormBuilder,
      private municipioService: ServiceService,
      private departamentoService: DepartamentoServiceService,
      private estadoService: EstadoCivilServiceService,
      private cargoService: CargosServiceService,
      private susursalServie: SucursalServiceService,
      private clienteService: ServiceService,
      private messageService: MessageService,
) {
        this.form = this.fb.group({
          empl_Identidad: ['', Validators.required],
          empl_Nombre: ['', Validators.required],
          empl_Apellido: ['', Validators.required],
          empl_Sexo: ['', Validators.required],
          empl_Correo: ['', Validators.required],
          esta_Id: ['', Validators.required],
          sucu_Id: ['', Validators.required],
          muni_Codigo: ['', Validators.required],
          carg_Id: ['', Validators.required],

        });
        }

ngOnInit(): void {
  this.cargarDepartamentos();
  this.cargarEstados();
  this.cargarCargos();
  this.cargarSucursales();
}

cargarDepartamentos(){
  this.departamentoService.getDepartamento().subscribe(
    (data: any[]) => {
      console.log(data)
      
      this.departamentos = data.map(item => ({ label: item.dept_Descripcion, value: item.dept_Codigo }));
    },
    error => {
      console.log(error);
    }
  );
}

onDepartmentChange(event: any) {
  const departmentId = event.value;
  if (departmentId) {
    this.municipioService.getMunicipiosPorDepartamento(departmentId).subscribe(
      (data: any[]) => {
        this.municipios = data.map(item => ({ label: item.muni_Descripcion, value: item.muni_Codigo }));
      },
      error => {
        console.error('Error fetching municipios:', error);
      }
    );
  } else {
    this.municipios = [];
  }
}


cargarCargos(){
  this.cargoService.getCargo().subscribe(
    (data: any[]) => {
      console.log(data)
      this.cargos = data.map(item => ({ label: item.carg_Descripcion, value: item.carg_Id }));
    },
    error => {
      console.log(error);
    }
  );
}
cargarSucursales(){
  this.susursalServie.getSucursal().subscribe(
    (data: any[]) => {
      console.log(data)
      this.sucursales = data.map(item => ({ label: item.sucu_Descripcion, value: item.sucu_Id }));
    },
    error => {
      console.log(error);
    }
  );
}

cargarEstados(){
  this.estadoService.getEstadoCivil().subscribe(
    (data: any[]) => {
      console.log(data)
      this.estadosciviles = data.map(item => ({ label: item.esta_Descripcion, value: item.esta_Id }));
    },
    error => {
      console.log(error);
    }
  );
}



Volver(){
  this.router.navigate(['app/IndexEmpleado'])
}


guardar() {    
  if (this.form.valid) {
    const empl_Identidad = this.form.value.empl_Identidad;
    const empl_Nombre = this.form.value.empl_Nombre;
    const empl_Apellido = this.form.value.empl_Apellido;
    const empl_Sexo = this.form.value.empl_Sexo;
    const empl_Correo = this.form.value.empl_Correo;
    const esta_Id = this.form.value.esta_Id;
    const muni_Codigo = this.form.value.muni_Codigo;
    const sucu_Id = this.form.value.sucu_Id;
    const carg_Id = this.form.value.carg_Id;
    
    const NuevoCombo: EmpleadosEnviar = {
      Empl_Id: 0,
      Empl_Identidad: empl_Identidad,
      Empl_Nombre: empl_Nombre,
      Empl_Apellido: empl_Apellido,
      Empl_Sexo: empl_Sexo,
      Empl_Correo: empl_Correo,
      Esta_Id: esta_Id,
      Sucu_Id: sucu_Id,
      Carg_Id: carg_Id,
      Muni_Codigo: muni_Codigo,
      Usua_Id: 1,
    };

    this.clienteService.agregarEmpleados(NuevoCombo).subscribe(
      (respuesta: Respuesta) => {
        if (respuesta.success) {
          // this.messageService.add({severity:'success', summary:'Éxito', detail:'!Combo registrado correctamente!'});
          this.clienteService.successMessage = '¡Empleado registrado correctamente!';
          this.router.navigate(['app/IndexEmpleado']);
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
   this.submitted = true;
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
    EmpleadoCreateComponent
  ]
})
export class  EmpleadoCreateModule { }