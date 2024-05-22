import { Component, OnInit, NgModule, ElementRef, ViewChild } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { Router } from '@angular/router';
import { FacturaServiceService } from '../../service/factura-service.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CountryService } from 'src/app/demo/service/country.service';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
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
import { Factura, FacturaDetalle, FacturaEnviar } from '../../models/FacturaViewModel';
import { CookieOptions, CookieService } from 'ngx-cookie-service';

@Component({
  templateUrl: './facturacion.component.html',
  styleUrl: './facturacion.component.scss',
  providers: [ConfirmationService, MessageService]
})

export class FacturacionComponent {
  Reporte_1: boolean = false;
  Reporte_2: boolean = false;
  Factura!: Factura[];
  FacturaDetalle!: FacturaDetalle[];
  EliminarElemento:FacturaDetalle;
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
  id: number = 0;
  UsuarioCreacion: String = "";
  UsuarioModificacion: String = "";
  FechaCreacion: String = "";
  FechaModificacion: String = "";
  ID: String = "";
  //   Fact_ID: string = "0";
  selectedRadio: string = '1';
  Fact_ID = 0;
  FaDe_Id = 0;
  Prod_Nombre?: string;
  FaDe_Ident?: string;
  Empl_Id: number;
  selectedMetodo: string = '1';
  showRtn: boolean = false;
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
  Usua_Id: number;
  Sucu_Id: number;
  
  constructor(private service: FacturaServiceService, private router: Router,
    private messageService: MessageService, private countryService: CountryService, 
    private cookieService: CookieService,
    private fb: FormBuilder,
  ) { }


  ngOnInit(): void {
    this.Usua_Id = Number.parseInt(this.cookieService.get('Usua_Id'));
    this.Sucu_Id = Number.parseInt(this.cookieService.get('Sucu_Id'));
    this.Empl_Id = Number.parseInt(this.cookieService.get('Empl_Id'));
    
  
    this.loadProducts('C');
    this.service.getFacturas().subscribe((data: any) => {
      console.log(data);
      this.Factura = data;
    }, error => {
      console.log(error);
    });

    this.service.getFacturasDetalle(this.Fact_ID).subscribe((data: any) => {
      console.log(data);
      this.FacturaDetalle = data;
    }, error => {
      console.log(error);
    });
    this.FacturaForm = new FormGroup({
      //FACTURA
      // // Clie_Id: new FormControl(""),    
      // Clie_Nombre: new FormControl(""),
      // Clie_Identidad: new FormControl(""),
      Prod_Producto: new FormControl(""),
      FaDe_Ident: new FormControl("C"),
      FaDe_ProdId: new FormControl(""),
      FaDe_Cantidad: new FormControl(1)
    });
  }
  //AUTOCOMPLETADO
  loadProducts(value: string) {
    if (value === 'N') {
      this.service.getComplemento().subscribe(products => {
        this.products = products;
        console.log(products);
      });
    } else if (value === 'D') {
      this.service.getPostre().subscribe(products => {
        this.products = products;
        console.log(products);
      });
    } else if (value === 'B') {
      this.service.getBebida().subscribe(products => {
        this.products = products;
        console.log(products);
      });
    } else if (value === 'P') {
      this.service.getPaquete().subscribe(products => {
        this.products = products;
        console.log(products);
      });
    }else if (value === 'C') {
      this.service.getCombo().subscribe(products => {
        this.products = products;
        console.log(products);
      });
    }
  }

  onRadioChange(value: string) {
    this.products = [];
    if (value === 'N') {
      this.service.getComplemento().subscribe(products => {
        this.products = products;
        console.log(products);
        this.resetForm(value);
      });
    } else if (value === 'D') {
      this.service.getPostre().subscribe(products => {
        this.products = products;
        console.log(products);
        this.resetForm(value);
      });
    } else if (value === 'B') {
      this.service.getBebida().subscribe(products => {
        this.products = products;
        console.log(products);
        this.resetForm(value);
      });
    } else if (value === 'P') {
      this.service.getPaquete().subscribe(products => {
        this.products = products;
        console.log(products);
        this.resetForm(value);
      });
    }else if (value === 'C') {
      this.service.getCombo().subscribe(products => {
        this.products = products;
        console.log(products);
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

  increaseQuantity(product: any): void {
    let cantidad = this.FacturaForm.get('FaDe_Cantidad').value;
    cantidad++;
    this.FacturaForm.get('FaDe_Cantidad').setValue(cantidad);
  }
  
  decreaseQuantity(product: any): void {
    let cantidad = this.FacturaForm.get('FaDe_Cantidad').value;
    if (cantidad > 1) {
      cantidad--;
      this.FacturaForm.get('FaDe_Cantidad').setValue(cantidad);
    }
  }

  addProductToInvoice(selectedProduct: any) {
    if (selectedProduct) {
      const cantidad = this.FacturaForm.get('FaDe_Cantidad').value;

      if (cantidad > 0) {
        this.FacturaDetalle.push({
          producto: selectedProduct.text,
          cantidad: cantidad,
          precio: (selectedProduct.precio).toFixed(2),
          total: (selectedProduct.precio * cantidad).toFixed(2)
        });

        this.onSelectProduct(selectedProduct);
        console.log(selectedProduct);
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'La cantidad tiene que ser mayor a 0.' });
      }
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha seleccionado ningun producto de la cuadricula' });
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
    if (producto) {
      const cantidad = this.FacturaForm.get('FaDe_Cantidad').value;

      if (cantidad > 0) {
        this.FacturaDetalle.push({
          producto: producto.text,
          cantidad: cantidad,
          precio: (producto.precio).toFixed(2),
          total: (producto.precio * cantidad).toFixed(2)
        });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'La cantidad tiene que ser mayor a 0.' });
      }
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha seleccionado ningun producto de la cuadricula' });
    }
  }

  onSelectProduct(product: any) {
    console.log("entras")
    if (product) {
      const cantidad = this.FacturaForm.get('FaDe_Cantidad').value;
      this.FacturaForm.patchValue({
        FaDe_ProdId: product.value,
        Prod_Producto: product.text,
        FaDe_Cantidad: cantidad
      });
      console.log("ID del producto seleccionado:", product.value);
      console.log("Nombre del producto seleccionado:", product.text);
    }
  }



  onSelectJoyaList(event) {
    console.log(event);
    this.FacturaForm.get('FaDe_Cantidad').setValue(1);
    this.FacturaForm.get('FaDe_ProdId').setValue(event.value.id);
    this.FacturaForm.get('Prod_Nombre').setValue(event.value.nombre);
    this.FacturaForm.get('Prod_Producto').setValue(event.value.nombre);
  }

  confirmDelete() { 
    const idProducto =  this.EliminarElemento.fact_Id;
    this.service.eliminarFacturaDetalle(idProducto).subscribe({
      next: (response) => {
        console.log(idProducto);
        console.log("Se elimino");
        this.submitted = false;
        console.log(response);
        if (response.message == "La accion ha sido existosa") {
          this.service.getFacturasDetalle(this.Fact_ID).subscribe((data: any) => {
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
  cancelar() {
    this.Collapse = false;
    this.DataTable = true;
    this.Detalles = false;
    this.submitted = false;
    this.ngOnInit();
    this.Agregar = true;
    this.MunCodigo = true;
    this.Fact_ID = 0;
    this.router.navigate(['/app/facturas']);
  }

  onSubmit() {
    this.viewModel = this.FacturaForm.value;
    this.viewModel.Fact_Id = this.Fact_ID;
    this.service.EnviarFactura(this.Usua_Id,this.Sucu_Id,this.Empl_Id,this.viewModel).subscribe((data: MensajeViewModel[]) => {
      if (data["message"] == "Operación completada exitosamente.") {
        this.Fact_ID = data["id"];
        this.DataTable = false;
        this.submitted = false;
        this.Detalles = false;
        this.Agregar = false;
        this.service.getFacturasDetalle(this.Fact_ID).subscribe((data: any) => {
          this.FacturaDetalle = data;
          console.log(data);
        });
      }
    })
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