import { Component, OnInit, NgModule,Inject, ViewChild, ElementRef, ChangeDetectorRef, NgZone } from '@angular/core';
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
import { PaquetesServiceService } from '../../service/paquetes-service.service';
import { LlenarPaquetes, PaquetesDetalles, PaquetesEnviar } from '../../models/PaquetesViewModel';
import { MenuItem,} from 'primeng/api';
import {PromocionServiceService} from 'src/app/demo/service/promocion-service.service'; 
import { Promociones } from '../../models/PromocionViewModel';
import { TabMenuModule } from 'primeng/tabmenu';
import { Bebida, Bebida3, Complemento, Complemento2, Postre, Postre2 } from '../../models/BebidasViewModel';
import { Alimento, Alimento3 } from '../../models/AlimentosViewModel';
import { AutoCompleteModule } from "primeng/autocomplete";
import { CountryService } from '../../service/country.service';
import { DataView } from 'primeng/dataview';
import {CookieService} from 'ngx-cookie-service'
import { cA } from '@fullcalendar/core/internal-common';
import { PaquetesporComidaServiceService } from '../../service/paquetesporcomida-service.service';

@Component({
  selector: 'app-paquete-editar',
  templateUrl: './paquete-editar.component.html',
  styleUrl: './paquete-editar.component.scss',
  providers: [MessageService]
})
export class PaqueteEditarComponent implements OnInit{
  EditarCombo: LlenarPaquetes;
  form: FormGroup;
  ComboId: number;
  selectedImageURL: string | null = null;
  Imagen: string;
  submitted: boolean = false;
  activeTab: string = 'Alimentos';
  mostrar: string = ''; 
  alimentosActivo: boolean = true;
  bebidasActivo: boolean = false;
  PromId: number;
  Usua_Id: number;
  alimentos: any[];
  postres: any[];
  bebidas: any[];
  complementos: any[] = [];
  routeItems: MenuItem[] = [];
  imageSelected: boolean = false;
  showFileUpload: boolean = true;
prueba: string = "";


sortOptions: SelectItem[] = [];

sortOptionsB: SelectItem[] = [];
sortOptionsC: SelectItem[] = [];
sortOptionsP: SelectItem[] = [];
sortOrder: number = 0;

sortField: string = '';

sourceCities: any[] = [];

targetCities: any[] = [];

orderCities: any[] = [];

creado: boolean = false;
cantidadSeleccionadaPorAlimento: { [key: number]: number } = {};
cantidad: number;
@ViewChild('nombreInput') nombreInput: ElementRef;
@ViewChild('precioInput') precioInput: ElementRef;
identificador: string = 'A';
cantidadSeleccionada: number = 0;
initialValues: number[] = [];
cantidadAgregada: number;

  constructor(
    private route: ActivatedRoute,
    private rolService: PaquetesServiceService,
    private formBuilder: FormBuilder,
    private postreService: PostreServiceService,
    private alimentoService: AlimentosServiceService,
    private bebidaService: BebidasServiceService,
    private complementoService: ComplementoServiceService,
    private cookieService: CookieService,
        private messageService: MessageService,
    private router: Router,
    private paqueteComida: PaquetesporComidaServiceService,
    private cd: ChangeDetectorRef,
    private zone: NgZone
  ) { }
  
  ngOnInit(): void {
    this.Usua_Id = Number.parseInt(this.cookieService.get('Usua_Id'));
    this.route.params.subscribe(params => {
      this.ComboId = +params['id'];
      console.log("ID COBO: " + this.ComboId)
      this.obtenerRol(this.ComboId);
      this.cargarAlimentos();
      this.cargarBebidas();
      this.cargarComplementos();
      this.cargarPostres();
    });

    this.form = this.formBuilder.group({
      paqe_Descripcion: ['', Validators.required],
      paqe_Precio: ['', Validators.required],
    });
    this.sortOptions = [
      { label: 'Precio mas alto', value: '!alim_Precio' },
      { label: 'Precio mas bajo', value: 'alim_Precio' }
  ];

  this.sortOptionsB = [
    { label: 'Precio mas alto', value: '!bebi_Precio' },
    { label: 'Precio mas bajo', value: 'bebi_Precio' }
];

this.sortOptionsC = [
  { label: 'Precio mas alto', value: '!comp_Precio' },
  { label: 'Precio mas bajo', value: 'comp_Precio' }
];

this.sortOptionsP = [
{ label: 'Precio mas alto', value: '!post_Precio' },
{ label: 'Precio mas bajo', value: 'post_Precio' }
];



  }
  
  onUpload(event) {
    const file: File = event.files[0];
    this.selectedImageURL = URL.createObjectURL(file);
    if (file) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const uniqueFileName = uniqueSuffix + '-' + file.name;
      this.Imagen = uniqueFileName;
      const formData: FormData = new FormData();
  
      formData.append('file', file, uniqueFileName);
      this.rolService.EnviarImagen(formData).subscribe(
        response => {
          console.log('Upload successful', response);
          if (response.message === "Exito") {
            // this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Imagen Subida', life: 3000 });
          } else {
            this.messageService.add({ severity: 'success', summary: 'Error', detail: 'Suba una imagen', life: 3000 });
          }
        },
        error => {
          console.error('Error uploading image', error);
        }
      );
    }
  }


  onSortChange(event: any) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    } else {
        this.sortOrder = 1;
        this.sortField = value;
    }
}

onFilter(dv: DataView, event: Event) {
    dv.filter((event.target as HTMLInputElement).value);
}


  onTabClick(tab: string, identi: string) {
    this.activeTab = tab;
    this.identificador = identi;
    this.cantidadSeleccionadaPorAlimento = {}; // Resetear cantidades
    console.log("OPCION: " + this.activeTab + " " + "IDENTIFICADOR: " + this.identificador)
  }

  
  // Métodos findItemById para cada categoría
  findComplementoById(id: number): any {
    return this.complementos.find(comp => comp.comp_Id === id);
  }

  findAlimentoById(id: number): any {
    return this.alimentos.find(alim => alim.alim_Id === id);
  }

  findPostreById(id: number): any {
    return this.postres.find(post => post.post_id === id);
  }

  findBebidaById(id: number): any {
    return this.bebidas.find(bebi => bebi.bebi_Id === id);
  }


  incrementarCantidadBebida(id: number) {
    console.log("ID: " + id);
    const item = this.findBebidaById(id);
    if (item) {
      console.log("ITEM: " + item);
      this.zone.run(() => {
        item.cantidadAgregada = (Number(item.cantidadAgregada) || 0) + 1;
        console.log("CANTIDAD: " + item.cantidadAgregada);
      });
    }
  }

  decrementarCantidadBebida(id: number) {
    const item = this.findBebidaById(id);
    if (item && item.cantidadAgregada > 0) {
      this.zone.run(() => {
        item.cantidadAgregada = (Number(item.cantidadAgregada) || 0) - 1;
        console.log("CANTIDAD: " + item.cantidadAgregada);
      });
    }
  }

   // Métodos incrementar y decrementar cantidad para complementos
   incrementarCantidadComplemento(id: number) {
    console.log("ID: " + id);
    const item = this.findComplementoById(id);
    if (item) {
      console.log("ITEM: " + item);
      this.zone.run(() => {
        item.cantidadAgregada = (Number(item.cantidadAgregada) || 0) + 1;
        console.log("CANTIDAD: " + item.cantidadAgregada);
      });
    }
  }

  decrementarCantidadComplemento(id: number) {
    const item = this.findComplementoById(id);
    if (item && item.cantidadAgregada > 0) {
      this.zone.run(() => {
        item.cantidadAgregada = (Number(item.cantidadAgregada) || 0) - 1;
        console.log("CANTIDAD: " + item.cantidadAgregada);
      });
    }
  }

  // Métodos incrementar y decrementar cantidad para alimentos
  incrementarCantidadAlimento(id: number) {
    console.log("ID: " + id);
    const item = this.findAlimentoById(id);
    if (item) {
      console.log("ITEM: " + item);
      this.zone.run(() => {
        item.cantidadAgregada = (Number(item.cantidadAgregada) || 0) + 1;
        console.log("CANTIDAD: " + item.cantidadAgregada);
      });
    }
  }

  decrementarCantidadAlimento(id: number) {
    const item = this.findAlimentoById(id);
    if (item && item.cantidadAgregada > 0) {
      this.zone.run(() => {
        item.cantidadAgregada = (Number(item.cantidadAgregada) || 0) - 1;
        console.log("CANTIDAD: " + item.cantidadAgregada);
      });
    }
  }

  // Métodos incrementar y decrementar cantidad para postres
  incrementarCantidadPostre(id: number) {
    console.log("ID: " + id);
    const item = this.findPostreById(id);
    if (item) {
      console.log("ITEM: " + item);
      this.zone.run(() => {
        item.cantidadAgregada = (Number(item.cantidadAgregada) || 0) + 1;
        console.log("CANTIDAD: " + item.cantidadAgregada);
      });
    }
  }

  decrementarCantidadPostre(id: number) {
    const item = this.findPostreById(id);
    if (item && item.cantidadAgregada > 0) {
      this.zone.run(() => {
        item.cantidadAgregada = (Number(item.cantidadAgregada) || 0) - 1;
        console.log("CANTIDAD: " + item.cantidadAgregada);
      });
    }
  }



  cargarComplementos(){
    this.paqueteComida.getComplementos3(this.ComboId).subscribe(
      (data: any[]) => {
        console.log(data)
        this.complementos = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  cargarPostres(){
    this.paqueteComida.getPostres3(this.ComboId).subscribe(
      (data: any[]) => {
        
        this.postres = data
      },
      error => {
        console.log(error);
      }
    );
  }

  cargarBebidas(){
    this.paqueteComida.getBebidas3(this.ComboId).subscribe(
      (data: any[]) => {
        console.log(data)
        this.bebidas = data
      },
      error => {
        console.log(error);
      }
    );
  }
  cargarAlimentos(){
    this.paqueteComida.getAlimentos3(this.ComboId).subscribe(
      (data: any[]) => {
        this.alimentos = data
        console.log("SFDFDS:" + this.alimentos)
      },
      error => {
        console.log(error);
      }
    );
  }

  findItemById(id: number) {
    return this.alimentos.find(a => a.alim_Id === id) ||
           this.postres.find(p => p.post_id === id) ||
           this.complementos.find(c => c.comp_Id === id) ||
           this.bebidas.find(b => b.bebi_Id === id);
}


  obtenerRol(id: number) {
    this.rolService.obtenerPaquetePorId(id).subscribe(
      (data: any) => {
        this.EditarCombo = data;

        this.Imagen = this.EditarCombo.paqe_Imagen;
        this.selectedImageURL = "https://localhost:44332/uploads/" + this.Imagen;

        console.log("Esta es la imagen: " + this.Imagen)
         this.form.patchValue({
          paqe_Descripcion: this.EditarCombo.paqe_Descripcion,
          paqe_Precio: this.EditarCombo.paqe_Precio,
            
         });
      },
      error => {
        console.log(error);
      }
    );
  }
  Volver(){
    this.router.navigate(['app/paquetes'])
  }

  probando(id: number) {
    const paCo_Identificador = this.identificador;
    let cantidadAgregada = 0;

    if (this.activeTab === 'Complementos') {
      const complemento = this.findComplementoById(id);
      if (complemento) {
          cantidadAgregada = complemento.cantidadAgregada || 0;
      }
  } else if (this.activeTab === 'Alimentos') {
      const alimento = this.findAlimentoById(id);
      if (alimento) {
          cantidadAgregada = alimento.cantidadAgregada || 0;
      }
  } else if (this.activeTab === 'Postres') {
      const postre = this.findPostreById(id);
      if (postre) {
          cantidadAgregada = postre.cantidadAgregada || 0;
      }
  } else if (this.activeTab === 'Bebidas') {
      const bebida = this.findBebidaById(id);
      if (bebida) {
          cantidadAgregada = bebida.cantidadAgregada || 0;
      }
  }
    const Detalle: PaquetesDetalles = {
      paqe_Id: this.ComboId,
      PaCo_Cantidad: cantidadAgregada,
      Prod_Id: id,
      PaCo_Identificador: paCo_Identificador,
      Usua_Id: this.Usua_Id
    }
    console.log("CANTIDAD: " + cantidadAgregada);
    if(cantidadAgregada > 0){
      this.rolService.agregarDetalle(Detalle).subscribe(
        (respuesta: Respuesta) => {
          if (respuesta.success) {
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: '¡Agregado correctamente!' });
          }
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: '¡Ingrese una cantidad!' });
    }
}

  guardar() {    
    if (this.form.valid) {
       const paqe_Id = this.ComboId;
      const paqe_Descripcion = this.form.value.paqe_Descripcion;
      const paqe_Precio = this.form.value.paqe_Precio;
      const paqe_Imagen = this.Imagen;
      const NuevoCombo: PaquetesEnviar = {
        paqe_Id: paqe_Id,
        paqe_Descripcion: paqe_Descripcion,
        paqe_Imagen: paqe_Imagen,
        paqe_Precio: paqe_Precio,
        Paqe_Usua_Modifica: this.Usua_Id
      };
  
      this.rolService.actualizar(NuevoCombo).subscribe(
        (respuesta: Respuesta) => {
          if (respuesta.success) {
           
            this.messageService.add({severity:'success', summary:'Exito', detail:'Paquete actualizado correctamente'});
            // this.router.navigate(['app/IndexPaquetes']);
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
    DataViewModule,
    TabMenuModule,
    AutoCompleteModule
  ],
  declarations: [
    PaqueteEditarComponent
  ]
})
export class  ComboEditarModule { }
