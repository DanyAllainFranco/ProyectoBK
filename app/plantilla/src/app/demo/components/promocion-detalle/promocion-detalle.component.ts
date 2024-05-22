import { Component, OnInit, NgModule,Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
import { MenuItem, SelectItem } from 'primeng/api';
import {PromocionServiceService} from 'src/app/demo/service/promocion-service.service'; 
import { Pantallas } from 'src/app/demo/models/PantallaViewMode';
import { Rol } from 'src/app/demo/models/RolesViewModel';
import { Respuesta } from 'src/app/demo/models/ServiceResult';
import { MessageService } from 'primeng/api';
import { AlimentosAgregados, BebidasAgregadas, ComplementosAgregados, LlenarPromocion, PostresAgregados, Promociones, SucursalesAgregados } from '../../models/PromocionViewModel';
import { ImageModule } from 'primeng/image';
import { GalleriaModule } from 'primeng/galleria';
import { TabMenuModule } from 'primeng/tabmenu';
import { CarouselModule } from 'primeng/carousel';
import { FileUploadModule } from 'primeng/fileupload';


@Component({
  selector: 'app-promocion-detalle',
  templateUrl: './promocion-detalle.component.html',
      styleUrl: './promocion-detalle.component.scss',
      providers: [MessageService]
})
export class PromocionDetalleComponent implements OnInit{
  form: FormGroup;
  sortOptions: SelectItem[] = [];

  sortOrder: number = 0;

  sortField: string = '';

  sourceAlimentos: any[] = [];
  sourceBebidas: any[] = [];
  sourcePostres: any[] = [];
  sourceComplemetos: any[] = [];
  pantallas: Pantallas[] = [];
  activeTab: string = 'Alimentos'; 
  targetCities: any[] = [];
  targetBebida: any[] = [];
  targetPostre: any[] = [];
  targetComplemento: any[] = [];
  orderCities: any[] = [];
  alimentosActivo: boolean = true;
  bebidasActivo: boolean = false;
  PromId: number;
  EditarCombo: LlenarPromocion;
  routeItems: MenuItem[] = [];
  selectedImageURL: string | null = null;
  imageSelected: boolean = false;
  showFileUpload: boolean = true;
prueba: string = "";
Prom_Id: number;
Imagen: string;
  pickListVisible: boolean = false;

  invalid: boolean = false;
  dias: SelectItem[] = [];

  alimentos: AlimentosAgregados[] = [];
  bebidas: BebidasAgregadas[] = [];
  postres: PostresAgregados[] = [];
  complementos: ComplementosAgregados[] = [];
  sucursales: SucursalesAgregados[] = [];
  staticData = [{}];
  constructor(private productService: ProductService,
    private router: Router,
    // private fb: FormBuilder,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
     private rolService: PromocionServiceService) {
      }

      ngOnInit(): void {
        this.route.params.subscribe(params => {
          this.PromId = +params['id'];
          console.log("ID COBO: " + this.PromId)
          this.obtenerRol(this.PromId);
    
        });
        this.cargarAlimentosAgregados();
        this.cargarBebidasAgregados();
        this.cargarPostresAgregados();
        this.cargarComplementosAgregados();
        this.cargarSucursalesAgregados();

        this.form = this.formBuilder.group({
          prom_Descripcion: ['', Validators.required],
          prom_Imagen: [''],
          prom_Precio: ['', Validators.required],
          dias_Id: ['', Validators.required],
          creacion: ['', Validators.required],
          modifica: ['', Validators.required],
          FechaCreacion: ['', Validators.required],
          FechaModificacion: ['', Validators.required],
          // Comb_Precio: ['', Validators.required],
          // Comp_Id: ['', Validators.required],
          // Post_Id: ['', Validators.required],
        });

      }

  cargarDias(){
    this.rolService.getDias().subscribe(
      (data: any[]) => {
        console.log(data)
        this.dias = data.map(item => ({ label: item.dias_Descripcion, value: item.dias_Id }));
      },
      error => {
        console.log(error);
      }
    );
  }
  
  cargarAlimentosAgregados() {
    this.rolService.getAlimentosAgregadas(this.PromId).subscribe(
      (data: any[]) => {
        this.alimentos = data
        console.log("SDA: " + this.alimentos)
      },
      error => {
        console.log(error);
      }
    );
  }

  cargarBebidasAgregados() {
    this.rolService.getBebidasAgregadas(this.PromId).subscribe(
      (data: any[]) => {
      
        this.bebidas = data
      },
      error => {
        console.log(error);
      }
    );
  }

  cargarPostresAgregados() {
    this.rolService.getPostresAgregadas(this.PromId).subscribe(
      (data: any[]) => {
      
        this.postres = data
      },
      error => {
        console.log(error);
      }
    );
  }

  cargarSucursalesAgregados() {
    this.rolService.getSucursalesAgregadas(this.PromId).subscribe(
      (data: any[]) => {
      
        this.sucursales = data
      },
      error => {
        console.log(error);
      }
    );
  }

  cargarComplementosAgregados() {
    this.rolService.getComplementosAgregadas(this.PromId).subscribe(
      (data: any[]) => {
      
        this.complementos = data
      },
      error => {
        console.log(error);
      }
    );
  }
 
  obtenerRol(id: number) {
    this.rolService.obtenerPromoPorId(id).subscribe(
      (data: any) => {
        this.EditarCombo = data;

        this.Imagen = this.EditarCombo.prom_Imagen;
        this.selectedImageURL = "http://sistemarestaurante.somee.com/uploads/" + this.Imagen;

        // this.selectedImageURL = "https://localhost:44332/uploads/" + this.Imagen;

         this.form.patchValue({
          prom_Descripcion: this.EditarCombo.prom_Descripcion,
          // prom_Imagen: this.EditarCombo.prom_Id,
          prom_Precio: this.EditarCombo.prom_Precio,
          dias_Id: this.EditarCombo.dias_Descripcion,
          creacion: this.EditarCombo.usua_Creacion,
          modifica: this.EditarCombo.usua_Modifica,
          FechaCreacion: this.EditarCombo.prom_Fecha_Creacion,
          FechaModificacion: this.EditarCombo.prom_Fecha_Modifica
            // Comb_Precio: this.EditarCombo.comb_Precio,
            // Comp_Id: this.EditarCombo.comp_Id,
            // Post_Id: this.EditarCombo.post_Id,
         });
      },
      error => {
        console.log(error);
      }
    );
  }

  Volver(){
    this.router.navigate(['app/promociones'])
  }
}


@NgModule({
  imports: [
    OrderListModule,
    PickListModule,
    CommonModule,
    ReactiveFormsModule,
    ImageModule,
    TableModule,
    CarouselModule,
    ButtonModule,
    FileUploadModule,
    InputTextModule,
    ToggleButtonModule,
    RippleModule,
    FormsModule,
    MultiSelectModule,
    DropdownModule,
    ProgressBarModule,
    DialogModule,
    ToastModule,
    SliderModule,
    TabMenuModule,
    GalleriaModule,
    RatingModule,
    MatButtonModule,
    DataViewModule
  ],
  declarations: [
    PromocionDetalleComponent
  ]
})
export class PromocionDetalleModule { }