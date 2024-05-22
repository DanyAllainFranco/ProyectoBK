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
import {RolService} from 'src/app/demo/service/rol.service'; 
import { Pantallas, PantallasAgregadas } from 'src/app/demo/models/PantallaViewMode';
import { Rol } from 'src/app/demo/models/RolesViewModel';
import { Respuesta } from 'src/app/demo/models/ServiceResult';
import { MessageService } from 'primeng/api';
import { Fill } from '../../models/RolesViewModel';
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
import { dA } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-rol-detalle',
  templateUrl: './rol-detalle.component.html',
  styleUrl: './rol-detalle.component.scss',
  providers: [MessageService]
})
export class RolDetalleComponent implements OnInit{
  EditarCombo: Fill;
  form: FormGroup;
  ComboId: number;
  postres: SelectItem[] = [];
  invalid: boolean = false;
  alimentos: SelectItem[] = [];
  bebidas: SelectItem[] = [];
  complementos: SelectItem[] = [];
  Imagen: string;
  staticData = [{}];
  pantallas: PantallasAgregadas[] = [];
  constructor(
    private route: ActivatedRoute,
    private rolService: RolService,
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
       nombreRol: ['', Validators.required],
       codigo: ['',Validators.required],
       pantallas: ['', Validators.required],
       creacion: ['', Validators.required],
       modifica: ['', Validators.required],
       FechaCreacion: ['', Validators.required],
       FechaModificacion: ['', Validators.required],
     });
     this.ObtenerPantallas();
 }

ObtenerPantallas(){
  this.rolService.getPantallasAgregadas(this.ComboId).subscribe(
    (data: any[]) => {
      
      this.pantallas = data
    },
    error => {
      console.log(error);
    }
  );
}

 obtenerRol(id: number) {
  this.rolService.obtenerRolPorId(id).subscribe(
    (data: any) => {
      this.EditarCombo = data;
       this.form.patchValue({
         nombreRol: this.EditarCombo.rol_Descripcion,
          codigo: this.EditarCombo.rol_Id,
          pantallas: this.EditarCombo.pant_Descripcion,
          creacion: this.EditarCombo.usuarioCreacion,
          modifica: this.EditarCombo.usuarioModificacion,
          FechaCreacion: this.EditarCombo.rol_Fecha_Creacion,
          FechaModificacion: this.EditarCombo.rol_Fecha_Modifica
       });
    },
    error => {
      console.log(error);
    }
  );
}
Volver(){
  this.router.navigate(['app/roles'])
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
    RolDetalleComponent
  ]
})
export class  RolDetalleModule { }
