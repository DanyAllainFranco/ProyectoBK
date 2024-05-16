import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { Fill,Municipio,Municipio2,MunicipioEnviar } from 'src/app/demo/models/MunicipioViewModel';
import { dropDepartamento } from 'src/app/demo/models/DepartamentosViewModel';
import { MensajeViewModel } from 'src/app/demo/models/MensajeVIewModel';

import { ServiceService } from 'src/app/demo/service/municipio-service.service';
import { FormGroup, FormControl,  Validators, FormBuilder  } from '@angular/forms';
import { DepartamentoServiceService } from '../../service/departamento-service.service';
@Component({
  templateUrl: './municipio-listado.component.html',
  styleUrl: './municipio-listado.component.css',
    providers: [ConfirmationService, MessageService]
})
export class MunicipioListadoComponent implements OnInit {
    Municipio!: Municipio[];
    MensajeViewModel!: MensajeViewModel[];
    submitted: boolean = false;
    loading: boolean = false;
    departamentos: any[] = [];
    fill: any[] = [];
    viewModel: MunicipioEnviar = new MunicipioEnviar();
    municipioForm: FormGroup;
    @ViewChild('filter') filter!: ElementRef;
    Collapse: boolean = false;
    DataTable: boolean = true;
    Detalles: boolean = false;
    Agregar: boolean = true;
    MunCodigo: boolean = true;
    Valor: string = "";
    staticData = [{}];
    modalTitle: string = 'Nuevo Registro';
    modalButtonLabel: string = 'Guardar';
    display: boolean = false;
    formDepartamento: FormGroup;
    deleteProductDialog: boolean = false;
    confirmacionVisible: boolean = false;
    departamentoAEliminar: Municipio | null = null;
    selectedDepartamento: any;
    //Detalle
    Muni: String = "";
    Codigo: String = "";
    Depa: String = "";
    UsuarioCreacion: String = "";
    UsuarioModificacion: String = "";
    FechaCreacion: String = "";
    FechaModificacion: String = "";
    complementos: SelectItem[] = [];
    ID: String = "";
    constructor(
        private service: ServiceService, 
        private router: Router,
        private confirmationService: ConfirmationService, 
        private messageService: MessageService,
        private complementoService: DepartamentoServiceService,
        private fb: FormBuilder,
    ) { 
       
    
    }
    
    ngOnInit(): void {
        //Inicializamos form,drops,lista
        this.formDepartamento = this.fb.group({
            muni_Codigo: ["", Validators.required],
            muni_Descripcion: ["", Validators.required],
            dept_Codigo: ["0", Validators.required],
          });

        this.service.getDropDownsDepartamentos().subscribe((data: dropDepartamento[]) => {
            this.departamentos = data;
        });
        this.cargarDepartamentos();
     this.getMunicipios();
    }
    getMunicipios(){
        this.service.getMunicipios().subscribe((data: Municipio[]) => {
            console.log(data);
            this.Municipio = data;
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
    detalles(codigo){
        this.Collapse= false;
        this.DataTable = false;
        this.Agregar= false;
        this.Detalles = true;
        this.service.getDetalles(codigo).subscribe({
            next: (data: Fill) => {
               this.Muni = data.muni_Descripcion,
               this.Codigo = data.muni_Codigo,
               this.Depa = data.dept_Codigo,
               this.UsuarioCreacion = data.usua_Creacion,
               this.UsuarioModificacion = data.usua_Modifica
               this.FechaCreacion = data.muni_Fecha_Creacion,
               this.FechaModificacion = data.muni_Fecha_Modifica
            }
          });
    }
    //Cerrar Collapse y reiniciar el form
    cancelar(){
        this.Collapse= false;
        this.DataTable = true;
        this.Detalles = false;
        this.municipioForm = new FormGroup({
            Muni_Codigo: new FormControl("",Validators.required),
            Muni_Descripcion: new FormControl("", Validators.required),
            Dept_Codigo: new FormControl('0', [Validators.required])
        });
        this.submitted = false;
        this.Agregar= true;
        this.MunCodigo=true;
        this.Valor = "";
    }
    

    
  confirmarEliminarDepartamento(departamento: Municipio) {
    this.departamentoAEliminar = departamento;
    this.confirmacionVisible = true;
  }
  
  eliminarDepartamento() {
    if (this.departamentoAEliminar) {
      const idDepartamento = this.departamentoAEliminar.muni_Codigo;
      this.service.eliminar(idDepartamento).subscribe({
        next: (data) => {
          this.getMunicipios();
          this.confirmacionVisible = false;
          console.log(idDepartamento);
          this.messageService.add({severity:'success', summary:'Éxito', detail:'¡Municipio eliminado correctamente!'});
        },
        error: (e) => {
          console.log(e);
          this.messageService.add({severity:'error', summary:'Error', detail:'Este Municipio no se puede eliminar.'});
        }
      });
    }
  }
  
  cancelarEliminar() {
    this.confirmacionVisible = false;
  }

  displayNuevoDepartamento() {
    this.formDepartamento = this.fb.group({
        muni_Codigo: ["", Validators.required],
        muni_Descripcion: ["", Validators.required],
        dept_Codigo: ["0", Validators.required],
      });
    this.modalTitle = 'Nuevo Registro';
    this.modalButtonLabel = 'Guardar';
    this.display = true;
  }

  editDepartamento(departamento: any) {
    this.selectedDepartamento = departamento;
  
    this.modalTitle = 'Editar Registro';
    this.modalButtonLabel = 'Actualizar';
    this.formDepartamento.patchValue({
      muni_Codigo: departamento.muni_Codigo,
      muni_Descripcion: departamento.muni_Descripcion,
      dept_Codigo: departamento.dept_Codigo
    });
    this.display = true;
  }

  guardarDepartamento() {
    if (this.formDepartamento.valid) {
      if (this.modalTitle === 'Nuevo Registro') {
        this.NuevoDepartamento();
      } else {
        this.actualizarDepartamento();
      }
    }
    else{
      this.submitted = true;
    }
 
  }

  NuevoDepartamento() {
    const modelo: Municipio2 = {
      muni_Codigo: this.formDepartamento.value.muni_Codigo,
      muni_Descripcion: this.formDepartamento.value.muni_Descripcion,
      dept_Codigo: this.formDepartamento.value.dept_Codigo,
      Usua_Id: 1
    }
    this.service.agregar(modelo).subscribe({
      next: (data) => {  
        this.getMunicipios();
        this.display = false;
        this.messageService.add({severity:'success', summary:'Éxito', detail:'¡Municipio creado correctamente!'});
      },
      error: (e) => {
        console.log(e);
        this.messageService.add({severity:'error', summary:'Error', detail:'Codigo ya existente.'});
      }
    })
  }

  cargarDepartamentos(){
    this.complementoService.getDepartamento().subscribe(
      (data: any[]) => {
        console.log(data)
        this.complementos = data.map(item => ({ label: item.dept_Descripcion, value: item.dep_Codigo }));
      },
      error => {
        console.log(error);
      }
    );
  }


  actualizarDepartamento() {
    const idDepartamento = this.selectedDepartamento.dept_Codigo;
    const modelo: Municipio2 = {
        muni_Codigo: this.formDepartamento.value.muni_Codigo,
        muni_Descripcion: this.formDepartamento.value.muni_Descripcion,
        dept_Codigo: this.formDepartamento.value.dept_Codigo,
        Usua_Id: 1
      }
    this.service.actualizar(modelo).subscribe({
      next: (data) => {
        this.getMunicipios();
        this.display = false;
        console.log(idDepartamento);
        this.messageService.add({severity:'success', summary:'Éxito', detail:'¡Municipio editado correctamente!'});
      },
      error: (e) => {
        console.log(e);
        this.messageService.add({severity:'error', summary:'Error', detail:'Departamento ya existente.'});
      }
    })
  }

      cerrar(){
        this.display = false;
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

    //Insert
    onSubmit() {
    if (this.municipioForm.valid && this.municipioForm.get('Dept_Codigo').value !== '0') {
       this.viewModel = this.municipioForm.value;
       if (this.Valor == "Agregar") {
        this.service.EnviarMunicipios(this.viewModel).subscribe((data: MensajeViewModel[]) => {
            if(data["message"] == "Operación completada exitosamente."){
             this.service.getMunicipios().subscribe((data: Municipio[]) => {
                 this.Municipio = data;
             });
             this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Insertado con Exito', life: 3000 });
             this.Collapse= false;
             this.DataTable = true;
             this.submitted = false;
             this.Detalles = false;
             this.Agregar = true;
             this.municipioForm = new FormGroup({
                 Muni_Codigo: new FormControl("",Validators.required),
                 Muni_Descripcion: new FormControl("", Validators.required),
                 Dept_Codigo: new FormControl('0', [Validators.required])
             });
     
            }else{
             this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro insertar', life: 3000 });
            }
            
         })
       } else {
            this.service.ActualizarMunicipios(this.viewModel).subscribe((data: MensajeViewModel[]) => {
            if(data["message"] == "Operación completada exitosamente."){
             this.service.getMunicipios().subscribe((data: Municipio[]) => {
                 this.Municipio = data;
             });
             this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Actualizado con Exito', life: 3000 });
             this.Collapse= false;
             this.DataTable = true;
             this.Detalles = false;
             this.submitted = false;
             this.Agregar = true;
             this.municipioForm = new FormGroup({
                 Muni_Codigo: new FormControl("",Validators.required),
                 Muni_Descripcion: new FormControl("", Validators.required),
                 Dept_Codigo: new FormControl('0', [Validators.required])
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


    deleteSelectedProducts(codigo) {
        this.deleteProductDialog = true;
        this.ID = codigo;
        console.log("El codigo es" + codigo);
    }
    confirmDelete() {
        this.service.EliminarMunicipios(this.ID).subscribe({
            next: (response) => {
                if(response.message == "La accion ha sido existosa"){
                    this.service.getMunicipios().subscribe((data: Municipio[]) => {
                        this.Municipio = data;
                    });
                    this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Eliminado con Exito', life: 3000 });
                    this.Collapse= false;
                    this.DataTable = true;
                    this.Detalles = false;
                    this.submitted = false;
                    this.Agregar = true;
                    this.municipioForm = new FormGroup({
                        Muni_Codigo: new FormControl("",Validators.required),
                        Muni_Descripcion: new FormControl("", Validators.required),
                        Dept_Codigo: new FormControl('0', [Validators.required])
                    });
                    this.deleteProductDialog = false;
                   }else{
                    this.deleteProductDialog = false;
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro eliminar', life: 3000 });
                   }
            },
        });
    
    }
    Fill(codigo) {
        this.service.getFill(codigo).subscribe({
            next: (data: Fill) => {
                this.municipioForm = new FormGroup({
                    Muni_Codigo: new FormControl(data.muni_Codigo,Validators.required),
                    Muni_Descripcion: new FormControl(data.muni_Descripcion, Validators.required),
                    Dept_Codigo: new FormControl(data.dept_Codigo, [Validators.required])
                });
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


