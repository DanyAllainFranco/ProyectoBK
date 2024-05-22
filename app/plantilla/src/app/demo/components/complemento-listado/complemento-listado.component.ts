import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Complemento, Complemento2, ComplementoActualizar } from '../../models/ComplementoViewModel';
import { ComplementoServiceService } from '../../service/complemento-service.service';
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
import { Bebida2, BebidaActualizar, Bebidas } from '../../models/BebidasViewModel';
import { BebidasServiceService } from '../../service/bebida-service.service';
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
import { CreationGuard } from '../../service/autguard-url.service';

@Component({
  selector: 'app-complemento-listado',
  templateUrl: './complemento-listado.component.html',
  styleUrl: './complemento-listado.component.scss',
  providers:[MessageService]
})
export class ComplementoListadoComponent implements OnInit {
  Complemento!: Complemento[];
  display: boolean = false;
  departamento: Postre[] = [];
  formDepartamento: FormGroup;
  selectedDepartamento: any;
  modalTitle: string = 'Nuevo Registro';
  modalButtonLabel: string = 'Guardar';
  confirmacionVisible: boolean = false;
  departamentoAEliminar: Complemento2 | null = null;
  uploadedFiles: any[] = [];
  selectedImageURL: string | null = null;
  imageSelected: boolean = false;
  showFileUpload: boolean = true;
  submitted: boolean = false;
  prueba: string = "";
  Usua_Id:number;
  constructor(
    private service: ComplementoServiceService,
    private router: Router ,
    private fb: FormBuilder,
    private cookieService: CookieService,
    private _postreServices: PostreServiceService,
    private messageService: MessageService,
    private http: HttpClient,
    private creationGuard: CreationGuard
  ) {
    this.formDepartamento = this.fb.group({
      // post_Id: ["", Validators.required],
      comp_Descripcion: ["", Validators.required],
      comp_Precio: ["", Validators.required],
      //  post_Imagen: ["", Validators.required],
    });
  }

  ngOnInit(): void {
   this.getComplementos();
   this.Usua_Id = Number.parseInt(this.cookieService.get('Usua_Id'));
   const showSuccessMessage = this.cookieService.get('showSuccessMessageComplemento');
   const tipo =  this.cookieService.get('Mensaje');
   console.log("SDAS: " + showSuccessMessage)
   if (showSuccessMessage) {
     setTimeout(() => {  
       if(tipo == 'Nuevo'){
         this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Complemento agregado correctamente' });
       }
       else{
         this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Complemento editado correctamente' });
       }
       this.cookieService.delete('showSuccessMessageComplemento');
     });
 
   }
  }
   
  detallePostre(combId: number) {
    this.creationGuard.allow();
    this.router.navigate(['app/DetalleComplemento', combId]); // Redirige a la ruta de edición con el ID del rol
  }
  getComplementos(){
    this.service.getComplemento().subscribe(
      (data: any) => {
        console.log(data);
        this.Complemento = data;
        console.log(this.Complemento);
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
    this.selectedDepartamento = departamento.comp_Id;
    console.log("ID: " + this.selectedDepartamento),
    this.selectedImageURL = "http://sistemarestaurante.somee.com/uploads/" + departamento.comp_Imagen;
    this.prueba = departamento.comp_Imagen;
    this.modalTitle = 'Editar Registro';
    this.modalButtonLabel = 'Actualizar';
    this.formDepartamento.patchValue({
      comp_Descripcion: departamento.comp_Descripcion,
      comp_Precio: departamento.comp_Precio,
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
    const modelo: ComplementoActualizar = {
      comp_Id: idDepartamento,
      comp_Descripcion: this.formDepartamento.value.comp_Descripcion,
      comp_Precio: this.formDepartamento.value.comp_Precio,
      comp_Imagen: this.prueba,
      comp_Usua_Modifica: this.Usua_Id,
    }

    this.service.actualizar(modelo).subscribe({
      next: (data) => {
        this.getComplementos();
        this.cookieService.set('Mensaje', 'Editado');
        this.cookieService.set('showSuccessMessageComplemento', 'true');
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
    const modelo: Complemento2 = {
      comp_Id: 0,
      comp_Descripcion: this.formDepartamento.value.comp_Descripcion,
      comp_Precio: this.formDepartamento.value.comp_Precio,
      comp_Imagen: this.prueba,
      comp_Usua_Creacion: this.Usua_Id,
    };

  
    this.service.agregar(modelo).subscribe({
      next: () => {
        this.getComplementos();
        this.cookieService.set('showSuccessMessageComplemento', 'true');
        this.cookieService.set('Mensaje', 'Nuevo');
        location.reload();
      },
      error: (error) => {
        console.error('Error al agregar el departamento:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al agregar el departamento.' });
      }
    });
  }



  confirmarEliminarDepartamento(departamento: Complemento2) {
    this.departamentoAEliminar = departamento;
    this.confirmacionVisible = true;
  }

  eliminarDepartamento() {
    if (this.departamentoAEliminar) {
      const idDepartamento = this.departamentoAEliminar.comp_Id;
      this.service.eliminar(idDepartamento).subscribe({
        next: (data) => {
          this.getComplementos();
          this.confirmacionVisible = false;
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: '¡Complemento eliminado correctamente!' });
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
    RippleModule,
    ImageModule,
    MultiSelectModule,
    ReactiveFormsModule,
    DropdownModule,
    ProgressBarModule,
    ToastModule,
    DialogModule,
    FileUploadModule,
    GalleriaModule,
    SliderModule,
    CarouselModule,
    RatingModule
  ],
  declarations: [ComplementoListadoComponent]
})
export class ComplementosListadoModule {}
