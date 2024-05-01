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
    }

