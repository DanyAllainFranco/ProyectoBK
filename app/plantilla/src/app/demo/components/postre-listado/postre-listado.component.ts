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
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-postre-listado',
  templateUrl: './postre-listado.component.html',
  styleUrls: ['./postre-listado.component.scss'],
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
  submitted: boolean = false;

  constructor(
    private service: PostreServiceService, 
    private router: Router,
    private fb: FormBuilder,
    private cookieService: CookieService,
    private _postreServices: PostreServiceService,
    private messageService: MessageService,
    private http: HttpClient
  ) {
    this.formDepartamento = this.fb.group({
      // post_Id: ["", Validators.required],
      post_Descripcion: ["", Validators.required],
      post_Precio: ["", Validators.required],
      //  post_Imagen: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.getPostres();
    // const  = localStorage.getItem('showSuccessMessage');
    const showSuccessMessage = this.cookieService.get('showSuccessMessagePostre');
    const tipo =  this.cookieService.get('Mensaje');
    console.log("SDAS: " + showSuccessMessage)
    if (showSuccessMessage) {
      setTimeout(() => {  
        if(tipo == 'Nuevo'){
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Postre agregado correctamente' });
        }
        else{
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Postre editado correctamente' });
        }
        this.cookieService.delete('showSuccessMessagePostre');
      });
    
    }
  }
  
  detallePostre(combId: number) {
    this.router.navigate(['app/DetallePostre', combId]); // Redirige a la ruta de edición con el ID del rol
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

  displayNuevoDepartamento() {
    this.formDepartamento.reset();
    this.selectedImageURL = null; 
    this.modalTitle = 'Nuevo Registro';
    this.modalButtonLabel = 'Guardar';
    this.display = true;
  }

  editDepartamento(departamento: any) {
    this.selectedDepartamento = departamento.post_id;
    console.log("ID: " + this.selectedDepartamento),
    this.selectedImageURL = "https://localhost:44332/uploads/" + departamento.post_Imagen;
    this.prueba = departamento.post_Imagen;
    this.modalTitle = 'Editar Registro';
    this.modalButtonLabel = 'Actualizar';
    this.formDepartamento.patchValue({
      post_Descripcion: departamento.post_Descripcion,
      post_Precio: departamento.post_Precio,
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

  actualizarDepartamento() {
    const idDepartamento = this.selectedDepartamento;
    const modelo: PostreActualizar = {
      post_id: idDepartamento,
      post_Descripcion: this.formDepartamento.value.post_Descripcion,
      post_Precio: this.formDepartamento.value.post_Precio,
      post_Imagen: this.prueba,
      post_Usua_Modifica: 1,
    }

    this._postreServices.actualizar(modelo).subscribe({
      next: (data) => {
        this.getPostres();
        this.cookieService.set('Mensaje', 'Editado');
        this.cookieService.set('showSuccessMessagePostre', 'true');
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
        this.getPostres();
        this.cookieService.set('showSuccessMessagePostre', 'true');
        this.cookieService.set('Mensaje', 'Nuevo');
        // localStorage.setItem('showSuccessMessage', 'true');
        location.reload();
        // this.messageService.add({ severity: 'success', summary: 'Éxito', detail: '¡Postre registrada correctamente!' });
        // setTimeout(() => {
        //   location.reload();
        // }, 2000);
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
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: '¡Postre eliminado correctamente!' });
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
  declarations: [PostreListadoComponent]
})
export class PostresListadoModule {}
