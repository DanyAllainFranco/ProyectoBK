import { Component, OnInit, NgModule, Inject } from '@angular/core';
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
import { RolService } from 'src/app/demo/service/rol.service';
import { Pantallas, PantallasAgregadas } from 'src/app/demo/models/PantallaViewMode';
import { Rol } from 'src/app/demo/models/RolesViewModel';
import { Respuesta } from 'src/app/demo/models/ServiceResult';
import { MessageService } from 'primeng/api';
import { dA } from '@fullcalendar/core/internal-common';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-rol-editar',
  templateUrl: './rol-editar.component.html',
  styleUrl: './rol-editar.component.scss',
  providers: [MessageService]
})
export class RolEditarComponent implements OnInit {
  rolId: number;
  rol: Rol;
  form: FormGroup;
  sortOptions: SelectItem[] = [];

  sortOrder: number = 0;
  submitted = false;
  sortField: string = '';

  sourceCities: any[] = [];

  pantallas: Pantallas[] = [];

  targetCities: any[] = [];

  orderCities: any[] = [];

  RolId: number;

  Usua_Id:number;


  pickListVisible: boolean = false;

  invalid: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private router: Router,
    private rolService: RolService,
    private formBuilder: FormBuilder,
  ) { }
  ngOnInit(): void {
  
    this.Usua_Id = Number.parseInt(this.cookieService.get('Usua_Id'));
    this.route.params.subscribe(params => {
      this.rolId = +params['id'];
      this.obtenerRol(this.rolId);
      this.cargarPantallas();
      this.cargarPantallasAgregadas();
    });
    this.form = this.formBuilder.group({
      nombreRol: ['', Validators.required]
    });

  }
 


  cargarPantallas() {
    this.rolService.getPantallas2(this.rolId).subscribe(
      pantallas => {
        this.sourceCities = pantallas.map(pantalla => ({ name: pantalla.pant_Descripcion, code: pantalla.pant_Id }));
      },
      error => {
        console.error('Error al cargar las pantallas:', error);
      }
    );
  }
  cargarPantallasAgregadas() {
    this.rolService.getPantallasAgregadas(this.rolId).subscribe(
      pantallas => {
        if (pantallas && pantallas.length > 0) {
          this.targetCities = pantallas.map(pantalla => ({ name: pantalla.pant_Descripcion, code: pantalla.pant_Id }));
        } else {
          this.targetCities = [];
        }
      },
      error => {
        console.error('Error al cargar las pantallas agregadas:', error);
      }
    );
  }
  

  submitForm() {
    if (this.form.valid) {
      const nuevoNombre = this.form.value.nombreRol;
      const usuaId = this.Usua_Id;
      // const idprueba = this.form.value.
      const nuevasPantallas = this.targetCities.map(pantalla => pantalla.code); // Obtener IDs de las pantallas seleccionadas

      this.rolService.actualizar({ ...this.rol, rol_Descripcion: nuevoNombre, Rol_Usua_Modifica: usuaId }).subscribe(
        (response) => {
          console.log("ID ROL:" + " " + this.rolId)

          this.rolService.eliminarPantallasDeRol(this.rolId).subscribe(
            (respuestaPantallas: Respuesta) => {
            
                 // Agregar las pantallas al rol
                 this.rolService.agregarPantallaARol(nuevasPantallas, this.rolId, 1).subscribe(
                  (respuestaPantallas: Respuesta) => {
                       if (respuestaPantallas.success) {
 
                        
                       } else {
                         console.error('Error al agregar las pantallas al rol:', respuestaPantallas.message);
                       }
                       this.rolService.successMessage = '¡Rol actualizado correctamente!';
                       this.router.navigate(['app/IndexRoles']);
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
                  
        },
        error => {
          console.error('Error al actualizar el rol:', error);
          // Puedes mostrar un mensaje de error al usuario aquí
        }
      );
    }
    else{
      this.submitted = true;
    }
  }

  onNombreRolChange(newValue: string) {
    if (this.rol) {
      this.rol.rol_Descripcion = newValue;
    }
  }
  
  obtenerRol(id: number) {
    this.rolService.obtenerRolPorId(id).subscribe(
      (data: Rol) => {
        this.rol = data;
        console.log(data)
        console.log("Este es el rol: " + this.rol.rol_Descripcion)
        this.form.patchValue({
          nombreRol: this.rol.rol_Descripcion
        });
      },
      error => {
        console.log(error);
      }
    );
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
    RolEditarComponent
  ]
})
export class RolEditarModule { }
