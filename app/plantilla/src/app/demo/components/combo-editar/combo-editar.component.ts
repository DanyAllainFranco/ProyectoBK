import { Component, OnInit, NgModule,Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { SelectItem } from 'primeng/api';
import {ComboPersonalServiceService} from 'src/app/demo/service/combopersonal-service.service'; 
import { Pantallas } from 'src/app/demo/models/PantallaViewMode';
import { Rol } from 'src/app/demo/models/RolesViewModel';
import { Respuesta } from 'src/app/demo/models/ServiceResult';
import { MessageService } from 'primeng/api';
import { ComboPEnviar, Llenar } from '../../models/ComboPersonalViewModel';
import {AlimentosServiceService} from 'src/app/demo/service/alimento-service.service'; 
import { CargarAlimentos } from '../../models/AlimentosViewModel';
import { CargarBebidas } from '../../models/BebidasViewModel';
import { CargarPostres } from '../../models/PostreViewModel';
import { CargarComplementos } from '../../models/ComplementoViewModel';
import { BebidasServiceService } from '../../service/bebida-service.service';
import { PostreServiceService } from '../../service/postre-service.service';
import { ComplementoServiceService } from '../../service/complemento-service.service';
import { ImageModule } from 'primeng/image';
import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'primeng/carousel';
import { FileUploadModule } from 'primeng/fileupload';
import { Fill } from '../../models/ComboPersonalViewModel';
import { dA } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-combo-editar',
  templateUrl: './combo-editar.component.html',
  styleUrl: './combo-editar.component.scss',
  providers: [MessageService]
})
export class ComboEditarComponent implements OnInit{
  EditarCombo: Llenar;
  form: FormGroup;
  ComboId: number;
  postres: SelectItem[] = [];
  invalid: boolean = false;
  alimentos: SelectItem[] = [];
  bebidas: SelectItem[] = [];
  complementos: SelectItem[] = [];
  selectedImageURL: string | null = null;
  Imagen: string;
  constructor(
    private route: ActivatedRoute,
    private rolService: ComboPersonalServiceService,
    private formBuilder: FormBuilder,
    private postreService: PostreServiceService,
    private alimentoService: AlimentosServiceService,
    private bebidaService: BebidasServiceService,
    private complementoService: ComplementoServiceService,
    private messageService: MessageService,
    private router: Router,
  ) { }
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ComboId = +params['id'];
      this.obtenerRol(this.ComboId);

    });
    this.form = this.formBuilder.group({
      nombreRol: ['', Validators.required],
      postre: [''],
      Alim_Id: ['', Validators.required],
      Bebi_Id: ['', Validators.required],
      Comb_Precio: ['', Validators.required],
      Comp_Id: ['', Validators.required],
      Post_Id: ['', Validators.required],
    });
   
  }
  cargarComplementos(){
    this.complementoService.getComplemento().subscribe(
      (data: any[]) => {
        console.log(data)
        this.complementos = data.map(item => ({ label: item.comp_Descripcion, value: item.comp_Id }));
      },
      error => {
        console.log(error);
      }
    );
  }
  cargarPostres(){
    this.postreService.getPostre().subscribe(
      (data: any[]) => {
        console.log(data)
        this.postres = data.map(item => ({ label: item.post_Descripcion, value: item.post_id }));
      },
      error => {
        console.log(error);
      }
    );
  }
  cargarBebidas(){
    this.bebidaService.getBebidas().subscribe(
      (data: any[]) => {
        console.log(data)
        this.bebidas = data.map(item => ({ label: item.bebi_Descripcion, value: item.bebi_Id }));
      },
      error => {
        console.log(error);
      }
    );
  }
  cargarAlimentos(){
    this.alimentoService.getAlimento().subscribe(
      (data: any[]) => {
        this.alimentos = data.map(item => ({ label: item.alim_Descripcion, value: item.alim_Id }));
      },
      error => {
        console.log(error);
      }
    );
  }

  onUpload(event) {
    const file: File = event.files[0];
    this.selectedImageURL = URL.createObjectURL(file);
    if (file) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const uniqueFileName = uniqueSuffix + '-' + file.name;
      this.Imagen = uniqueFileName;
      const formData: FormData = new FormData();
  
      formData.append('file', file, uniqueFileName);
      this.rolService.EnviarImagen(formData).subscribe(
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


  obtenerRol(id: number) {
    this.rolService.obtenerComboPorId(id).subscribe(
      (data: any) => {
        this.EditarCombo = data;

        this.Imagen = this.EditarCombo.comb_Imagen;
        this.selectedImageURL = "https://localhost:44332/uploads/" + this.Imagen;

        console.log("Esta es la imagen: " + this.Imagen)
        this.cargarPostres();
        this.cargarAlimentos();
        this.cargarBebidas();
        this.cargarComplementos();
         this.form.patchValue({
           nombreRol: this.EditarCombo.comb_Descripcion,
            postre: this.EditarCombo.post_Id,
            Alim_Id: this.EditarCombo.alim_Id,
            Bebi_Id: this.EditarCombo.bebi_Id,
            Comb_Precio: this.EditarCombo.comb_Precio,
            Comp_Id: this.EditarCombo.comp_Id,
            Post_Id: this.EditarCombo.post_Id,
            
         });
      },
      error => {
        console.log(error);
      }
    );
  }
  Volver(){
    this.router.navigate(['app/IndexComboPersonal'])
  }
  guardar() {    
    if (this.form.valid) {
       const Comb_Id = this.ComboId;
      const Comb_Descripcion = this.form.value.nombreRol;
      const Alim_Id = this.form.value.Alim_Id;
      const Bebi_Id = this.form.value.Bebi_Id;
      const Comb_Imagen = this.Imagen;
      const Comb_Precio = this.form.value.Comb_Precio;
      const Comp_Id = this.form.value.Comp_Id;
      const Post_Id = this.form.value.postre;
      const NuevoCombo: ComboPEnviar = {
        Comb_Id: Comb_Id,
        Comb_Descripcion: Comb_Descripcion,
        Alim_Id: Alim_Id,
        Bebi_Id: Bebi_Id,
        Comb_Imagen: Comb_Imagen,
        Comb_Precio: Comb_Precio,
        ComB_Usua_Creacion: 1,
        Comp_Id: Comp_Id,
        Post_Id: Post_Id,
      };
  
      this.rolService.actualizar(NuevoCombo).subscribe(
        (respuesta: Respuesta) => {
          if (respuesta.success) {
            this.rolService.successMessage = '¡Combo actualizado correctamente!';
            this.router.navigate(['app/IndexComboPersonal']);
          } else {
            this.messageService.add({severity:'error', summary:'Error', detail:'Error al registrar el combo'});
            console.error('Error al crear el combo:', respuesta.message);
          }
        },
        error => {
          this.messageService.add({severity:'error', summary:'Error', detail:'Error al comunicarse con el servidor'});
          console.error('Error al crear el combo:', error);
        }
      );
    } else {
      console.log("Ingrese los campos")
      this.invalid = true;
    }
  }
}

@NgModule({
  imports: [
    FileUploadModule,
    ImageModule,
    GalleriaModule,
    OrderListModule,
    PickListModule,
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ToggleButtonModule,
    CarouselModule,
    RippleModule,
    FormsModule,
    MultiSelectModule,
    DropdownModule,
    ProgressBarModule,
    DialogModule,
    ToastModule,
    SliderModule,
    RatingModule,
    MatButtonModule,
    DataViewModule
  ],
  declarations: [
    ComboEditarComponent
  ]
})
export class  ComboEditarModule { }
