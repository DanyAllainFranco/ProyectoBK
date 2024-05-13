import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Postre, Postre2, PostreActualizar } from '../../models/PostreViewModel';
import { PostreServiceService } from '../../service/postre-service.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
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
import { Rol } from '../../models/RolesViewModel';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ImageModule } from 'primeng/image';
import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'primeng/carousel';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-postre-listado',
  templateUrl: './postre-listado.component.html',
  styleUrl: './postre-listado.component.scss',
  providers: [MessageService]
})
export class PostreListadoComponent implements OnInit {
  Postre!: Postre[];
  display: boolean = false;
  departamento: Postre[] = [];
  formDepartamento: FormGroup;
  selectedDepartamento: any;
  modalTitle: string = 'Nuevo Registro';
  modalButtonLabel: string = 'Guardar';
  confirmacionVisible: boolean = false;
  departamentoAEliminar: Postre2 | null = null;
  uploadedFiles: any[] = [];
  selectedImageURL: string | null = null;
   imageSelected: boolean = false;
   showFileUpload: boolean = true;
prueba: string = "";
  
  constructor(
    private service: PostreServiceService, 
    private router: Router,
    private fb: FormBuilder,
    private _postreServices: PostreServiceService,
    private messageService: MessageService,
    private http: HttpClient
  )
     {
      this.formDepartamento = this.fb.group({
        // post_Id: ["", Validators.required],
        post_Descripcion: ["", Validators.required],
        post_Precio: ["", Validators.required],
        //  post_Imagen: ["", Validators.required],
      });
     }

  ngOnInit(): void {
 this.getPostres();

 console.log("Mnesaje: " + this.service.successMessage)
 if (this.service.successMessage) {
  setTimeout(() => {
    if(this.service.successMessage == '¡Postre registrada correctamente!')
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: '¡Promocion registrada correctamente!' });
    // Reiniciar el mensaje de éxito después de mostrarlo
    else{
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: '¡Rol actualizado correctamente!' });
    }
    this.service.successMessage = '';
  });
}

  }

  getPostres() {
    this.service.getPostre().subscribe(
      (data: any) => {
        console.log(data);
        this.Postre = data;
        console.log(this.Postre);
      },
       error => {
        console.log(error);
      }
    );
  }
 // Función para mostrar el modal y limpiar el formulario y la imagen seleccionada
 displayNuevoDepartamento() {
  this.formDepartamento.reset(); // Resetear el formulario
  this.selectedImageURL = null; // Limpiar la URL de la imagen seleccionada
  this.showFileUpload = true; // Restaurar el botón de carga de archivos
  this.modalTitle = 'Nuevo Registro';
  this.modalButtonLabel = 'Guardar';
  this.display = true;
}

editDepartamento(departamento: any) {
  this.selectedDepartamento = departamento.post_id;

  console.log("ID: " + this.selectedDepartamento),
  this.selectedImageURL = "https://localhost:44332/uploads/" + departamento.post_Imagen;
  this.modalTitle = 'Editar Registro';
  this.modalButtonLabel = 'Actualizar';
  this.formDepartamento.patchValue({
    
    post_Descripcion: departamento.post_Descripcion,
    post_Precio: departamento.post_Precio,
    
    // post_Imagen: this.prueba,
    // post_Usua_Modifica: 1,
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


actualizarDepartamento() {
  const idDepartamento = this.selectedDepartamento;
  const modelo: PostreActualizar = {
    // dept_Codigo: this.formDepartamento.value.codigo,
    // dept_Descripcion: this.formDepartamento.value.departamento,
    post_id: idDepartamento,
    post_Descripcion: this.formDepartamento.value.post_Descripcion,
    post_Precio: this.formDepartamento.value.post_Precio,
    post_Imagen: this.selectedImageURL,
    post_Usua_Modifica: 1,
  }

  this._postreServices.actualizar(modelo).subscribe({
    next: (data) => {
      this.getPostres();
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
          this.messageService.add({ severity: 'success', summary: 'Error', detail: 'Suba una imagen', life: 3000 });
        }
      },
      error => {
        console.error('Error uploading image', error);
      }
    );
  }
}



NuevoDepartamento() {
  const modelo: Postre2 = {
    post_id: 0,
    post_Descripcion: this.formDepartamento.value.post_Descripcion,
    post_Precio: this.formDepartamento.value.post_Precio,
    post_Imagen: this.prueba,
    post_Usua_Creacion: 1,
  };

  // Enviar los datos del formulario a tu API para agregar el registro
  this._postreServices.agregar(modelo).subscribe({
    next: () => {
      this.service.successMessage = '¡Postre registrada correctamente!';
      this.display = false;
    
    },
    error: (error) => {
      console.error('Error al agregar el departamento:', error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al agregar el departamento.' });
    }
  });
}

confirmarEliminarDepartamento(departamento: Postre2) {
  this.departamentoAEliminar = departamento;
  this.confirmacionVisible = true;
}

eliminarDepartamento() {
  if (this.departamentoAEliminar) {
    const idDepartamento = this.departamentoAEliminar.post_id;
    this.service.eliminar(idDepartamento).subscribe({
      next: (data) => {
        this.getPostres();
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
  declarations: [PostreListadoComponent]
})
export class PostresListadoModule {}
