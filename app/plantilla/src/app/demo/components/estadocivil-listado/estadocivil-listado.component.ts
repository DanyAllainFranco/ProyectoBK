//import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
//import { EstadoCivil } from '../../models/EstadoCivilViewModel';
import { EstadoCivilServiceService } from '../../service/estadocivil-service.service';

import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
import { MensajeViewModel } from 'src/app/demo/models/MensajeVIewModel';
import { Estado, EstadoCivilEnviar,Fill } from 'src/app/demo/models/EstadoCivilViewModel';
import { FormGroup, FormControl,  Validators  } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-estadocivil-listado',
  templateUrl: './estadocivil-listado.component.html',
  styleUrl: './estadocivil-listado.component.scss'
})
export class EstadocivilListadoComponent implements OnInit {
  Estado!:Estado[];

  MensajeViewModel!: MensajeViewModel[];
  submitted: boolean = false;
  loading: boolean = false;
  departamentos: any[] = [];
  fill: any[] = [];
  viewModel: EstadoCivilEnviar = new EstadoCivilEnviar();
  estadocivilForm: FormGroup;
  @ViewChild('filter') filter!: ElementRef;
  Collapse: boolean = false;
  DataTable: boolean = true;
  Detalles: boolean = false;
  Agregar: boolean = true;
  MunCodigo: boolean = true;
  Valor: string = "";
  staticData = [{}];


  deleteProductDialog: boolean = false;
  //Detalle
  Esta: String = "";
  id: string="";
  esta_Usua_Creacion: String = "";
  esta_Usua_Modifica: String = "";
  esta_Fecha_Creacion: String = "";
  esta_Fecha_Modifica: String = "";
  ID: String = "";

  constructor(
      private service: EstadoCivilServiceService, 
      private router: Router,
      private confirmationService: ConfirmationService, 
      private messageService: MessageService
  ) { 
     
  
  }
  




  ngOnInit(): void {
      this.estadocivilForm = new FormGroup({
          esta_Descripcion: new FormControl("", Validators.required),
        });



      this.service.getEstadoCivil().subscribe((data: any)=>{
          console.log(data);
          this.Estado = data;
      },error=>{
        console.log(error);
      });
   }
  
  
//Abrir collapse
collapse(){
  this.Collapse= true;
  this.DataTable = false;
  this.Valor = "Agregar";
  this.Agregar= false;
  this.Detalles = false;
}
detalles(id){
  this.Collapse= false;
  this.DataTable = false;
  this.Agregar= false;
  this.Detalles = true;
  this.service.getFill(id).subscribe({
      next: (data: Fill) => {
         this.Esta = data.esta_Descripcion,
         this.esta_Usua_Creacion = data.esta_Usua_Creacion,
         this.esta_Usua_Modifica = data.esta_Usua_Modifica
         this.esta_Fecha_Creacion = data.esta_Fecha_Creacion,
         this.esta_Fecha_Modifica = data.esta_Fecha_Modifica
      }
    });
}
//Cerrar Collapse y reiniciar el form
cancelar(){
  this.Collapse= false;
  this.DataTable = true;
  this.Detalles = false;
  this.estadocivilForm = new FormGroup({
      esta_Descripcion: new FormControl("", Validators.required),
    });
  this.submitted = false;
  this.Agregar= true;
  this.MunCodigo=true;
  this.Valor = "";
}
//Funcionan como regex
ValidarNumeros(event: KeyboardEvent) {
  if (!/[0-9]/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Tab') {
      event.preventDefault();
  }
}
validarTexto(event: KeyboardEvent) {

  if (!/^[a-zA-Z\s]+$/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Tab' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      event.preventDefault();
  }
}




   onSubmit() {
      if (this.estadocivilForm.valid ) {
         this.viewModel = this.estadocivilForm.value;
         if (this.Valor == "Agregar") {
          this.service.EnviarEstadoCivil(this.viewModel).subscribe((data: MensajeViewModel[]) => {
              if(data["message"] == "Operación completada exitosamente."){
               this.service.getEstadoCivil().subscribe((data: Estado[]) => {
                   this.Estado = data;
               });
               
         this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Insertado con Exito', life: 3000 });
         this.Collapse= false;
         this.DataTable = true;
         this.submitted = false;
         this.Detalles = false;
         this.estadocivilForm = new FormGroup({
          esta_Descripcion: new FormControl("", Validators.required),
        });
 
        }else{
         this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro insertar', life: 3000 });
        }
        
     })
   } else {
      this.viewModel.Esta_Id = this.id ;
        this.service.ActualizarEstadoCivil(this.viewModel).subscribe((data: MensajeViewModel[]) => {
        if(data["message"] == "Operación completada exitosamente."){
         this.service.getEstadoCivil().subscribe((data: Estado[]) => {
             this.Estado = data;
         });
         this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Actualizado con Exito', life: 3000 });
         this.Collapse= false;
         this.DataTable = true;
         this.Detalles = false;
         this.submitted = false;
         this.estadocivilForm = new FormGroup({
          esta_Descripcion: new FormControl("", Validators.required),
        });
 
        }else{
         this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro actualizar', life: 3000 });
        }
        
     })
   }  
   
}   
    else 
    {
        this.submitted = true;
    }
}


deleteSelectedProducts(id) {
    this.deleteProductDialog = true;
    this.ID = id;
    console.log("El codigo es" + id);
}
confirmDelete() {
    this.service.EliminarEstadoCivil(this.ID).subscribe({
        next: (response) => {
            if(response.message == "La accion ha sido existosa"){
                this.service.getEstadoCivil().subscribe((data: Estado[]) => {
                    this.Estado = data;
                });
                this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Eliminado con Exito', life: 3000 });
                this.Collapse= false;
                this.DataTable = true;
                this.Detalles = false;
                this.submitted = false;
                this.estadocivilForm = new FormGroup({
                  esta_Descripcion: new FormControl("", Validators.required),
                });
                this.deleteProductDialog = false;
               }else{
                this.deleteProductDialog = false;
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro eliminar', life: 3000 });
               }
        },
    });

}
Fill(id) {
    this.service.getFill(id).subscribe({
        next: (data: Fill) => {
          this.estadocivilForm = new FormGroup({
              esta_Descripcion: new FormControl(data.esta_Descripcion, Validators.required),
            });

            this.id = data.esta_Id;
            this.Collapse= true;
            this.DataTable = false;
            this.Agregar = false;
            this.MunCodigo = false;
            this.Detalles = false;
            this.Valor = "Editar";
        }
      });

}

    
}

