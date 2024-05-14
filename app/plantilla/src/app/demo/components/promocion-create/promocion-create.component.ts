import { Component, OnInit, NgModule,Inject } from '@angular/core';
import { Router } from '@angular/router';
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
import { Promociones } from '../../models/PromocionViewModel';
import { ImageModule } from 'primeng/image';
import { GalleriaModule } from 'primeng/galleria';
import { TabMenuModule } from 'primeng/tabmenu';
import { CarouselModule } from 'primeng/carousel';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-promocion-create',
  templateUrl: './promocion-create.component.html',
  styleUrl: './promocion-create.component.scss',
  providers: [MessageService]
})
export class PromocionCreateComponent implements OnInit{
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

    routeItems: MenuItem[] = [];
    selectedImageURL: string | null = null;
    imageSelected: boolean = false;
    showFileUpload: boolean = true;
prueba: string = "";

    pickListVisible: boolean = false;

    invalid: boolean = false;
    dias: SelectItem[] = [];

    constructor(private productService: ProductService,
      private router: Router,
      private fb: FormBuilder,
      
      private messageService: MessageService,
       private rolService: PromocionServiceService) {
        this.form = this.fb.group({
          Prom_Descripcion: ['', Validators.required],
          Prom_Precio: ['', Validators.required],
          Dias_Id: ['', Validators.required],
        });
        }

ngOnInit(): void {
  this.cargarAlimentos();
  this.cargarDias();
  this.cargarBebidas();
  this.cargarPostres();
  this.cargarComplementos();
}
onImageSelect(event: any) {
    
  const selectedFile: File = event.files[0];
  this.selectedImageURL = URL.createObjectURL(selectedFile);
  this.imageSelected = true;
  this.showFileUpload = true;

  this.prueba = selectedFile.name;
  console.log("Imagen: " + this.prueba)
}

onUpload(event) {
  const file: File = event.files[0];
   this.selectedImageURL = URL.createObjectURL(file);
  if (file) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const uniqueFileName = uniqueSuffix + '-' + file.name;
    this.prueba = uniqueFileName;
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


 onTabClick(tab: string) {
  this.activeTab = tab;
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


cargarComplementos() {
  this.rolService.getComplementos(0).subscribe(
    complementos => {
      this.sourceComplemetos = complementos.map(complemento => ({ name: complemento.comp_Descripcion, code: complemento.comp_Id }));
    },
    error => {
      console.error('Error al cargar las pantallas:', error);
    }
  );
}

cargarPostres() {
  this.rolService.getPostres(0).subscribe(
    postres => {
      this.sourcePostres = postres.map(postre => ({ name: postre.post_Descripcion, code: postre.post_id }));
    },
    error => {
      console.error('Error al cargar las pantallas:', error);
    }
  );
}

cargarBebidas() {
  this.rolService.getBebidas(0).subscribe(
    bebidas => {
      this.sourceBebidas = bebidas.map(bebida => ({ name: bebida.bebi_Descripcion, code: bebida.bebi_Id }));
    },
    error => {
      console.error('Error al cargar las pantallas:', error);
    }
  );
}

cargarAlimentos() {
  this.rolService.getAlimentos(0).subscribe(
    objetos => {
      console.log("Prueba: " + objetos)
      this.sourceAlimentos = objetos.map(objeto => ({ name: objeto.alim_Descripcion, code: objeto.alim_Id }));
    },
    error => {
      console.error('Error al cargar las pantallas:', error);
    }
  );
}

guardar() {
  if (this.form.valid) {
      const Prom_Descripcion = this.form.value.Prom_Descripcion;
      const Prom_Precio = this.form.value.Prom_Precio;
      const Dias_Id = this.form.value.Dias_Id;
      const prom_Imagen = this.prueba;
      const alimentosAgregados = this.targetCities.map(objeto => objeto.code);
      const bebidasAgregadas = this.targetBebida.map(bebida => bebida.code);
      const postresAgregados = this.targetPostre.map(postre => postre.code);
      const complementosAgregados = this.targetComplemento.map(complemento => complemento.code);
      console.log("alimentos: " + alimentosAgregados)
      console.log("bebidas: " + bebidasAgregadas)
      console.log("postres: " + postresAgregados)
      console.log("complementos: " + complementosAgregados)
      const nuevoRol: Promociones = {
          prom_Id: 0,
          prom_Descripcion: Prom_Descripcion,
          prom_Imagen: prom_Imagen,
          prom_Precio: Prom_Precio,
          dias_Id: Dias_Id
      };

      this.rolService.agregar(nuevoRol).subscribe(
          (respuesta: Respuesta) => {
              if (respuesta.success) {
                  // Guardar el ID del rol creado
                  this.PromId = parseInt(respuesta.message);
                 console.log("VERIFICANDO: " + alimentosAgregados)
                  this.rolService.agregarAlimentos(alimentosAgregados, this.PromId).subscribe(
                      (respuesta: Respuesta) => {
                          if (respuesta.success) {
                            console.log("alimentos agregados con exito")
                          } else {
                              console.error('Error al agregar las pantallas al rol:', respuesta.message);
                          }
                      },
                      error => {
                          console.error('Error en la solicitud HTTP:', error);
                      }
                  );
                  this.rolService.agregarBebidas(bebidasAgregadas, this.PromId).subscribe(
                    (respuesta: Respuesta) => {
                        if (respuesta.success) {
                          console.log("Bebidas agregadas con exito")
                        } else {
                            console.error('Error al agregar las pantallas al rol:', respuesta.message);
                        }
                    },
                    error => {
                        console.error('Error en la solicitud HTTP:', error);
                    }
                );
                this.rolService.agregarPostres(postresAgregados, this.PromId).subscribe(
                  (respuesta: Respuesta) => {
                      if (respuesta.success) {
                        console.log("postres agregadas con exito")
                      } else {
                          console.error('Error al agregar las pantallas al rol:', respuesta.message);
                      }
                  },
                  error => {
                      console.error('Error en la solicitud HTTP:', error);
                  }
              );
              this.rolService.agregarComplementos(complementosAgregados, this.PromId).subscribe(
                (respuesta: Respuesta) => {
                    if (respuesta.success) {
                      console.log("Complementos agregadas con exito")
                    } else {
                        console.error('Error al agregar las pantallas al rol:', respuesta.message);
                    }
                },
                error => {
                    console.error('Error en la solicitud HTTP:', error);
                }
            );
                  
                  this.rolService.successMessage = '¡Promocion registrada correctamente!';
              this.router.navigate(['app/IndexPromocion']);
              
              } else {
                  console.error('Error al crear el rol:', respuesta.message);
              }
          },
          error => {
              console.error('Error al crear el rol:', error);
          }
      );
  } else {
      console.log("Ingrese los campos")
      this.invalid = true;
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


Volver(){
  this.router.navigate(['app/IndexPromocion'])
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
    PromocionCreateComponent
  ]
})
export class PromocionCreateModule { }