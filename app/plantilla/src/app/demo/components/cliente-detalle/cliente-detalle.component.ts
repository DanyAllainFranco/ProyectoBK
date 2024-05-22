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
import { LlenarClientes } from '../../models/ClientesViewModel';
import { ClientesServiceService } from '../../service/cliente-service.service';

@Component({
  selector: 'app-cliente-detalle',
  templateUrl: './cliente-detalle.component.html',
  styleUrl: './cliente-detalle.component.scss',
  providers: [MessageService]
})
export class ClienteDetalleComponent implements OnInit{
  EditarCombo: LlenarClientes;
  form: FormGroup;
  ComboId: number;
  staticData = [{}];
  constructor(
    private route: ActivatedRoute,
    private rolService: ClientesServiceService,
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
      Clie_Identidad: ['', Validators.required],
      Clie_Nombre: ['',Validators.required],
      Clie_Apellido: ['', Validators.required],
      Clie_Sexo: ['', Validators.required],
      Clie_Correo: ['', Validators.required],
      Esta_Descripcion: ['', Validators.required],
      Muni_Descripcion: ['', Validators.required],
      Depa_Descripcion: ['', Validators.required],
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
        Clie_Identidad: this.EditarCombo.clie_Identidad,
        Clie_Nombre: this.EditarCombo.clie_Nombre,
        Clie_Apellido: this.EditarCombo.clie_Apellido,
        Clie_Sexo: this.EditarCombo.clie_Sexo,
        Clie_Correo: this.EditarCombo.clie_Correo,
        Esta_Descripcion: this.EditarCombo.esta_Descripcion,
        Muni_Descripcion: this.EditarCombo.muni_Descripcion,
        Depa_Descripcion: this.EditarCombo.dept_Descripcion,
          creacion: this.EditarCombo.usua_Creacion,
          modifica: this.EditarCombo.usua_Modifica,
          FechaCreacion: this.EditarCombo.clie_Fecha_Creacion,
          FechaModificacion: this.EditarCombo.clie_Fecha_Modifica
       });
    },
    error => {
      console.log(error);
    }
  );
}
Volver(){
  this.router.navigate(['app/clientes'])
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
    ClienteDetalleComponent
  ]
})
export class  ClienteDetalleModule { }