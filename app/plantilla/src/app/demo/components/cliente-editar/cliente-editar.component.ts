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
import { ComboPEnviar, Llenar } from '../../models/ComboPersonalViewModel';
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
import { Fill } from '../../models/ComboPersonalViewModel';
import { dA } from '@fullcalendar/core/internal-common';
import { Clientes, ClientesEnviar, LlenarClientes } from '../../models/ClientesViewModel';
import { ServiceService } from '../../service/empleado-service.service';
import { DepartamentoServiceService } from '../../service/departamento-service.service';
import { EstadoCivilServiceService } from '../../service/estadocivil-service.service';
import { ClientesServiceService } from '../../service/cliente-service.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cliente-editar',
  templateUrl: './cliente-editar.component.html',
  styleUrl: './cliente-editar.component.scss',
  providers: [MessageService]

})
export class ClienteEditarComponent implements OnInit{

  EditarCombo: LlenarClientes;
  form: FormGroup;
  ComboId: number;
  postres: SelectItem[] = [];
  invalid: boolean = false;
  alimentos: SelectItem[] = [];
  bebidas: SelectItem[] = [];
  complementos: SelectItem[] = [];
  selectedImageURL: string | null = null;
  Imagen: string;
  departamentos: SelectItem[] = [];
  municipios: SelectItem[] = [];
  estadosciviles: SelectItem[] = [];
  DepartamentoId: string;
  submitted = false;
  Usua_Id:number;
  constructor(
    private route: ActivatedRoute,
    private rolService: ClientesServiceService,
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private postreService: PostreServiceService,
    private alimentoService: AlimentosServiceService,
    private bebidaService: BebidasServiceService,
    private complementoService: ComplementoServiceService,
    private messageService: MessageService,
    private municipioService: ServiceService,
    private departamentoService: DepartamentoServiceService,
    private estadoService: EstadoCivilServiceService,
    private router: Router,
  ) { }
  
  ngOnInit(): void {
    this.Usua_Id = Number.parseInt(this.cookieService.get('Usua_Id'));
    this.route.params.subscribe(params => {
      this.ComboId = +params['id'];
      console.log("ID COBO: " + this.ComboId)
      this.obtenerRol(this.ComboId);
    
    });
    this.form = this.formBuilder.group({
      Clie_Identidad: ['', Validators.required],
      Clie_Nombre: ['', Validators.required],
      Clie_Apellido: ['', Validators.required],
      Clie_Sexo: ['', Validators.required],
      Clie_Correo: ['', Validators.required],
      Esta_Id: ['', Validators.required],
       Muni_Codigo: ['', Validators.required],
       Dept_Codigo: [''],
    });
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
  

  obtenerRol(id: number) {
    this.rolService.obtenerCliePorId(id).subscribe(
      (data: any) => {
        this.EditarCombo = data;
        this.form.patchValue({
          Clie_Identidad: this.EditarCombo.clie_Identidad,
          Clie_Nombre: this.EditarCombo.clie_Nombre,
          Clie_Apellido: this.EditarCombo.clie_Apellido,
          Clie_Sexo: this.EditarCombo.clie_Sexo,
          Clie_Correo: this.EditarCombo.clie_Correo,
          Esta_Id: this.EditarCombo.esta_Id,
          Muni_Codigo: this.EditarCombo.muni_Codigo,
          Dept_Codigo: this.EditarCombo.dept_Codigo
        });
        this.onDepartmentChange({ value: this.EditarCombo.dept_Codigo }); // Load municipalities
      },
      error => {
        console.error('Error fetching client data:', error);
      }
    );
  }

  Volver(){
    this.router.navigate(['app/clientes'])
  }

   guardar() {    
     if (this.form.valid) {
        const Clie_Id = this.ComboId;

       const Clie_Identidad = this.form.value.Clie_Identidad;
       const Clie_Nombre = this.form.value.Clie_Nombre;
       const Clie_Apellido = this.form.value.Clie_Apellido;
       const Clie_Sexo = this.form.value.Clie_Sexo;
       const Clie_Correo = this.form.value.Clie_Correo;
       const Esta_Id = this.form.value.Esta_Id;
       const Muni_Codigo = this.form.value.Muni_Codigo;
       const NuevoCombo: ClientesEnviar = {
         clie_Id: Clie_Id,
         clie_Identidad: Clie_Identidad,
         clie_Nombre: Clie_Nombre,
         clie_Apellido: Clie_Apellido,
         clie_Sexo: Clie_Sexo,
         clie_Correo: Clie_Correo,
         esta_Id: Esta_Id,
         muni_Codigo: Muni_Codigo,
         clie_Usua_Modifica: this.Usua_Id,
       };
  
       this.rolService.actualizar(NuevoCombo).subscribe(
         (respuesta: Respuesta) => {
           if (respuesta.success) {
             this.rolService.successMessage = '¡Cliente actualizado correctamente!';
             this.router.navigate(['app/clientes']);
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
    ClienteEditarComponent
    ]
})
export class  ClienteEditarModule { }
