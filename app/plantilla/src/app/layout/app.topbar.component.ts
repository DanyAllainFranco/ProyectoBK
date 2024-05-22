import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit{

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,  
        private cookieService: CookieService, 
        private router: Router,
    ) { }
    userName: string = '';
    ngOnInit() {
        this.userName = this.cookieService.get('Usua_Usuario') || '¡';
        if (this.userName.includes('¡')) {
            this.router.navigate(['/']); 
            return; 
        }
        
    }
    CrearNuevaFactura(): void {
        this.router.navigate(['/app/IndexFacturacion']);
      }

    logOut() {
        this.cookieService.deleteAll();
        window.location.reload();
  
        // this.router.navigate(['/app/Login']);
        window.location.replace('/');
    }

}
