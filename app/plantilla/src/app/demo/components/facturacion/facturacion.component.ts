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


  deleteProductDialog: boolean = false;
  //Detalle
  Esta: String = "";
  id: string="";
  UsuarioCreacion: String = "";
  UsuarioModificacion: String = "";
  FechaCreacion: String = "";
  FechaModificacion: String = "";
  ID: String = "";
  facura_impresa: any = null;

  selectedRadio: string = '1'; 


  Fact_ID: string = "0";
  selectedMetodo: string = '';

  //AUTOCOMPLETADO
  detalleForm: FormGroup;
  metodos: any[] = [];
  clientes: any[] = [];
  countries: any[] = [];
  onSubmit: any;

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
        Mepa_Metodo: new FormControl("Paypal", Validators.required),
        Mepa_Id: new FormControl("1", Validators.required),
        Empl_Id: new FormControl("3", [Validators.required]),
        Clie_Id: new FormControl("1", [Validators.required]),
        Clie_DNI: new FormControl(""),
        Impu_Impuesto: new FormControl("15%",Validators.required),
        Clie_Nombre: new FormControl("Usuario Final", [Validators.required]),
        Empl_Nombre: new FormControl("Eduardo Varela", [Validators.required]),
        Prod_Producto: new FormControl(""),
        //Detalle
        Faxd_Dif: new FormControl("1",Validators.required),
        Prod_Nombre: new FormControl("", Validators.required),
        Prod_Id: new FormControl("", Validators.required),
        Faxd_Cantidad: new FormControl("", [Validators.required]),
    });      

  }
   onRadioChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.selectedRadio = target.value;

    if (value === "1") {
      this.service.getAutoCompletadoJoya().subscribe(countries => {
      this.countries = countries;
      this.FacturaForm.get('Faxd_Dif').setValue(value); 
      this.FacturaForm.get('Prod_Nombre').setValue(""); 
      this.FacturaForm.get('Prod_Id').setValue(""); 
      this.FacturaForm.get('Prod_Producto').setValue(""); 
      this.FacturaForm.get('Faxd_Cantidad').setValue(""); 
    });
    } else {
      this.service.getAutoCompletadoMaquillaje().subscribe(countries => {
        this.countries = countries;
      this.FacturaForm.get('Faxd_Dif').setValue(value); 
      this.FacturaForm.get('Prod_Nombre').setValue(""); 
      this.FacturaForm.get('Prod_Producto').setValue(""); 
      this.FacturaForm.get('Prod_Id').setValue(""); 
      this.FacturaForm.get('Faxd_Cantidad').setValue(""); 
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
   
    this.FacturaForm.get('Faxd_Cantidad').setValue(1); 
}

handleKeyDown(event: KeyboardEvent) {
  if (event.key === "Enter" || event.key === "Tab") {
      event.preventDefault();
      this.onSubmit(); 
  }
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
