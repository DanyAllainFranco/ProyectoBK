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

    }

