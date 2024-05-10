import { Component, OnInit, NgModule,Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Departamento } from '../../models/DepartamentosViewModel';
import { DepartamentoServiceService } from '../../service/departamento-service.service';
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
  selector: 'app-departamentos-listado',
  templateUrl:'./departamentos-listado.component.html',
  styleUrls: ['./departamentos-listado.component.scss'],
  providers: [MessageService]
})
export class DepartamentosListadoComponent implements OnInit {
  
  display: boolean = false;
  departamento: Departamento[] = [];
  formDepartamento: FormGroup;
  selectedDepartamento: any;
  modalTitle: string = 'Nuevo Registro';
  modalButtonLabel: string = 'Guardar';
  confirmacionVisible: boolean = false;
  departamentoAEliminar: Departamento | null = null;

  constructor(
    private service: DepartamentoServiceService,
    private router: Router,
    private fb: FormBuilder,
    private _departamentoServicio: DepartamentoServiceService,
    private messageService: MessageService,
   
  ) {
    this.formDepartamento = this.fb.group({
      codigo: ["", Validators.required],
      departamento: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.getDepartamentos();
  }

  getDepartamentos() {
    this.service.getDepartamento().subscribe(
      (data: any) => {
        this.departamento = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  onImprimir(){
    const encabezado = "fdsfdsfdsfdsfdsfds";
    const cuerpo = "fdsfdsfsdfdsfsdfdsfdsf";
    const img = "assets/demo/images/credirapi-removebg-preview.png";
  }


  // detalle(obeto:Departamento){
  //   this.router.navigate(['/departamento',obeto.dept_Id])
  // }

  // // Detalle(){
  // //   this.router.navigate(['app/DetalleDepartamento'])
  // // }


  confirmarEliminarDepartamento(departamento: Departamento) {
    this.departamentoAEliminar = departamento;
    this.confirmacionVisible = true;
  }
  
  eliminarDepartamento() {
    if (this.departamentoAEliminar) {
      const idDepartamento = this.departamentoAEliminar.dept_Codigo;
      this._departamentoServicio.eliminar(idDepartamento).subscribe({
        next: (data) => {
          this.getDepartamentos();
          this.confirmacionVisible = false;
          console.log(idDepartamento);
          this.messageService.add({severity:'success', summary:'Éxito', detail:'¡Departamento eliminado correctamente!'});
        },
        error: (e) => {
          console.log(e);
          this.messageService.add({severity:'error', summary:'Error', detail:'Este Departamento no se puede eliminar.'});
        }
      });
    }
  }
  
  cancelarEliminar() {
    this.confirmacionVisible = false;
  }

  campoVacio(campo: string): boolean {
    return this.formDepartamento.get(campo)?.hasError('required') && this.formDepartamento.get(campo)?.touched;
  }

  displayNuevoDepartamento() {
    this.formDepartamento.reset();
    this.modalTitle = 'Nuevo Registro';
    this.modalButtonLabel = 'Guardar';
    this.display = true;
  }

  editDepartamento(departamento: any) {
    this.selectedDepartamento = departamento;
    this.modalTitle = 'Editar Registro';
    this.modalButtonLabel = 'Actualizar';
    this.formDepartamento.patchValue({
      codigo: departamento.dept_Codigo,
      departamento: departamento.dept_Descripcion
    });
    this.display = true;
  }

  guardarDepartamento() {
    if (this.formDepartamento.invalid) {
      return;
    }
    if (this.modalTitle === 'Nuevo Registro') {
      this.NuevoDepartamento();
    } else {
      this.actualizarDepartamento();
    }
  }

  NuevoDepartamento() {
    const modelo: Departamento = {
      dept_Codigo: this.formDepartamento.value.codigo,
      dept_Descripcion: this.formDepartamento.value.departamento
    }
    this._departamentoServicio.agregar(modelo).subscribe({
      next: (data) => {  
        this.getDepartamentos();
        this.display = false;
        this.messageService.add({severity:'success', summary:'Éxito', detail:'¡Departamento creado correctamente!'});
      },
      error: (e) => {
        console.log(e);
        this.messageService.add({severity:'error', summary:'Error', detail:'Departamento ya existente.'});
      }
    })
  }

  actualizarDepartamento() {
    const idDepartamento = this.selectedDepartamento.dept_Codigo;
    const modelo: Departamento = {
      dept_Codigo: this.formDepartamento.value.codigo,
      dept_Descripcion: this.formDepartamento.value.departamento
    }
    this._departamentoServicio.actualizar(idDepartamento, modelo).subscribe({
      next: (data) => {
        this.getDepartamentos();
        this.display = false;
        console.log(idDepartamento);
        this.messageService.add({severity:'success', summary:'Éxito', detail:'¡Departamento editado correctamente!'});
      },
      error: (e) => {
        console.log(e);
        this.messageService.add({severity:'error', summary:'Error', detail:'Departamento ya existente.'});
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
    RatingModule,
  ],
  declarations: [
    DepartamentosListadoComponent
  ]
})
export class DepartamentosListadoModule { }
