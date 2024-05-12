  import { Component, OnInit, NgModule,Inject } from '@angular/core';
  import { Router } from '@angular/router';
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
  import { ComboPEnviar } from '../../models/ComboPersonalViewModel';
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

  @Component({
    selector: 'app-combo-create',
    templateUrl: './combo-create.component.html',
    styleUrl: './combo-create.component.scss',
    providers: [MessageService]
  })
  export class ComboCreateComponent implements OnInit{
    departamento: CargarAlimentos[] = [];

    form: FormGroup;
      pickListVisible: boolean = false;

      selectedImageURL: string | null = null;
      imageSelected: boolean = false;
      showFileUpload: boolean = true;
  prueba: string = "";

      invalid: boolean = false;
      alimentos: SelectItem[] = [];
      bebidas: SelectItem[] = [];
      complementos: SelectItem[] = [];
      postres: SelectItem[] = [];
      constructor(private productService: ProductService,
        private router: Router,
        private fb: FormBuilder,
        private alimentoService: AlimentosServiceService,
        private bebidaService: BebidasServiceService,
        private postreService: PostreServiceService,
        private complementoService: ComplementoServiceService,
        private messageService: MessageService,
        private rolService: ComboPersonalServiceService) {
          this.form = this.fb.group({
            Comb_Descripcion: ['', Validators.required],

            Alim_Id: ['', Validators.required],
            Bebi_Id: ['', Validators.required],
            Comb_Precio: ['', Validators.required],
            Comp_Id: ['', Validators.required],
            Post_Id: ['', Validators.required],
          });
          }

  ngOnInit(): void {
    this.cargarAlimentos();
    this.cargarBebidas();
    this.cargarPostres();
    this.cargarComplementos();
  }

  onImageSelect(event: any) {
    const selectedFile: File = event.files[0];
    this.selectedImageURL = URL.createObjectURL(selectedFile);
    this.imageSelected = true;
    this.showFileUpload = true;

    this.prueba = selectedFile.name;
    console.log("Imagen: " + this.prueba)
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
  Volver(){
    this.router.navigate(['app/IndexComboPersonal'])
  }


  guardar() {
    console.log("Combo: " + this.form.value.Comb_Descripcion )
    console.log("Aliemento: " + this.form.value.Alim_Id )
    console.log("Bebida: " + this.form.value.Bebi_Id )
    console.log("Prueba: " + this.prueba )
    console.log("Precio: " + this.form.value.Comb_Precio )
    console.log("Complemento: " + this.form.value.Comp_Id )
    console.log("Postre: " + this.form.value.Post_Id )
    
    if (this.form.valid) {
      const Comb_Descripcion = this.form.value.Comb_Descripcion;
      const Alim_Id = this.form.value.Alim_Id;
      const Bebi_Id = this.form.value.Bebi_Id;
      const Comb_Imagen = this.prueba;
      const Comb_Precio = this.form.value.Comb_Precio;
      const Comp_Id = this.form.value.Comp_Id;
      const Post_Id = this.form.value.Post_Id;
  
      const NuevoCombo: ComboPEnviar = {
        
        Comb_Id: 0,
        Comb_Descripcion: Comb_Descripcion,
        Alim_Id: Alim_Id,
        Bebi_Id: Bebi_Id,
        Comb_Imagen: Comb_Imagen,
        Comb_Precio: Comb_Precio,
        ComB_Usua_Creacion: 1,
        Comp_Id: Comp_Id,
        Post_Id: Post_Id,
      };
  
      this.rolService.agregar(NuevoCombo).subscribe(
        (respuesta: Respuesta) => {
          if (respuesta.success) {
            this.messageService.add({severity:'success', summary:'Éxito', detail:'Combo registrado correctamente!'});
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
      ComboCreateComponent
    ]
  })
  export class  ComboCreateModule { }