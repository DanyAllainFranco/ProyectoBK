
import { Alimento, Alimento2, AlimentoActualizar } from '../../models/AlimentosViewModel';
import { AlimentosServiceService } from '../../service/alimento-service.service';
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
import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Postre, Postre2, PostreActualizar } from '../../models/PostreViewModel';
import { PostreServiceService } from '../../service/postre-service.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Rol } from '../../models/RolesViewModel';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ImageModule } from 'primeng/image';
import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'primeng/carousel';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-aliment-listado',
  templateUrl:'./alimento-listado.component.html',
  styleUrl: './alimento-listado.component.scss',
  providers: [MessageService,]
})

export class AlimentosListadoComponent implements OnInit {
  alimentos!: Alimento2[];

  Usua_Id:number;
  display: boolean = false;
  departamento: Postre[] = [];
  formDepartamento: FormGroup;
  selectedDepartamento: any;
  modalTitle: string = 'Nuevo Registro';
  modalButtonLabel: string = 'Guardar';
  confirmacionVisible: boolean = false;
  departamentoAEliminar: Alimento2 | null = null;
  uploadedFiles: any[] = [];
  selectedImageURL: string | null = null;
  imageSelected: boolean = false;
  showFileUpload: boolean = true;
  prueba: string = "";
  submitted: boolean = false;
  constructor(
    private service: AlimentosServiceService, 
    private router: Router,
    private fb: FormBuilder,
    private cookieService: CookieService,
    private messageService: MessageService,
    private http: HttpClient
  ) {
    this.formDepartamento = this.fb.group({
      // post_Id: ["", Validators.required],
      alim_Descripcion: ["", Validators.required],
      alim_Precio: ["", Validators.required],
      //  post_Imagen: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAlimentos();
    this.Usua_Id = Number.parseInt(this.cookieService.get('Usua_Id'));
    console.log("USUA_ID: " + this.Usua_Id)
    const showSuccessMessage = this.cookieService.get('showSuccessMessageAlimento');
    const tipo =  this.cookieService.get('Mensaje');
    console.log("SDAS: " + showSuccessMessage)
    if (showSuccessMessage) {
      setTimeout(() => {  
        if(tipo == 'Nuevo'){
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Alimento agregado correctamente' });
        }
        else{
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Alimento editado correctamente' });
        }
        this.cookieService.delete('showSuccessMessageAlimento');
      });
    
    }
 
  }

   detalleAlimento(combId: number) {
    this.router.navigate(['app/DetallePostre', combId]);
  }

getAlimentos(){
  this.service.getAlimento().subscribe(
    (data: any) => {
      console.log(data);
      this.alimentos = data;
      console.log(this.alimentos);
    },
     error => {
      console.log(error);
    }
  );
}


displayNuevoDepartamento() {
  this.formDepartamento.reset();
  this.selectedImageURL = null; 
  this.modalTitle = 'Nuevo Registro';
  this.modalButtonLabel = 'Guardar';
  this.display = true;
}

editDepartamento(departamento: any) {
  this.selectedDepartamento = departamento.alim_Id;
  console.log("DSADSA: " + this.selectedDepartamento)
  console.log("ID: " + this.selectedDepartamento),
  this.selectedImageURL = "https://localhost:44332/uploads/" + departamento.alim_Imagen;
  this.prueba = departamento.alim_Imagen;
  this.modalTitle = 'Editar Registro';
  this.modalButtonLabel = 'Actualizar';
  this.formDepartamento.patchValue({
    alim_Descripcion: departamento.alim_Descripcion,
    alim_Precio: departamento.alim_Precio,
  });
  this.display = true;
}

guardarDepartamento() 
{   if (this.formDepartamento.valid) {
  if (this.modalTitle === 'Nuevo Registro') {
    this.NuevoDepartamento();
  } else {
    this.actualizarDepartamento();
  }
   }else{
    this.submitted = true;
   }

 }

 actualizarDepartamento() {
   const idDepartamento = this.selectedDepartamento;
   const modelo: AlimentoActualizar = {
     alim_Id: idDepartamento,
     alim_Descripcion: this.formDepartamento.value.alim_Descripcion,
     alim_Precio: this.formDepartamento.value.alim_Precio,
     alim_Imagen: this.prueba,
     alim_Usua_Modifica: this.Usua_Id,
   }

   this.service.actualizar(modelo).subscribe({
     next: (data) => {
       this.getAlimentos();
       this.cookieService.set('Mensaje', 'Editado');
       this.cookieService.set('showSuccessMessageAlimento', 'true');
       // localStorage.setItem('', '');
       location.reload();
       // this.display = false;
       // this.messageService.add({ severity: 'success', summary: 'Éxito', detail: '¡Postre editado correctamente!' });
       // setTimeout(() => {
       //   location.reload();
       // }, 2000);
     },
     error: (e) => {
       console.log(e);
       this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Departamento ya existente.' });
     }
   });
 }

recargarPagina() {
  location.reload();
}

 onUpload(event) {
   const file: File = event.files[0];
  this.selectedImageURL = URL.createObjectURL(file);
   if (file) {
     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
     const uniqueFileName = uniqueSuffix + '-' + file.name;
     this.prueba = uniqueFileName;
     const formData: FormData = new FormData();

     formData.append('file', file, uniqueFileName);
     this.service.EnviarImagen(formData).subscribe(
       response => {
         console.log('Upload successful', response);
         if (response.message === "Exito") {
           // this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Imagen Subida', life: 3000 });
         } else {
           this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Formato de imagen incorrecto', life: 3000 });
         }
       },
       error => {
         console.error('Error uploading image', error);
       }
     );
   }
 }


 NuevoDepartamento() {
   const modelo: Alimento2 = {
     alim_Id: 0,
      alim_Descripcion: this.formDepartamento.value.alim_Descripcion,
     alim_Precio: this.formDepartamento.value.alim_Precio,
     alim_Imagen: this.prueba,
     alim_Usua_Creacion: this.Usua_Id,
   };

   // Enviar los datos del formulario a tu API para agregar el registro
   this.service.agregar(modelo).subscribe({
     next: () => {
       this.getAlimentos();
       this.cookieService.set('showSuccessMessage', 'true');
       this.cookieService.set('Mensaje', 'Nuevo');
       location.reload();
     },
     error: (error) => {
       console.error('Error al agregar el departamento:', error);
       this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al agregar el departamento.' });
     }
   });
  }

confirmarEliminarDepartamento(departamento: Alimento2) {
  this.departamentoAEliminar = departamento;
  this.confirmacionVisible = true;
}

detallePostre(combId: number) {
  this.router.navigate(['app/DetalleAlimento', combId]); // Redirige a la ruta de edición con el ID del rol
}

eliminarDepartamento() {
  if (this.departamentoAEliminar) {
    const idDepartamento = this.departamentoAEliminar.alim_Id;
    this.service.eliminar(idDepartamento).subscribe({
      next: (data) => {
        this.getAlimentos();
        this.confirmacionVisible = false;
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: '¡Alimento eliminado correctamente!' });
      },
      error: (e) => {
        console.log(e);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Este Departamento no se puede eliminar.' });
      }
    });
  }
}

cancelarEliminar() {
  this.confirmacionVisible = false;
}

}


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    ToggleButtonModule,
    RippleModule,
    MultiSelectModule,
    ReactiveFormsModule,
    DropdownModule,
    ProgressBarModule,
    ImageModule,
    ToastModule,
    SliderModule,
    GalleriaModule,
    RatingModule,
    CarouselModule,
    FileUploadModule
  ],
  declarations: [AlimentosListadoComponent]
})
export class AlimentosListadoModule {}
