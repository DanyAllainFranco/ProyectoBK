import { Component, OnInit, NgModule, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Sucursales } from '../../models/SucursalesViewModel';
import { DropMunicipios } from '../../models/MunicipioViewModel';
import { FacturaServiceService } from '../../service/factura-service.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SidebarModule } from 'primeng/sidebar';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TooltipModule } from 'primeng/tooltip';
import { AutoCompleteModule } from "primeng/autocomplete";
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { MensajeViewModel } from '../../models/MensajeVIewModel';
import { Factura, FacturaDetalle,FacturaEnviar } from '../../models/FacturaViewModel';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.scss'],
  providers: [ConfirmationService, MessageService]
})

export class FacturacionComponent{
  display: boolean = false;
  Factura!:Factura[];
  FacturaDetalle!:FacturaDetalle[];
  routeItems: MenuItem[] = [];
  MensajeViewModel!: MensajeViewModel[];
  submitted: boolean = false;
  loading: boolean = false;
  departamentos: any[] = [];
  fill: any[] = [];
  viewModel: FacturaEnviar = new FacturaEnviar();
  FacturaForm: FormGroup;
  DetalleForm: FormGroup;
  @ViewChild('filter') filter!: ElementRef;
  Collapse: boolean = false;
  DataTable: boolean = true;
  Tabla: boolean = true;
  Detalles: boolean = false;
  Agregar: boolean = true;
  MunCodigo: boolean = true;
  Valor: string = "";
  staticData = [{}];
  filteredCountries: any[] = [];


  deleteProductDialog: boolean = false;
  //Detalle
  Esta: String = "";
  id: string="";
  UsuarioCreacion: String = "";
  UsuarioModificacion: String = "";
  FechaCreacion: String = "";
  FechaModificacion: String = "";
  ID: String = "";
  selectedRadio: string = '1'; 
  Fact_ID: string = "0";
  selectedMetodo: string = '';

  //AUTOCOMPLETADO
  detalleForm: FormGroup;
  metodos: any[] = [];
  clientes: any[] = [];
  countries: any[] = [];
  constructor(private service: FacturaServiceService, private router: Router,
    private messageService: MessageService,private fb: FormBuilder
  
  ) { }


  ngOnInit(): void {
      this.service.getFacturas().subscribe((data: any)=>{
          console.log(data);
          this.Factura = data;
      },error=>{
        console.log(error);
      });

      this.service.getFacturasDetalle(0).subscribe((data: any)=>{
        console.log(data);
        this.FacturaDetalle = data;
    },error=>{
      console.log(error);
    });
      this.FacturaForm = new FormGroup({
        //FACTURA
        Clie_Nombre: new FormControl("", Validators.required),
        Clie_Identidad: new FormControl("", [Validators.required]),
        // Impu_Impuesto: new FormControl("15%",Validators.required),
         Emp_Id: new FormControl("1", [Validators.required]),
         Sucu_Id: new FormControl("1", [Validators.required]),
        // Prod_Producto: new FormControl(""),
        //Detalle
        Prod_Producto: new FormControl(""),
        FaDe_Ident: new FormControl("D",Validators.required),
        FaDe_ProdId: new FormControl("", Validators.required),
        FaDe_Cantidad: new FormControl("", [Validators.required]),
    });      

    this.service.getBebida().subscribe(countries => {
      this.countries = countries;
  });
  
  this.service.getComplemento().subscribe(countries => {
    this.countries = countries;
});

this.service.getPostre().subscribe(countries => {
  this.countries = countries;
});

this.service.getPaquete().subscribe(countries => {
  this.countries = countries;
});

// this.service.getBebida().subscribe(countries => {
//   this.countries = countries;
// });
  }
   onRadioChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.selectedRadio = target.value;

    if (value === "N") {
      this.service.getComplemento().subscribe(countries => {
      this.countries = countries;
      this.FacturaForm.get('FaDe_Ident').setValue(value); 
      this.FacturaForm.get('FaDe_ProdId').setValue(""); 
      this.FacturaForm.get('Prod_Producto').setValue(""); 
      this.FacturaForm.get('FaDe_Cantidad').setValue(""); 
    });
    } else if(value == "D") {
      this.service.getPostre().subscribe(countries => {
        this.countries = countries;
      this.FacturaForm.get('FaDe_Ident').setValue(value); 
      this.FacturaForm.get('FaDe_ProdId').setValue(""); 
      this.FacturaForm.get('Prod_Producto').setValue(""); 
      this.FacturaForm.get('FaDe_Cantidad').setValue(""); 
    });
    } else if(value == "B") {
      this.service.getBebida().subscribe(countries => {
        this.countries = countries;
      this.FacturaForm.get('FaDe_Ident').setValue(value); 
      this.FacturaForm.get('FaDe_ProdId').setValue(""); 
      this.FacturaForm.get('Prod_Producto').setValue(""); 
      this.FacturaForm.get('FaDe_Cantidad').setValue(""); 
    });
    } else if(value == "P") {
      this.service.getPaquete().subscribe(countries => {
        this.countries = countries;
      this.FacturaForm.get('FaDe_Ident').setValue(value); 
      this.FacturaForm.get('FaDe_ProdId').setValue("");
      this.FacturaForm.get('Prod_Producto').setValue(""); 
      this.FacturaForm.get('FaDe_Cantidad').setValue(""); 
    });
    }
  }

   filterCountry(event: any) {
    const filtered: any[] = [];
    const query = event.query;
    for (let i = 0; i < this.countries.length; i++) {
        const country = this.countries[i];
        
        if (country.text.toLowerCase().indexOf(query.toLowerCase()) == 0) {

            filtered.push(country);
        }
    }
   
    this.FacturaForm.get('FaDe_Cantidad').setValue(1); 
    this.filteredCountries = filtered;
  }

handleKeyDown(event: KeyboardEvent) {
  if (event.key === "Enter" || event.key === "Tab") {
      event.preventDefault();
      this.onSubmit(); 
  }
}
// cantidad(event: any){
//   console.log(event.key)
//   console.log()
//   this.service.getDatosPorCodigo(this.FacturaForm.get('Prod_Id').value).subscribe(countries => {
//     this.FacturaForm.get('Prod_Nombre').setValue(countries[0].maqu_Nombre); 
//     this.FacturaForm.get('Prod_Id').setValue(countries[0].maqu_Id); 
//     this.FacturaForm.get('Prod_Producto').setValue(countries[0].maqu_Nombre); 
//     this.FacturaForm.get('Faxd_Cantidad').setValue(1); 
//   });

// }

onSubmit() {
  if (this.FacturaForm.valid && this.FacturaForm.get('FaDe_Cantidad').value !== '0') {
     this.viewModel = this.FacturaForm.value;
     this.viewModel.Fact_Id = this.Fact_ID;
     if (this.Valor == "Agregar") {
      this.service.EnviarFactura(this.viewModel).subscribe((data: MensajeViewModel[]) => {
          if(data["message"] == "Operación completada exitosamente."){
           this.Fact_ID = data["id"];
           this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Insertado con Exito', life: 3000 });
           this.DataTable = false;
           this.submitted = false;
           this.Detalles = false;
           this.Agregar = true;
           this.service.getFacturasDetalle(this.Fact_ID).subscribe((data: any)=>{
          this.FacturaDetalle = data;
          console.log(this.Fact_ID);
          });
          }else{
           this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No hay stock de este producto', life: 3000 });
          }
          
       })
     } 

  }   
      else 
      {
          this.submitted = true;
      }
  }

  cancelar(){
    this.DataTable = true;
    this.Detalles = false;
    this.ngOnInit();
    this.submitted = false;
    this.Agregar= true;
    this.Valor = "";
  }
}
@NgModule({
  imports: [
    CommonModule,
		ToastModule,
		DialogModule,
		FormsModule,
		TooltipModule,
		InputTextModule,
		DropdownModule,
		ButtonModule,
		OverlayPanelModule,
		TableModule,
		ConfirmDialogModule,
		SidebarModule,
		RippleModule,
		ConfirmPopupModule,
		ReactiveFormsModule,
		AutoCompleteModule,
		InputGroupAddonModule,
		InputGroupModule
    ],
  declarations: [FacturacionComponent]
})
export class SucursalListadoModule {}
