import { Component, OnInit, NgModule, ElementRef, ViewChild } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
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
import { CountryService } from 'src/app/demo/service/country.service';
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
  templateUrl:'./facturacion.component.html',
  styleUrl: './facturacion.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class FacturacionComponent{
  Reporte_1: boolean = false;
  Reporte_2: boolean = false;
  Factura!:Factura[];
  FacturaDetalle!:FacturaDetalle[];
  routeItems: MenuItem[] = [];
  MensajeViewModel!: MensajeViewModel[];
  submitted: boolean = false;
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
  id:number =0;
  UsuarioCreacion: String = "";
  UsuarioModificacion: String = "";
  FechaCreacion: String = "";
  FechaModificacion: String = "";
  ID: String = "";
  //   Fact_ID: string = "0";
  selectedRadio: string = '1'; 
  Fact_ID = 0;
  Prod_Nombre?:string;
  FaDe_Ident?:string;
  Empl_Id = 0;
  selectedMetodo: string = '1';
   //AUTOCOMPLETADO
  detalleForm: FormGroup;
  metodos: any[] = [];
  clientes: any[] = [];
  countries: any[] = [];
  listJoyas: any[] = [];
  selectedCountryAdvanced: any[] = [];
  selectedListJoya: any[] = [];
  filteredCountries: any[] = [];
  products: any[];
  constructor(private service: FacturaServiceService, private router: Router,
    private messageService: MessageService,private countryService: CountryService,private fb: FormBuilder,
  ) { }


  ngOnInit(): void {
    this.loadProducts('N');
      this.service.getFacturas().subscribe((data: any)=>{
          console.log(data);
          this.Factura = data;
      },error=>{
        console.log(error);
      });

      this.service.getFacturasDetalle(this.Fact_ID).subscribe((data: any)=>{
        console.log(data);
        this.FacturaDetalle = data;
    },error=>{
      console.log(error);
    });
      this.FacturaForm = new FormGroup({
        //FACTURA
                // Clie_Id: new FormControl(""),
            
                Clie_Nombre: new FormControl(""),
                Clie_Identidad: new FormControl("" ),
                Prod_Producto: new FormControl("" ),
                FaDe_Ident: new FormControl("N"),
                FaDe_ProdId: new FormControl(""),
                FaDe_Cantidad: new FormControl("")
    });  
    }
      //AUTOCOMPLETADO
      loadProducts(value: string) {
        if (value === 'N') {
          this.service.getComplemento().subscribe(products => {
            this.products = products;
          });
        } else if (value === 'D') {
          this.service.getPostre().subscribe(products => {
            this.products = products;
          });
        } else if (value === 'B') {
          this.service.getBebida().subscribe(products => {
            this.products = products;
          });
        } else if (value === 'P') {
          this.service.getPaquete().subscribe(products => {
            this.products = products;
          });
        }
      }
   
   onRadioChange(value: string) {
    this.products = [];
    if (value === 'N') {
      this.service.getComplemento().subscribe(products => {
        this.products = products;
        this.resetForm(value);
      });
    } else if (value === 'D') {
      this.service.getPostre().subscribe(products => {
        this.products = products;
        this.resetForm(value);
      });
    } else if (value === 'B') {
      this.service.getBebida().subscribe(products => {
        this.products = products;
        this.resetForm(value);
      });
    } else if (value === 'P') {
      this.service.getPaquete().subscribe(products => {
        this.products = products;
        this.resetForm(value);
      });
    }
  }

  resetForm(value: string) {
    this.FacturaForm.get('FaDe_Ident').setValue(value);
    this.FacturaForm.get('FaDe_ProdId').setValue('');
    this.FacturaForm.get('Prod_Producto').setValue('');
    this.FacturaForm.get('FaDe_Cantidad').setValue('');
  }

  addProductToInvoice(selectedProduct: any) {
    // Verifica si se ha seleccionado un producto
    if (selectedProduct) {
        // Agrega el producto a la tabla de detalles
        this.FacturaDetalle.push({
            producto: selectedProduct.nombre,
            cantidad: '1', // Puedes establecer una cantidad inicial aquí
            precio: selectedProduct.precio,
            total: selectedProduct.precio // El total inicial será igual al precio del producto
        });
    } else {
        // Si no se ha seleccionado ningún producto, muestra un mensaje de error o realiza la acción correspondiente
        console.error("No se ha seleccionado ningún producto");
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
          
            agregarProductoDesdeDataview(producto: any) {
              // Verificar si se ha seleccionado un producto
              if (producto) {
                // Agregar el producto a la tabla de detalles
                this.FacturaDetalle.push({
                  producto: producto.nombre,
                  cantidad: '1', // Puedes establecer una cantidad inicial aquí
                  precio: producto.precio,
                  total: producto.precio // El total inicial será igual al precio del producto
                });
              } else {
                // Si no se ha seleccionado ningún producto, muestra un mensaje de error o realiza la acción correspondiente
                console.error("No se ha seleccionado ningún producto desde el dataview");
              }
            }
// filterJoyaList(event: any) {
//   const filtered: any[] = [];
//   const query = event.query;
//   for (let i = 0; i < this.listJoyas.length; i++) {
//       const country = this.listJoyas[i];
      
//       if (country.id.toLowerCase().indexOf(query.toLowerCase()) == 0) {

//           filtered.push(country);
//       }
//   }
 

//   this.filteredListJoya = filtered;
// }

handleKeyDown(event: KeyboardEvent) {
  if (event.key === "Enter" || event.key === "Tab") {
      event.preventDefault();
      console.log("Click");
      this.onSubmit(); 
  }
}


// filterMetodo(event: any) {
//   const filtered: any[] = [];
//   const query = event.query;
//   for (let i = 0; i < this.metodos.length; i++) {
//       const metodo = this.metodos[i];
      
//       if (metodo.mepa_Metodo.toLowerCase().indexOf(query.toLowerCase()) == 0) {

//           filtered.push(metodo);
//       }
//   }
 
//   this.filteredMetodoPago = filtered;
// }

// filterCliente(event: any) {
//   const filtered: any[] = [];
//   const query = event.query;
//   for (let i = 0; i < this.clientes.length; i++) {
//       const cliente = this.clientes[i];
      
//       if (cliente.clie_DNI.toLowerCase().indexOf(query.toLowerCase()) == 0) {

//           filtered.push(cliente);
//       }
//   }
 
//   this.filteredClientes = filtered;
// }
onSelectProduct(event) {
  this.FacturaForm.get('FaDe_Cantidad').setValue(1); 
  this.FacturaForm.get('FaDe_ProdId').setValue(event.value.value);
  console.log(this.FacturaForm.get('FaDe_ProdId').value);
  // this.FacturaForm.get('Prod_Nombre').setValue(event.value.nombre);  
}

onSelectJoyaList(event) {
  console.log(event);
  this.FacturaForm.get('FaDe_Cantidad').setValue(1); 
  this.FacturaForm.get('FaDe_ProdId').setValue(event.value.id); 
  this.FacturaForm.get('Prod_Nombre').setValue(event.value.nombre); 
  this.FacturaForm.get('Prod_Producto').setValue(event.value.nombre); 
}

confirmDelete(id,dif) {
  console.log("hola"+id);
  console.log("hola"+dif);
  this.service.EliminarFactura(this.Fact_ID,id,dif).subscribe({
    next: (response) => {
      this.submitted = false;
        if(response.message == "La accion ha sido existosa"){
            this.service.getFacturasDetalle(this.Fact_ID).subscribe((data: any)=>{
            this.FacturaDetalle = data;
            console.log(this.Fact_ID);
            console.log(data);
              });
           }
        this.submitted = false;
    },
});
}

deleteSelectedProducts(codigo) {
  this.deleteProductDialog = true;
  this.ID = codigo;
  console.log("El codigo es" + codigo);
}

// ConfirmFactura() {
//   console.log(this.ID)
//   this.service.ConfirmarFactura(this.ID).subscribe((data: MensajeViewModel[]) => {
//     if(data["message"] == "La accion ha sido existosa"){
//     this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Confirmado con Exito', life: 3000 });
//      this.ngOnInit();
//      this.deleteProductDialog = false;
//     }else{
//      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro actualizar', life: 3000 });
//     }
//   })
// }


// detalles(){
//   const cuerpo = [
//     ['1', 'Diamante', '12', 'No'],
//     ['2', 'Joya', '8', 'Sí'],['2', 'Joya', '8', 'Sí'],['2', 'Joya', '8', 'Sí'],['2', 'Joya', '8', 'Sí'],['2', 'Joya', '8', 'Sí'],['2', 'Joya', '8', 'Sí'],['2', 'Joya', '8', 'Sí'],['2', 'Joya', '8', 'Sí'],['2', 'Joya', '8', 'Sí'],['2', 'Joya', '8', 'Sí'],['2', 'Joya', '8', 'Sí'],['2', 'Joya', '8', 'Sí'],['2', 'Joya', '8', 'Sí'],['2', 'Joya', '8', 'Sí'],['2', 'Joya', '8', 'Sí'],['2', 'Joya', '8', 'Sí'],['2', 'Joya', '8', 'Sí'],['2', 'Joya', '8', 'Sí'],['2', 'Joya', '8', 'Sí'],['2', 'Joya', '8', 'Sí'],['2', 'Joya', '8', 'Sí'],['2', 'Joya', '8', 'Sí'],['2', 'Joya', '8', 'Sí'],['2', 'Joya', '8', 'Sí'],['2', 'Joya', '8', 'Sí'],['2', 'Joya', '8', 'Sí'],
//   ];

//   const img = "assets/demo/images/galleria/Esmeraldas.png"
//   const blob = this.yService.Reporte2PDF(cuerpo,img);
//   const url = URL.createObjectURL(blob);
//   this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
//   this.Reporte_2 = true
//   this.Collapse= false;
//   this.DataTable = false;
//   this.Agregar= false;
// }

// Fill(codigo) {
//   this.service.getFill(codigo).subscribe({

//     next: (data: Fill) => {
//       console.log(data);
//       this.submitted = false;
//       this.FacturaForm = new FormGroup({
        
//         //FACTUR      this.submitted = false;
//         Mepa_Id: new FormControl(data[0].mepa_Id, Validators.required),
//         Empl_Id: new FormControl(data[0].empl_Id, ),
//         Clie_Id: new FormControl(data[0].clie_Id, ),
//         Clie_DNI: new FormControl("ss"),
//         Impu_Impuesto: new FormControl("15%",Validators.required),
//         Clie_Nombre: new FormControl(data[0].clie_Nombre, ),
//         Empl_Nombre: new FormControl(data[0].empl_Nombre, ),
//         Prod_Producto: new FormControl(""),
//         //Detalle
//         Faxd_Dif: new FormControl("1",Validators.required),
//         Prod_Nombre: new FormControl("", Validators.required),
//         Prod_Id: new FormControl("", Validators.required),
//         Faxd_Cantidad: new FormControl('', [Validators.required, Validators.min(1)]),
//     });  
//     this.MayorOVenta = "0";
//     this.TotalTabla = "0";
//     this.submitted = false;
//     this.selectMetodoPago(data[0].mepa_Id.toString());

//     if (data[0].clie_Id == "1") {
//       this.FacturaForm.get('Clie_DNI').setValue(""); 
//     }else{
//       this.FacturaForm.get('Clie_DNI').setValue(data[0].clie_DNI); 
//     }
//     }
//   });
 
//   this.service.getFacturasDetalle(codigo).subscribe((data: any)=>{
//     this.FacturaDetalle = data;
//     const total = data.reduce((sum, item) => {
//       const itemTotal = parseFloat(item.total) || 0; 
//       return sum + itemTotal;
//   }, 0);
//   const impuestoString = this.FacturaForm.get('Impu_Impuesto').value.replace('%', '');
//   const impuesto = parseFloat(impuestoString) / 100 || 0;
//   const TotalFinal = (total + (total * impuesto))
//   this.Subtotal = total.toFixed(2);
//   this.Total = TotalFinal.toFixed(2);
//   this.Collapse = true;
//   this.DataTable = false;
//   this.Agregar = false;
//   this.Detalles = false;
//   this.Fact_ID = codigo;
//   this.Valor = "Agregar";
//   });
 

// }

 cancelar(){
  this.Collapse= false;
  this.DataTable = true;
  this.Detalles = false;
  this.submitted = false;
  this.ngOnInit();
  this.Agregar= true;
  this.MunCodigo=true;
  this.Fact_ID = 0;
  this.router.navigate(['/app/IndexFactura']);
}

onSubmit() {
     this.viewModel = this.FacturaForm.value;
     this.viewModel.Fact_Id = this.Fact_ID;
      this.service.EnviarFactura(this.viewModel).subscribe((data: MensajeViewModel[]) => {
          if(data["message"] == "Operación completada exitosamente."){
           this.Fact_ID = data["id"];
           this.DataTable = false;
           this.submitted = false;
           this.Detalles = false;
           this.Agregar = false;
           this.service.getFacturasDetalle(this.Fact_ID).subscribe((data: any)=>{
           this.FacturaDetalle = data;
           console.log(data);    
          });
          }
       })
     }  

     
//   collapse(){
//     this.submitted = false;
//     this.Collapse= true;
//     this.DataTable = false;
//     this.Valor = "Agregar";
//     this.Agregar= false;
//     this.Detalles = false;
//     this.Tabla = false;
//     this.Subtotal = "0";
//     this.Total = "0";
//     this.selectedMetodo = "1";
//     this.service.getFacturasDetalle(0).subscribe((data: any)=>{
//       console.log(data);
//       this.FacturaDetalle = data;
//   },error=>{
//     console.log(error);
//   })
// }
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
    DataViewModule,
		ConfirmPopupModule,
		ReactiveFormsModule,
		AutoCompleteModule,
		InputGroupAddonModule,
		InputGroupModule
	],
	declarations: [FacturacionComponent]
})
export class FacturacionModule { }