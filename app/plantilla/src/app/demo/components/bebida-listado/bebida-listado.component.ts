import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Bebida2, BebidaActualizar, Bebidas } from '../../models/BebidasViewModel';
import { BebidasServiceService } from '../../service/bebida-service.service';
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
import { Postre, Postre2, PostreActualizar } from '../../models/PostreViewModel';
import { PostreServiceService } from '../../service/postre-service.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-bebida-listado',
  templateUrl: './bebida-listado.component.html',
  styleUrl: './bebida-listado.component.scss',
  providers: [MessageService]
})

export class BebidaListadoComponent implements OnInit {
  bebida!: Bebidas[];
  display: boolean = false;
  departamento: Postre[] = [];
  formDepartamento: FormGroup;
  selectedDepartamento: any;
  modalTitle: string = 'Nuevo Registro';
  modalButtonLabel: string = 'Guardar';
  confirmacionVisible: boolean = false;
  departamentoAEliminar: Bebida2 | null = null;
  uploadedFiles: any[] = [];
  selectedImageURL: string | null = null;
  imageSelected: boolean = false;
  showFileUpload: boolean = true;
  prueba: string = "";
  mensaje: string;
  submitted: boolean = false;
  mostrarmensaje: string;
  constructor(private service: BebidasServiceService, 
    private router: Router ,
    private fb: FormBuilder,
    private cookieService: CookieService,
    private _postreServices: PostreServiceService,
    private messageService: MessageService,
    private http: HttpClient
  ) {
    this.formDepartamento = this.fb.group({
      // post_Id: ["", Validators.required],
      bebi_Descripcion: ["", Validators.required],
      bebi_Precio: ["", Validators.required],
      //  post_Imagen: ["", Validators.required],
    });
  }


  ngOnInit(): void {
    this.getBebidas();
    this.mostrarmensaje = this.cookieService.get('showSuccessMessageBebida');
    this.mensaje =  this.cookieService.get('MensajeBebida');

    if (this.mostrarmensaje) {
      setTimeout(() => {  
        if(this.mensaje == 'Nuevo'){
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Bebida agregado correctamente' });
          this.mensaje = '';
        }
        else{
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Bebida editado correctamente' });
          this.cookieService.delete('MensajeBebida');
        }
       
      this.cookieService.delete('showSuccessMessageBebida');
      });
   
      
    }
  }

  getBebidas(){
    this.service.getBebidas().subscribe(
      (data: any) => {
        console.log(data);
        this.bebida = data;
        console.log(this.bebida);
      },
       error => {
        console.log(error);
      }
    );
  }
 
  detallePostre(combId: number) {
    this.router.navigate(['app/DetalleBebida', combId]); // Redirige a la ruta de edición con el ID del rol
  }

  displayNuevoDepartamento() {
    this.formDepartamento.reset();
    this.selectedImageURL = null; 
    this.modalTitle = 'Nuevo Registro';
    this.modalButtonLabel = 'Guardar';
    this.display = true;
  }

  
  editDepartamento(departamento: any) {
    this.selectedDepartamento = departamento.bebi_Id;
    console.log("ID: " + this.selectedDepartamento),
    this.selectedImageURL = "https://localhost:44332/uploads/" + departamento.bebi_Imagen;
    this.prueba = departamento.bebi_Imagen;
    this.modalTitle = 'Editar Registro';
    this.modalButtonLabel = 'Actualizar';
    this.formDepartamento.patchValue({
      bebi_Descripcion: departamento.bebi_Descripcion,
      bebi_Precio: departamento.bebi_Precio,
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
      this.submitted = true
    }
   
  }

  actualizarDepartamento() {
    const idDepartamento = this.selectedDepartamento;
    const modelo: BebidaActualizar = {
      bebi_Id: idDepartamento,
      bebi_Descripcion: this.formDepartamento.value.bebi_Descripcion,
      bebi_Precio: this.formDepartamento.value.bebi_Precio,
      bebi_Imagen: this.prueba,
      bebi_Usua_Modifica: 1,
    }

    this.service.actualizar(modelo).subscribe({
      next: (data) => {
        this.getBebidas();
        this.cookieService.set('MensajeBebida', 'Editado');
        this.cookieService.set('showSuccessMessageBebida', 'true');
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
    const modelo: Bebida2 = {
      bebi_Id: 0,
      bebi_Descripcion: this.formDepartamento.value.bebi_Descripcion,
      bebi_Precio: this.formDepartamento.value.bebi_Precio,
      bebi_Imagen: this.prueba,
      bebi_Usua_Creacion: 1,
    };

  
    this.service.agregar(modelo).subscribe({
      next: () => {
        this.getBebidas();
        this.cookieService.set('showSuccessMessageBebida', 'true');
        this.cookieService.set('MensajeBebida', 'Nuevo');
        location.reload();
      },
      error: (error) => {
        console.error('Error al agregar el departamento:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al agregar el departamento.' });
      }
    });
  }



  confirmarEliminarDepartamento(departamento: Bebida2) {
    this.departamentoAEliminar = departamento;
    this.confirmacionVisible = true;
  }

  eliminarDepartamento() {
    if (this.departamentoAEliminar) {
      const idDepartamento = this.departamentoAEliminar.bebi_Id;
      this.service.eliminar(idDepartamento).subscribe({
        next: (data) => {
          this.getBebidas();
          this.confirmacionVisible = false;
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: '¡Bebida eliminado correctamente!' });
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
    ButtonModule,
    InputTextModule,
    ToggleButtonModule,
    CarouselModule,
    DialogModule,
    RippleModule,
    MultiSelectModule,
    ImageModule,
    GalleriaModule,
    DropdownModule,
    ProgressBarModule,
    ReactiveFormsModule,
    ToastModule,
    SliderModule,
    FileUploadModule,
    RatingModule
  ],
  declarations: [BebidaListadoComponent]
})
export class bebidasListadoModule {}
