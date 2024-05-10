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
import {RolService} from 'src/app/demo/service/rol.service'; 
import { Pantallas } from 'src/app/demo/models/PantallaViewMode';
import { Rol } from 'src/app/demo/models/RolesViewModel';
import { Respuesta } from 'src/app/demo/models/ServiceResult';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-rol-create',
  templateUrl: './rol-create.component.html',
  styleUrl: './rol-create.component.scss',
  providers: [MessageService]
})
export class RolCreateComponent implements OnInit{

  products: Product[] = [];
  form: FormGroup;
    sortOptions: SelectItem[] = [];

    sortOrder: number = 0;

    sortField: string = '';

    sourceCities: any[] = [];

    pantallas: Pantallas[] = [];

    targetCities: any[] = [];

    orderCities: any[] = [];

    RolId: number;


    pickListVisible: boolean = false;

    invalid: boolean = false;

    constructor(private productService: ProductService,
      private router: Router,
      private fb: FormBuilder,
      
      private messageService: MessageService,
       private rolService: RolService) {
        this.form = this.fb.group({
          rolNombre: ['', Validators.required],
        });
        }

    ngOnInit() {
      this.cargarPantallas();

      
  }

  Volver(){
    this.router.navigate(['app/IndexRol'])
  }
  cargarPantallas() {
    this.rolService.getPantallas().subscribe(
      pantallas => {
      
        this.sourceCities = pantallas.map(pantalla => ({ name: pantalla.pant_Descripcion, code: pantalla.pant_Id }));
      },
      error => {
        console.error('Error al cargar las pantallas:', error);
      }
    );
  }

  guardar() {
    if (this.form.valid) {
        const nombreRol = this.form.value.rolNombre;
        const nuevasPantallas = this.targetCities.map(pantalla => pantalla.code); // Obtener IDs de las pantallas seleccionadas
        const nuevoRol: Rol = {
            rol_Id: 0,
            rol_Descripcion: nombreRol,
        };

        this.rolService.agregar(nuevoRol).subscribe(
            (respuesta: Respuesta) => {
                if (respuesta.success) {
                    // Guardar el ID del rol creado
                    this.RolId = parseInt(respuesta.message);
                   
                    // Agregar las pantallas al rol
                    this.rolService.agregarPantallaARol(nuevasPantallas, this.RolId, 1).subscribe(
                        (respuestaPantallas: Respuesta) => {
                            if (respuestaPantallas.success) {
       
                              
                            } else {
                                console.error('Error al agregar las pantallas al rol:', respuestaPantallas.message);
                            }
                        },
                        error => {
                            console.error('Error en la solicitud HTTP:', error);
                        }
                    );
                    
                    this.rolService.successMessage = '¡Rol registrado correctamente!';
                this.router.navigate(['app/IndexRoles']);
                    // Resto de la lógica de éxito (como mostrar mensajes, redireccionar, etc.)
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

}


@NgModule({
  imports: [
    OrderListModule,
    PickListModule,
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
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
    RatingModule,
    MatButtonModule,
    DataViewModule
  ],
  declarations: [
    RolCreateComponent
  ]
})
export class RolCreateModule { }
