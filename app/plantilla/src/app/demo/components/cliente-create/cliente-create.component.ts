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
import { ClientesEnviar } from '../../models/ClientesViewModel';
import { ClientesServiceService } from '../../service/cliente-service.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrl: './cliente-create.component.scss',
  providers: [MessageService]
})
export class ClienteCreateComponent implements OnInit{

  form: FormGroup;

    invalid: boolean = false;
    departamentos: SelectItem[] = [];
    municipios: SelectItem[] = [];
    estadosciviles: SelectItem[] = [];
    DepartamentoId: string;
    constructor(private productService: ProductService,
      private router: Router,
      private fb: FormBuilder,
      private municipioService: ServiceService,
      private departamentoService: DepartamentoServiceService,
      private estadoService: EstadoCivilServiceService,
      private clienteService: ClientesServiceService,
      private messageService: MessageService,
) {
        this.form = this.fb.group({
          Clie_Identidad: ['', Validators.required],
          Clie_Nombre: ['', Validators.required],
          Clie_Apellido: ['', Validators.required],
          Clie_Sexo: ['', Validators.required],
          Clie_Correo: ['', Validators.required],
          Esta_Id: ['', Validators.required],
          // Muni_Codigo: ['', Validators.required]
        });
        }

ngOnInit(): void {
  this.cargarDepartamentos();
  this.cargarEstados();
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

onDepartmentChange(departmentId: any) {
  console.log("CODIGO: " + departmentId.values)
  // if (departmentId !== '0') {
  //   this.municipioService.getMunicipiosPorDepartamento(departmentId).subscribe(
  //     (data: any) => {
  //       this.municipios =data.map(item => ({ label: item.muni_Descripcion, value: item.muni_Codigo })); 
  //     },
  //     error => {
  //       console.error('Error fetching municipios:', error);
  //     }
  //   );
  // } else {
  //   this.municipios = []; 
  // }
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
  this.router.navigate(['app/IndexComboPersonal'])
}


guardar() {    
  if (this.form.valid) {
    const Clie_Identidad = this.form.value.Clie_Identidad;
    const Clie_Nombre = this.form.value.Clie_Nombre;
    const Clie_Apellido = this.form.value.Clie_Apellido;
    const Clie_Sexo = this.form.value.Clie_Sexo;
    const Clie_Correo = this.form.value.Clie_Correo;
    const Esta_Id = this.form.value.Esta_Id;
    const Muni_Codigo = this.form.value.Muni_Codigo;

    const NuevoCombo: ClientesEnviar = {
    
      Clie_Identidad: Clie_Identidad,
      Clie_Nombre: Clie_Nombre,
      Clie_Apellido: Clie_Apellido,
      Clie_Sexo: Clie_Sexo,
      Clie_Correo: Clie_Correo,
      Esta_Id: Esta_Id,
      Muni_Codigo: Muni_Codigo,
      Clie_Usua_Creacion: 1,
    };

    this.clienteService.agregar(NuevoCombo).subscribe(
      (respuesta: Respuesta) => {
        if (respuesta.success) {
          // this.messageService.add({severity:'success', summary:'Éxito', detail:'!Combo registrado correctamente!'});
          this.clienteService.successMessage = '¡Cliente registrado correctamente!';
          this.router.navigate(['app/IndexComboPersonal']);
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
    this.invalid = true;
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
    ClienteCreateComponent
  ]
})
export class  ComboCreateModule { }
