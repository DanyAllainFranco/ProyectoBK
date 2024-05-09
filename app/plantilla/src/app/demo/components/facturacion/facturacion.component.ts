import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Sucursales } from '../../models/SucursalesViewModel';
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
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SidebarModule } from 'primeng/sidebar';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TooltipModule } from 'primeng/tooltip';
import { AutoCompleteModule } from "primeng/autocomplete";
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.scss'],
  providers: [MessageService]

})

export class FacturacionComponent{
  display: boolean = false;
  // submitted = false;
  // sucursal: Sucursales[] = [];
  // municipios: any[] = [];
  // formSucursal: FormGroup;
  // selectedSucursal: any;
  // modalTitle: string = 'Nueva Sucursal';
  // modalButtonLabel: string = 'Guardar';
  // confirmacionVisible: boolean = false;
  // sucursalAEliminar: Sucursales | null = null;

  // constructor(
  //   private service: SucursalServiceService,
  //   private router: Router,
  //   private fb: FormBuilder,
  //   private _sucursalServicio: SucursalServiceService,
  //   private messageService: MessageService,
  // ) {
  //   this.formSucursal = this.fb.group({
  //     sucursal: ["", Validators.required],
  //     Muni_Codigo: ["0",Validators.required],
  //     id: [""]
  //   });
  // }

  // ngOnInit(): void {
  //   this.MunicipioDDL(); // Llama a la función para cargar los datos del Dropdown
  // }


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
  //   })
  // }
}

@NgModule({
  imports: [
    CommonModule,
		ToastModule,
		DialogModule,
		FormsModule,
		TooltipModule,
		InputTextModule,
		DropdownModule,
		ButtonModule,
		OverlayPanelModule,
		TableModule,
		ConfirmDialogModule,
		SidebarModule,
		RippleModule,
		ConfirmPopupModule,
		ReactiveFormsModule,
		AutoCompleteModule,
		InputGroupAddonModule,
		InputGroupModule
    ],
  declarations: [FacturacionComponent]
})
export class SucursalListadoModule {}
