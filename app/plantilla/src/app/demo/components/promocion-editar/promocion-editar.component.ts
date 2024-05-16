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
import { LlenarPromocion, Promociones } from '../../models/PromocionViewModel';
import { ImageModule } from 'primeng/image';
import { GalleriaModule } from 'primeng/galleria';
import { TabMenuModule } from 'primeng/tabmenu';
import { CarouselModule } from 'primeng/carousel';
import { FileUploadModule } from 'primeng/fileupload';


@Component({
  selector: 'app-promocion-editar',
  templateUrl: './promocion-editar.component.html',
  styleUrl: './promocion-editar.component.scss',
  providers: [MessageService]
})
export class PromocionEditarComponent implements OnInit{
form: FormGroup;
    sortOptions: SelectItem[] = [];

    sortOrder: number = 0;

    sortField: string = '';
    submitted: boolean = false;
    sourceAlimentos: any[] = [];
    sourceBebidas: any[] = [];
    sourcePostres: any[] = [];
    sourceComplemetos: any[] = [];
    sourceSucursal: any[] = [];

    pantallas: Pantallas[] = [];
    activeTab: string = 'Alimentos'; 
    targetCities: any[] = [];
    targetBebida: any[] = [];
    targetPostre: any[] = [];
    targetComplemento: any[] = [];
    targetSucursal: any[] = [];

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
          this.cargarAlimentos();
          this.cargarDias();
          this.cargarBebidas();
          this.cargarPostres();
          this.cargarSucursales();
          this.cargarComplementos();
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
            // Comb_Precio: ['', Validators.required],
            // Comp_Id: ['', Validators.required],
            // Post_Id: ['', Validators.required],
          });

        }
        onImageSelect(event: any) {
            
          const selectedFile: File = event.files[0];
          this.selectedImageURL = URL.createObjectURL(selectedFile);
          this.imageSelected = true;
          this.showFileUpload = true;
        
          this.prueba = selectedFile.name;
          console.log("Imagen: " + this.prueba)
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
        
        cargarAlimentosAgregados() {
          this.rolService.getAlimentosAgregadas(this.PromId).subscribe(
            pantallas => {
              if (pantallas && pantallas.length > 0) {
                this.targetCities = pantallas.map(pantalla => ({ name: pantalla.alim_Descripcion, code: pantalla.alim_Id }));
              } else {
                this.targetCities = [];
              }
            },
            error => {
              console.error('Error al cargar las pantallas agregadas:', error);
            }
          );
        }

        cargarBebidasAgregados() {
          this.rolService.getBebidasAgregadas(this.PromId).subscribe(
            bebidas => {
              if (bebidas && bebidas.length > 0) {
                this.targetBebida = bebidas.map(bebida => ({ name: bebida.bebi_Descripcion, code: bebida.bebi_Id }));
              } else {
                this.targetBebida = [];
              }
            },
            error => {
              console.error('Error al cargar las pantallas agregadas:', error);
            }
          );
        }

        cargarPostresAgregados() {
          this.rolService.getPostresAgregadas(this.PromId).subscribe(
            bebidas => {
              if (bebidas && bebidas.length > 0) {
                this.targetPostre = bebidas.map(bebida => ({ name: bebida.post_Descripcion, code: bebida.post_id }));
              } else {
                this.targetPostre = [];
              }
            },
            error => {
              console.error('Error al cargar las pantallas agregadas:', error);
            }
          );
        }

        cargarComplementosAgregados() {
          this.rolService.getComplementosAgregadas(this.PromId).subscribe(
            bebidas => {
              if (bebidas && bebidas.length > 0) {
                this.targetComplemento = bebidas.map(bebida => ({ name: bebida.comp_Descripcion, code: bebida.comp_Id }));
              } else {
                this.targetComplemento = [];
              }
            },
            error => {
              console.error('Error al cargar las pantallas agregadas:', error);
            }
          );
        }
        cargarSucursalesAgregados() {
          this.rolService.getSucursalesAgregadas(this.PromId).subscribe(
            sucursales => {
              if (sucursales && sucursales.length > 0) {
                this.targetSucursal = sucursales.map(sucursal => ({ name: sucursal.sucu_Descripcion, code: sucursal.sucu_Id }));
              } else {
                this.targetSucursal = [];
              }
            },
            error => {
              console.error('Error al cargar las pantallas agregadas:', error);
            }
          );
        }

        cargarComplementos() {
          this.rolService.getComplementos(this.PromId).subscribe(
            complementos => {
              this.sourceComplemetos = complementos.map(complemento => ({ name: complemento.comp_Descripcion, code: complemento.comp_Id }));
            },
            error => {
              console.error('Error al cargar las pantallas:', error);
            }
          );
        }
        
        cargarPostres() {
          this.rolService.getPostres(this.PromId).subscribe(
            postres => {
              this.sourcePostres = postres.map(postre => ({ name: postre.post_Descripcion, code: postre.post_id }));
            },
            error => {
              console.error('Error al cargar las pantallas:', error);
            }
          );
        }
        
        cargarBebidas() {
          this.rolService.getBebidas(this.PromId).subscribe(
            bebidas => {
              this.sourceBebidas = bebidas.map(bebida => ({ name: bebida.bebi_Descripcion, code: bebida.bebi_Id }));
            },
            error => {
              console.error('Error al cargar las pantallas:', error);
            }
          );
        }
        
        cargarAlimentos() {
          this.rolService.getAlimentos(this.PromId).subscribe(
            objetos => {
              console.log("Prueba: " + objetos)
              this.sourceAlimentos = objetos.map(objeto => ({ name: objeto.alim_Descripcion, code: objeto.alim_Id }));
            },
            error => {
              console.error('Error al cargar las pantallas:', error);
            }
          );
        }

        cargarSucursales() {
          this.rolService.getSucursales(this.PromId).subscribe(
            sucursales => {
              console.log("Prueba: " + sucursales)
              this.sourceSucursal = sucursales.map(sucursal => ({ name: sucursal.sucu_Descripcion, code: sucursal.sucu_Id }));
            },
            error => {
              console.error('Error al cargar las pantallas:', error);
            }
          );
        }

        obtenerRol(id: number) {
          this.rolService.obtenerPromoPorId(id).subscribe(
            (data: any) => {
              this.EditarCombo = data;

              this.Imagen = this.EditarCombo.prom_Imagen;
              this.selectedImageURL = "https://localhost:44332/uploads/" + this.Imagen;

              // this.selectedImageURL = "https://localhost:44332/uploads/" + this.Imagen;
      
              // console.log("Esta es la imagen: " + this.Imagen)
              this.cargarPostres();
              this.cargarAlimentos();
              this.cargarBebidas();
              this.cargarComplementos();
               this.form.patchValue({
                prom_Descripcion: this.EditarCombo.prom_Descripcion,
                // prom_Imagen: this.EditarCombo.prom_Id,
                prom_Precio: this.EditarCombo.prom_Precio,
                dias_Id: this.EditarCombo.dias_Id,
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
      
        guardar() {
          if (this.form.valid) {
              const Prom_Id = this.PromId;
              const Prom_Descripcion = this.form.value.prom_Descripcion;
              const Prom_Precio = this.form.value.prom_Precio;
              const Dias_Id = this.form.value.dias_Id;
              const Usua_Id = 1;
              const prom_Imagen = this.Imagen;
              const alimentosAgregados = this.targetCities.map(objeto => objeto.code);
              const bebidasAgregadas = this.targetBebida.map(bebida => bebida.code);
              const postresAgregados = this.targetPostre.map(postre => postre.code);
              const complementosAgregados = this.targetComplemento.map(complemento => complemento.code);
              const sucursalesAgregados = this.targetSucursal.map(sucursal => sucursal.code);
              console.log("alimentos: " + alimentosAgregados)
              console.log("bebidas: " + bebidasAgregadas)
              console.log("postres: " + postresAgregados)
              console.log("complementos: " + complementosAgregados)
              const nuevoRol: Promociones = {
                  prom_Id:Prom_Id,
                  prom_Descripcion: Prom_Descripcion,
                  prom_Imagen: prom_Imagen,
                  prom_Precio: Prom_Precio,
                  dias_Id: Dias_Id
              };
        
              this.rolService.actualizar(nuevoRol).subscribe(
                  (response) => {
                
                          this.rolService.eliminarAlimentos(this.PromId).subscribe(
                            (respuestaPantallas: Respuesta) => {
                            
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
                            
                          },
                          error => {
                              console.error('Error en la solicitud HTTP:', error);
                          }
                          );
                                  
                          this.rolService.eliminarBebidas(this.PromId).subscribe(
                          
                           (respuestaPantallas: Respuesta) => {
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
                           },error => {
                             console.error('Error en la solicitud HTTP:', error);
                         }             
                       );
                       this.rolService.eliminarPostres(this.PromId).subscribe(
                        (respuestaPantallas: Respuesta) => {
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
                         },error => {
                           console.error('Error en la solicitud HTTP:', error);
                       }  
                      );   
                      
                       this.rolService.eliminarComplementos(this.PromId).subscribe(
                         (respuestaPantallas: Respuesta) => {
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
                              
                         },error => {
                           console.error('Error en la solicitud HTTP:', error);
                       }  
                       );

                       this.rolService.eliminarSucursales(this.PromId).subscribe(
                        (respuestaPantallas: Respuesta) => {
                          this.rolService.agregarSucursales(sucursalesAgregados, this.PromId, Usua_Id).subscribe(
                            (respuesta: Respuesta) => {
                                if (respuesta.success) {
                                  console.log("Sucursales agregadas con exito")
                                } else {
                                    console.error('Error al agregar las pantallas al rol:', respuesta.message);
                                }
                            },
                            error => {
                                console.error('Error en la solicitud HTTP:', error);
                            }
                        );
                             
                        },error => {
                          console.error('Error en la solicitud HTTP:', error);
                      }  
                      );
                     
                          this.rolService.successMessage = '¡Promocion actualizada correctamente!';
                      this.router.navigate(['app/IndexPromocion']);
                      
                    
                  },
                  error => {
                      console.error('Error al crear el rol:', error);
                  }
              );
          } else {
            this.submitted = true;
          }
        }

  Volver(){
    this.router.navigate(['app/IndexPromocion'])
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
    PromocionEditarComponent
  ]
})
export class PromocionEditarModule { }

