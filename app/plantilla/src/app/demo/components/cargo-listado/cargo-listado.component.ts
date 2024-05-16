import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Cargos } from '../../models/CargosViewModel'; // Asegúrate de importar el modelo correcto
import { CargosServiceService } from '../../service/cargo-service.service'; // Asegúrate de importar el servicio correcto
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
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cargo-listado',
  templateUrl: './cargo-listado.component.html',
  styleUrls: ['./cargo-listado.component.scss'],
  providers: [MessageService]
})
export class CargoListadoComponent implements OnInit {
  
  display: boolean = false;
  cargos: Cargos[] = [];
  formCargo: FormGroup;
  selectedCargo: any;
  modalTitle: string = 'Nuevo Registro';
  modalButtonLabel: string = 'Guardar';
  confirmacionVisible: boolean = false;
  cargoAEliminar: Cargos | null = null;
  submitted = false;
  constructor(
    private service: CargosServiceService,
    private router: Router,
    private fb: FormBuilder,
    private _cargoServicio: CargosServiceService,
    private messageService: MessageService,
  ) {
    this.formCargo = this.fb.group({
      cargo: ["", Validators.required],
      id: [""]
    });
  }

  ngOnInit(): void {
    this.getCargos();
  }

  detalleRol(combId: number) {
    this.router.navigate(['app/DetalleCargo', combId]); 
  }

  getCargos() {
    this.service.getCargo().subscribe(
      (data: any) => {
        this.cargos = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  confirmarEliminarCargo(cargo: Cargos) {
    this.cargoAEliminar = cargo;
    this.confirmacionVisible = true;
  }
  
  eliminarCargo() {
    if (this.cargoAEliminar) {
      const idCargo = this.cargoAEliminar.carg_Id;
      this._cargoServicio.eliminar(idCargo).subscribe({
        next: (data) => {
          this.getCargos();
          this.confirmacionVisible = false;
          console.log(idCargo);
          this.messageService.add({severity:'success', summary:'Éxito', detail:'¡Cargo eliminado correctamente!'});
        },
        error: (e) => {
          console.log(e);
          this.messageService.add({severity:'error', summary:'Error', detail:'Este Cargo no se puede eliminar.'});
        }
      });
    }
  }
  cancelarEliminar() {
    this.confirmacionVisible = false;
  }

  campoVacio(campo: string): boolean {
    return this.formCargo.get(campo)?.hasError('required') && this.formCargo.get(campo)?.touched;
  }

  displayNuevoCargo() {
    this.formCargo.reset();
    this.modalTitle = 'Nuevo Registro';
    this.modalButtonLabel = 'Guardar';
    this.display = true;
  }

  editCargo(cargo: any) {
    this.selectedCargo = cargo;
    this.modalTitle = 'Editar Registro';
    this.modalButtonLabel = 'Actualizar';
    this.formCargo.patchValue({
      cargo: cargo.carg_Descripcion,
      id: cargo.carg_Id
    });
    this.display = true;
  }

  guardarCargo() {
    if (this.formCargo.valid) {
      if (this.modalTitle === 'Nuevo Registro') {
        this.nuevoCargo();
      } else {
        this.actualizarCargo();
      }
    }
   else{
    this.submitted = true;
   }
  }

  nuevoCargo() {
    const modelo: Cargos = {
      carg_Descripcion: this.formCargo.value.cargo,
    }
    this._cargoServicio.agregar(modelo).subscribe({
      next: (data) => {  
        this.getCargos();
        this.display = false;
        this.messageService.add({severity:'success', summary:'Éxito', detail:'¡Cargo creado correctamente!'});
      },
      error: (e) => {
        console.log(e);
        this.messageService.add({severity:'error', summary:'Error', detail:'Cargo ya existente.'});
      }
    })
  }

  actualizarCargo() {
    const idCargo = this.selectedCargo.carg_Id;
    const modelo: Cargos = {
      carg_Descripcion: this.formCargo.value.cargo,
      carg_Id: this.formCargo.value.id
    }
    this._cargoServicio.actualizar(idCargo, modelo).subscribe({
      next: (data) => {
        this.getCargos();
        this.display = false;
        console.log(idCargo);
        this.messageService.add({severity:'success', summary:'Éxito', detail:'¡Cargo editado correctamente!'});
      },
      error: (e) => {
        console.log(e);
        this.messageService.add({severity:'error', summary:'Error', detail:'Cargo ya existente.'});
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
  declarations: [
    CargoListadoComponent
  ]
})
export class CargoListadoModule { }
