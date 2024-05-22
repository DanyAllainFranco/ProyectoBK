import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Sucursales, SucursalesMostrar } from '../../models/SucursalesViewModel';
import { DropMunicipios } from '../../models/MunicipioViewModel';
import { SucursalServiceService } from '../../service/sucursal-service.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { MessageService, SelectItem } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { DepartamentoServiceService } from '../../service/departamento-service.service';
import { ServiceService } from '../../service/municipio-service.service';
import { dropDepartamento } from '../../models/DepartamentosViewModel';
import { CookieService } from 'ngx-cookie-service';
import { CreationGuard } from '../../service/autguard-url.service';
@Component({
  selector: 'app-sucursal-listado',
  templateUrl: './sucursal-listado.component.html',
  styleUrls: ['./sucursal-listado.component.scss'],
  providers: [MessageService]

})

export class SucursalListadoComponent implements OnInit {
  display: boolean = false;
  submitted = false;
  sucursal: SucursalesMostrar[] = [];
  formSucursal: FormGroup;
  selectedSucursal: any;
  modalTitle: string = 'Nueva Sucursal';
  modalButtonLabel: string = 'Guardar';
  confirmacionVisible: boolean = false;
  sucursalAEliminar: Sucursales | null = null;
  departamentos: any[] = [];
  municipios: SelectItem[] = [];
  Usua_Id:number;
  constructor(
    private service: SucursalServiceService,
    private router: Router,
    private fb: FormBuilder,
    private cookieService: CookieService,
    private _sucursalServicio: SucursalServiceService,
    private messageService: MessageService,
    private departamentoService: DepartamentoServiceService,
    private municipioService: ServiceService, 
    private creationGuard: CreationGuard
  ) {
    this.formSucursal = this.fb.group({
      sucursal: ["", Validators.required],
      Dept_Codigo: ["0", Validators.required],
      Muni_Codigo: ["0",Validators.required],
      id: [""]
    });
    
  }

  ngOnInit(): void {
    this.getSucursales();
    this.Usua_Id = Number.parseInt(this.cookieService.get('Usua_Id'));
    this.municipioService.getDropDownsDepartamentos().subscribe((data: dropDepartamento[]) => {
      this.departamentos = data;
  });
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
  
  
  onDepartmentChange(departmentId) {
    console.log("ID: "+ departmentId)
    if (departmentId !== '0') {
      this.municipioService.getMunicipios2(departmentId).subscribe(
        (data: any) => {
          this.municipios = data; 
        },
        error => {
          console.error('Error fetching municipios:', error);
        }
      );
    } else {
      this.municipios = []; // Clear municipios if the department is invalid or reset
    }
  }

  detalleRol(combId: number) {
    this.creationGuard.allow();
    this.router.navigate(['app/DetalleSucursal', combId]); 
  }

  getSucursales() {
    this.service.getSucursal().subscribe(
      (data: any) => {
        this.sucursal = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  
  confirmarEliminarSucursal(sucursal: Sucursales) {
    this.sucursalAEliminar = sucursal;
    this.confirmacionVisible = true;
  }
  
  eliminarSucursal() {
    if (this.sucursalAEliminar) {
      const idSucursal = this.sucursalAEliminar.sucu_Id;
      this._sucursalServicio.eliminar(idSucursal).subscribe({
        next: (data) => {
          this.getSucursales();
          this.confirmacionVisible = false;
          console.log(idSucursal);
          this.messageService.add({severity:'success', summary:'Éxito', detail:'¡Sucursal eliminada correctamente!'});
        },
        error: (e) => {
          console.log(e);
          this.messageService.add({severity:'error', summary:'Error', detail:'Esta Sucursal no se puede eliminar.'});
        }
      });
    }
  }

  cancelarEliminar() {
    this.confirmacionVisible = false;
  }

  campoVacio(campo: string): boolean {
    return this.formSucursal.get(campo)?.hasError('required') && this.formSucursal.get(campo)?.touched;
  }

  displayNuevaSucursal() {
    this.formSucursal.reset();
    this.modalTitle = 'Nueva Sucursal';
    this.modalButtonLabel = 'Guardar';
    this.display = true;
  }

  editSucursal(sucursal: any) {
    this.selectedSucursal = sucursal;
    this.modalTitle = 'Editar Sucursal';
    this.modalButtonLabel = 'Actualizar';
    this.formSucursal.patchValue({
      sucursal: sucursal.sucu_Descripcion,
      municipio: sucursal.muni_Codigo,
      id : sucursal.sucu_Id
    });
    this.display = true;
  }

  guardarSucursal() {
    if (this.formSucursal.invalid) {
      return;
    }
    if (this.modalTitle === 'Nueva Sucursal') {
      this.nuevaSucursal();
    } else {
      this.actualizarSucursal();
    }
  }

  nuevaSucursal() {
    const modelo: Sucursales = {
      sucu_Descripcion: this.formSucursal.value.sucursal,
      muni_Codigo: this.formSucursal.value.Muni_Codigo,
      sucu_Usua_Creacion: this.Usua_Id
    }
    this._sucursalServicio.agregar(modelo).subscribe({
      next: (data) => {  
        this.getSucursales();
        this.display = false;
        this.messageService.add({severity:'success', summary:'Éxito', detail:'¡Sucursal creada correctamente!'});
      },
      error: (e) => {
        console.log(e);
        this.messageService.add({severity:'error', summary:'Error', detail:'Sucursal ya existente.'});
      }
    })
  }

  actualizarSucursal() {
    const idSucursal = this.selectedSucursal.sucu_Id;
    const modelo: Sucursales = {
      sucu_Descripcion: this.formSucursal.value.sucursal,
      muni_Codigo: this.formSucursal.value.Muni_Codigo,
      sucu_Id: this.formSucursal.value.id,
      sucu_Usua_Modifica: this.Usua_Id
    }
    this._sucursalServicio.actualizar(idSucursal, modelo).subscribe({
      next: (data) => {
        this.getSucursales();
        this.display = false;
        console.log(idSucursal);
        this.messageService.add({severity:'success', summary:'Éxito', detail:'¡Sucursal editada correctamente!'});
      },
      error: (e) => {
        console.log(e);
        this.messageService.add({severity:'error', summary:'Error', detail:'Sucursal ya existente.'});
      }
    })
  }
}

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ToggleButtonModule,
    RippleModule,
    MultiSelectModule,
    DropdownModule,
    ProgressBarModule,
    DialogModule,
    ToastModule,
    SliderModule,
    RatingModule
    ],
  declarations: [SucursalListadoComponent]
})
export class SucursalListadoModule {}
