import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Factura } from '../../models/FacturaViewModel';
import { FacturaServiceService } from '../../service/factura-service.service';
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
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-factura-listado',
  templateUrl: './factura-listado.component.html',
  styleUrls: ['./factura-listado.component.scss'],
  providers: [MessageService]

})

export class FacturaListadoComponent implements OnInit {
  // display: boolean = false;
  // submitted = false;
  factura: Factura[] = [];
  // municipios: any[] = [];
  // formSucursal: FormGroup;
  // selectedSucursal: any;
  // modalTitle: string = 'Nueva Sucursal';
  // modalButtonLabel: string = 'Guardar';
  // confirmacionVisible: boolean = false;
  // sucursalAEliminar: Sucursales | null = null;

  constructor(
    private service: FacturaServiceService,
    private router: Router,
    private fb: FormBuilder,
    private _facturaService: FacturaServiceService,
    private messageService: MessageService,
  ) {
    // this.formSucursal = this.fb.group({
    //   sucursal: ["", Validators.required],
    //   Muni_Codigo: ["0",Validators.required],
    //   id: [""]
    // });
  }

  ngOnInit(): void {
    this.getFactura();
  }

  getFactura() {
    this.service.getFactura().subscribe(
      (data: any) => {
        this.factura = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  CrearNuevaFactura(): void {
    this.router.navigate(['/app/IndexFacturacion']);

  }
  // MunicipioDDL() {
  //   this.service.MuninicioDDL().subscribe(
  //     (data: DropMunicipios[]) => {
  //       this.municipios = data;
  //       console.log(data);
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }

  
  // confirmarEliminarSucursal(sucursal: Sucursales) {
  //   this.sucursalAEliminar = sucursal;
  //   this.confirmacionVisible = true;
  // }
  
  // eliminarSucursal() {
  //   if (this.sucursalAEliminar) {
  //     const idSucursal = this.sucursalAEliminar.sucu_Id;
  //     this._sucursalServicio.eliminar(idSucursal).subscribe({
  //       next: (data) => {
  //         this.getSucursales();
  //         this.confirmacionVisible = false;
  //         console.log(idSucursal);
  //         this.messageService.add({severity:'success', summary:'Éxito', detail:'¡Sucursal eliminada correctamente!'});
  //       },
  //       error: (e) => {
  //         console.log(e);
  //         this.messageService.add({severity:'error', summary:'Error', detail:'Esta Sucursal no se puede eliminar.'});
  //       }
  //     });
  //   }
  // }

  // cancelarEliminar() {
  //   this.confirmacionVisible = false;
  // }

  // campoVacio(campo: string): boolean {
  //   return this.formSucursal.get(campo)?.hasError('required') && this.formSucursal.get(campo)?.touched;
  // }

  // displayNuevaSucursal() {
  //   this.formSucursal.reset();
  //   this.modalTitle = 'Nueva Sucursal';
  //   this.modalButtonLabel = 'Guardar';
  //   this.display = true;
  // }

  // editSucursal(sucursal: any) {
  //   this.selectedSucursal = sucursal;
  //   this.modalTitle = 'Editar Sucursal';
  //   this.modalButtonLabel = 'Actualizar';
  //   this.formSucursal.patchValue({
  //     sucursal: sucursal.sucu_Descripcion,
  //     municipio: sucursal.muni_Codigo,
  //     id : sucursal.sucu_Id
  //   });
  //   this.display = true;
  // }

  // guardarSucursal() {
  //   if (this.formSucursal.invalid) {
  //     return;
  //   }
  //   if (this.modalTitle === 'Nueva Sucursal') {
  //     this.nuevaSucursal();
  //   } else {
  //     this.actualizarSucursal();
  //   }
  // }

  // nuevaSucursal() {
  //   const modelo: Sucursales = {
  //     sucu_Descripcion: this.formSucursal.value.sucursal,
  //     muni_Codigo: this.formSucursal.value.Muni_Codigo
  //   }
  //   this._sucursalServicio.agregar(modelo).subscribe({
  //     next: (data) => {  
  //       this.getSucursales();
  //       this.display = false;
  //       this.messageService.add({severity:'success', summary:'Éxito', detail:'¡Sucursal creada correctamente!'});
  //     },
  //     error: (e) => {
  //       console.log(e);
  //       this.messageService.add({severity:'error', summary:'Error', detail:'Sucursal ya existente.'});
  //     }
  //   })
  // }

  // actualizarSucursal() {
  //   const idSucursal = this.selectedSucursal.sucu_Id;
  //   const modelo: Sucursales = {
  //     sucu_Descripcion: this.formSucursal.value.sucursal,
  //     muni_Codigo: this.formSucursal.value.Muni_Codigo,
  //     sucu_Id: this.formSucursal.value.id
  //   }
  //   this._sucursalServicio.actualizar(idSucursal, modelo).subscribe({
  //     next: (data) => {
  //       this.getSucursales();
  //       this.display = false;
  //       console.log(idSucursal);
  //       this.messageService.add({severity:'success', summary:'Éxito', detail:'¡Sucursal editada correctamente!'});
  //     },
  //     error: (e) => {
  //       console.log(e);
  //       this.messageService.add({severity:'error', summary:'Error', detail:'Sucursal ya existente.'});
  //     }
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
  declarations: [FacturaListadoComponent]
})
export class SucursalListadoModule {}
