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
            this.router.navigate(['Index']);
        }
        ListarEstadosCiviles (){
            this.router.navigate(['Index']);
        }
        ListarMunicipios (){
            this.router.navigate(['Index']);
        }
        ListarCombosPersonales (){
            this.router.navigate(['Index']);
        }
        ListarComplementos (){
            this.router.navigate(['Index']);
        }
        ListarPostres (){
            this.router.navigate(['Index']);
        }
        ListarPromociones (){
            this.router.navigate(['Index']);
        }
        ListarPromocionesComidas (){
            this.router.navigate(['Index']);
        }
        ListarPromocionesSucursales (){
            this.router.navigate(['Index']);
        }

    }

