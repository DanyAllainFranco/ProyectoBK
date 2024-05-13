import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    // constructor(private primengConfig: PrimeNGConfig) {}
    constructor(private router:Router){}
        // this.primengConfig.ripple = true;
        ListarDepartamento (){
            this.router.navigate(['Index']);
        }
        ListarEmpleados (){
            this.router.navigate(['IndexEmpleado']);
        }
        ListarEstadosCiviles (){
            this.router.navigate(['IndexEstadoCivil']);
        }
        ListarMunicipios (){
            this.router.navigate(['IndexMunicipio']);
        }
        ListarCombosPersonales (){
            this.router.navigate(['IndexComboPersonal']);
        }
        ListarComplementos (){
            this.router.navigate(['IndexComplemento']);
        }
        ListarPostres (){
            this.router.navigate(['IndexPostre']);
        }
        ListarPromociones (){
            this.router.navigate(['IndexPromocion']);
        }
        ListarPromocionesComidas (){
            this.router.navigate(['IndexPromocionPorComida']);
        }
        ListarPromocionesSucursales (){
            this.router.navigate(['IndexPromocionPorSucursal']);
        }
        ListarCargos (){
            this.router.navigate(['IndexCargos']);
        }
        ListarAlimentos (){
            this.router.navigate(['IndexAlimentos']);
        }
        ListarClientes (){
            this.router.navigate(['IndexClientes']);
        }
        ListarUsuarios (){
            this.router.navigate(['IndexUsuarios']);
        }
        ListarBebidas (){
            this.router.navigate(['IndexBebidas']);
        }
        ListarPaquetes (){
            this.router.navigate(['IndexPaquetes']);
        }
        ListarPaquetesporComida (){
            this.router.navigate(['IndexPaquetesporComida']);
        }
        ListarSucursales (){
            this.router.navigate(['IndexSucursales']);
        }
        ListarGraficos (){
            this.router.navigate(['IndexGraficos']);
        }
        InformeDeVentas (){
            this.router.navigate(['IndexInforme']);
        }
}
