import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import {Router} from '@angular/router';
import { Table } from 'primeng/table';
import { Empleado, EmpleadoEnviar, Fill} from 'src/app/demo/models/EmpleadoViewModel';
import { ServiceService } from 'src/app/demo/service/empleado-service.service';
import { FormGroup, FormControl,  Validators  } from '@angular/forms';
import { dropDepartamento } from 'src/app/demo/models/DepartamentosViewModel';
import { dropMunicipio } from 'src/app/demo/models/MunicipioViewModel';
import { dropCargo } from 'src/app/demo/models/CargosViewModel';
import { dropEstadoCivil } from 'src/app/demo/models/EstadoCivilViewModel';
import { MensajeViewModel } from 'src/app/demo/models/MensajeVIewModel';
import { LlenarEmpleados } from '../../models/ClientesViewModel';
import { SucursalServiceService } from '../../service/sucursal-service.service';
import { dA } from '@fullcalendar/core/internal-common';
import { CookieService } from 'ngx-cookie-service';
import { CreationGuard } from '../../service/autguard-url.service';

@Component({
  templateUrl: './empleado-listado.component.html',
  styleUrl: './empleado-listado.component.css',
  providers: [ConfirmationService, MessageService]
})
export class EmpleadoListadoComponent {
  Empleado!:Empleado[];
   
 
  MensajeViewModel!: MensajeViewModel[];
  submitted: boolean = false;
  loading: boolean = false;
  departamentos: any[] = [];
  municipios: any[] = [];
  estadocivil: any[] = [];
  cargo: any[] = [];
  sucursales: any[] = [];
  rol: any[] = [];
  fill: any[] = [];
  viewModel: EmpleadoEnviar = new EmpleadoEnviar();
  clienteForm: FormGroup;
 
  @ViewChild('filter') filter!: ElementRef;

  selectedState: any = null;
  Collapse: boolean = false;
  DataTable: boolean = true;
  Detalles: boolean = false;
  Agregar: boolean = true;
  Contrasenas: boolean = true;
  Valor: string = "";
  staticData = [{}];
  Id_Municipio: string = "";
  deleteProductDialog: boolean = false;
  //Detalle
  Detalle_Codigo: String = "";
  Detalle_Nombre: String = "";
  Detalle_Apellido: String = "";
  Detalle_Sexo: String = "";
  Detalle_Estado: String = "";
   Detalle_Cargo: String = "";
   Detalle_Correo: String = "";

  Detalle_FechaNac: String = "";
  Detalle_Departamento: String = "";
  Detalle_Municipio: String = "";
  UsuarioCreacion: String = "";
  UsuarioModificacion: String = "";
  FechaCreacion: String = "";
  FechaModificacion: String = "";
  ID: string = "";
  MunicipioCodigo: String = "";


  confirmacionVisible: boolean = false;
  departamentoAEliminar: LlenarEmpleados | null = null;
  Usua_Id:number;
  constructor(private service: ServiceService, private sucursal: SucursalServiceService,
     private router: Router,   private messageService: MessageService,   private cookieService: CookieService,
     private creationGuard: CreationGuard
  ) { }


  ngOnInit(): void {
    this.Usua_Id = Number.parseInt(this.cookieService.get('Usua_Id'));
    this.clienteForm = new FormGroup({
        Empl_Nombre: new FormControl("",Validators.required),
        Empl_Apellido: new FormControl("", Validators.required),
        Empl_Sexo: new FormControl("", Validators.required),
        Empl_Identidad: new FormControl("", Validators.required),
        Carg_Id: new FormControl("", Validators.required),
        Empl_Correo:new FormControl("",Validators.required),
      Esta_Id: new FormControl("", Validators.required),
      Sucu_Id: new FormControl("",Validators.required),
      Dept_Codigo: new FormControl("0", [Validators.required]),
      Muni_Codigo: new FormControl("0", [Validators.required]),
      Usua_Id: new FormControl(this.Usua_Id)
    });
    this.service.getDropDownsDepartamentos().subscribe((data: dropDepartamento[]) => {
    console.log(data);
    this.departamentos = data;
    });

    this.service.getDropDownsEstado().subscribe((data: dropEstadoCivil[]) => {
      console.log(data);
      this.estadocivil = data;
      });


      this.service.getDropDownCargo().subscribe((data: dropCargo[]) => {
        console.log(data);
        this.cargo = data;
        });
        this.sucursal.getSucursal().subscribe((data:any) =>{
          console.log("DATA:" + data)
          this.sucursales = data;

        },error=>{
          console.log(error)
        }
      )

this.getEmpleados();

   }
   
   getEmpleados(){
    this.service.getEmpleados().subscribe((data: any)=>{
      console.log(data);
      this.Empleado = data;
    },error=>{
      console.log(error);
    });
   }
   onDepartmentChange(departmentId) {
    if (departmentId !== '0') {
      this.service.getMunicipios(departmentId).subscribe(
        (data: any) => {
          this.municipios = data; 
          this.clienteForm.get('Muni_Codigo').setValue('0'); 
        },
        error => {
          console.error('Error fetching municipios:', error);
        }
      );
    } else {
      this.municipios = []; // Clear municipios if the department is invalid or reset
    }
  }

  detalleCombo(combId: number) {
    this.creationGuard.allow();
    this.router.navigate(['app/DetalleEmpleado', combId]); // Redirige a la ruta de edición con el ID del rol
  }

  editarCombo(combId: number) {
    this.creationGuard.allow();
    this.router.navigate(['app/EditarEmpleado', combId]); // Redirige a la ruta de edición con el ID del rol
  }

  Nuevo(){
    this.creationGuard.allow();
    this.router.navigate(['app/CreateEmpleado'])
  }

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
    this.service.getFill(codigo).subscribe({
      next: (data: Fill) => {
         this.Detalle_Codigo = data.empl_Id,
         this.Detalle_Nombre = data.empl_Nombre,
         this.Detalle_Apellido = data.empl_Apellido,
         this.Detalle_Sexo = data.empl_Sexo,
         this.Detalle_Estado = data.esta_Id,
        this.Detalle_Cargo = data.carg_Id,
        this.Detalle_Correo = data.empl_Correo,

         this.Detalle_FechaNac = data.empl_Identidad,
      
         this.Detalle_Municipio = data.muni_Codigo,
         this.UsuarioCreacion = data.empl_Usua_Creacion,
         this.UsuarioModificacion = data.empl_Usua_Modifica
         this.FechaCreacion = data.empl_Fecha_Creacion,
         this.FechaModificacion = data.empl_Fecha_Modifica
      }
    });
    this.ngOnInit();
}
//Cerrar Collapse y reiniciar el form
cancelar(){
    this.Collapse= false;
    this.DataTable = true;
    this.Detalles = false;
    this.ngOnInit();
    this.submitted = false;
    this.Agregar= true;
    this.Valor = "";
}

validarTexto(event: KeyboardEvent) {
  if (!/^[-a-zA-Z\s-áéíóúÁÉÍÓÚüÜñÑ,.?!¡¿@#$%&*()]+$/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Tab' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      event.preventDefault();
  }
}


validarCorreo(event: KeyboardEvent) {
  if (!/^[-a-zA-Z\s-áéíóúÁÉÍÓÚüÜñÑ,.?!¡¿@#$%&*()]+$/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Tab' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      event.preventDefault();
  }
}


ValidarNumero(event: KeyboardEvent) {
  if (!/^[0-9\s-]+$/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Tab' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      event.preventDefault();
  }
}
onSubmit() {
  if (this.clienteForm.valid && this.clienteForm.get('Dept_Codigo').value !== '0' && this.clienteForm.get('Muni_Codigo').value !== '0'&& this.clienteForm.get('Esta_Id').value !== '0' ) {
     this.viewModel = this.clienteForm.value;
     if (this.Valor == "Agregar") {
      this.service.EnviarEmpleado(this.viewModel).subscribe((data: MensajeViewModel[]) => {
          if(data["message"] == "Operación completada exitosamente."){
          this.ngOnInit();
           this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Insertado con Exito', life: 3000 });
           this.Collapse= false;
           this.DataTable = true;
           this.submitted = false;
           this.Detalles = false;
           this.Agregar= true;
          }else{
           this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro insertar', life: 3000 });
          }
       })
     } else {
      this.viewModel.Empl_Id = this.ID
          this.service.ActualizarEmpleado(this.viewModel).subscribe((data: MensajeViewModel[]) => {
          if(data["message"] == "Operación completada exitosamente."){
            this.ngOnInit();
           this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Actualizado con Exito', life: 3000 });
           this.Collapse= false;
           this.DataTable = true;
           this.Detalles = false;
           this.submitted = false;
           this.Agregar= true;
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
    this.service.EliminarEmpleado(this.ID).subscribe({
        next: (response) => {
            if(response.message == "La accion ha sido existosa"){
               
                this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Eliminado con Exito', life: 3000 });
                this.Collapse= false;
                this.DataTable = true;
                this.Detalles = false;
                this.submitted = false;
                this.deleteProductDialog = false;
                this.ngOnInit();
               }else{
                this.deleteProductDialog = false;
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro eliminar', life: 3000 });
               }
        },
    });

}



confirmarEliminarDepartamento(departamento: LlenarEmpleados) {

  this.departamentoAEliminar = departamento;
  console.log(this.departamentoAEliminar)
  this.confirmacionVisible = true;
}

eliminarDepartamento() {
  if (this.departamentoAEliminar) {
    console.log(this.departamentoAEliminar.empl_Id)
    const idDepartamento = this.departamentoAEliminar.empl_Id;
    this.service.EliminarEmpleado(idDepartamento).subscribe({
      next: (data) => {
        this.getEmpleados();
        this.confirmacionVisible = false;
        console.log(idDepartamento);
        this.messageService.add({severity:'success', summary:'Éxito', detail:'!Empleado eliminado correctamente!'});
      },
      error: (e) => {
        console.log(e);
        this.messageService.add({severity:'error', summary:'Error', detail:'Este combo no se puede eliminar.'});
      }
    });
  }
}

cancelarEliminar() {
  this.confirmacionVisible = false;
}

Fill(codigo) {
    this.service.getFill(codigo).subscribe({
        next: (data: Fill) => {

          this.clienteForm = new FormGroup({
            Empl_Nombre: new FormControl(data.empl_Nombre,Validators.required),
            Empl_Apellido: new FormControl(data.empl_Apellido, Validators.required),
            Empl_Sexo: new FormControl(data.empl_Sexo, Validators.required),
            Empl_Identidad: new FormControl(data.empl_Identidad, Validators.required),
            Carg_Id: new FormControl(data.carg_Id, Validators.required),
            Empl_Correo: new FormControl(data.empl_Correo, Validators.required),

          Esta_Id: new FormControl(data.esta_Id, Validators.required),
          //Dept_Codigo: new FormControl(data.dept_codigo, [Validators.required]),
          Muni_Codigo: new FormControl(data.muni_Codigo, [Validators.required]),
        });

          this.MunicipioCodigo = data.muni_Codigo;
          console.log(this.MunicipioCodigo);
          this.service.getMunicipios(data.dept_Codigo).subscribe(
            (data: any) => {
              this.municipios = data; 
              this.clienteForm.get('Muni_Codigo').setValue(this.MunicipioCodigo); 
            }
          );
            this.ID = data.empl_Id;
            this.Collapse= true;
            this.DataTable = false;
            this.Agregar = false;
            this.Detalles = false;
            this.Contrasenas = false;
            this.Valor = "Editar";
        }
      });

}
}