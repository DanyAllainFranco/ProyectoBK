import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { RolService } from './rol.service';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from './UrlParaAPI';


interface Pantalla {
  pant_Descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  private allowedScreens: Set<string>;

  constructor(private http: HttpClient, private service: RolService,
      private cookieService: CookieService, private router: Router) {
    this.allowedScreens = new Set();
  }

  Prueba: string = "xd";
  urlsPermitidas = BASE_URL + 'PantallaPorRol/'



  loadPermissions(): void {
  const roleId = Number.parseInt(this.cookieService.get('Rol_Id'));

      this.service.getPantallasAgregadas(roleId).subscribe({
        next: (pantallas: Pantalla[]) => {

          if (roleId !== null) {
              const pantallaAdicional = {
                pant_Descripcion: "dash",
              };
              pantallas.push(pantallaAdicional);
          }

          this.allowedScreens = new Set(
              pantallas.map(pant =>
                pant.pant_Descripcion.toLowerCase().replace(/\s+/g, '')
              ));
              console.log("Allowed screens xd :", Array.from(this.allowedScreens));
        },
        error: (error) => {
          console.error('Error', error);
        }
      });
    }   


     isUrlAllowedAccess(url: string): boolean {
      this.loadPermissions();
      const admin = this.cookieService.get('Usua_Admin').toString()

      if (admin == "true" ){
          console.log("authh")

          return true;
      }

      const urlSegments = url.split('/').filter(segment => segment.trim() !== '');

      console.log(urlSegments)
      const screenNameIndex = urlSegments.indexOf('') + 2;
      if (screenNameIndex > 0 && screenNameIndex < urlSegments.length) {
          const screenName = urlSegments[screenNameIndex].toLowerCase().trim();
          console.log(this.allowedScreens)
          console.log(`Screen name extracted: ${screenName}`);
         
          return this.allowedScreens.has(screenName);
      }

      this.router.navigate(['/']);

    return false;
  }


  isUrlAllowedLogin(url: string): boolean {
    this.loadPermissions();
    const admin = this.cookieService.get('Usua_Admin').toString()

    if (admin == "true" ){
      
        return true;
    }

    const urlSegments = url.split('/').filter(segment => segment.trim() !== '');
    console.log(urlSegments);
    const screenNameIndex = urlSegments.indexOf('') ;
     
    
    console.log("ES" + urlSegments[0])
    if (urlSegments[0] != "") {

        console.log("ES2" + urlSegments[0])

       
        return true
    }

    this.router.navigate(['/']);

  return false;
}


  isUrlAllowedVenta(url: string): boolean {
    this.loadPermissions();
    const admin = this.cookieService.get('Usua_Admin').toString()

    if (admin == "true" ){
        console.log("authh")

        return true;
    }

    const urlSegments = url.split('/').filter(segment => segment.trim() !== '');
    const screenNameIndex = urlSegments.indexOf('venta') + 1;
    if (screenNameIndex > 0 && screenNameIndex < urlSegments.length) {
        const screenName = urlSegments[screenNameIndex].toLowerCase().trim();
        console.log(`Screen name extracted: ${screenName}`);
       
        return this.allowedScreens.has(screenName);
    }

    this.router.navigate(['/login']);

  return false;
}

    isUrlAllowed(url: string): boolean {
      this.loadPermissions();
      const admin = this.cookieService.get('Usua_Admin').toString()
     
      if (admin == "true" ){
          console.log("authh")

          return true;
      }

      const urlSegments = url.split('/').filter(segment => segment.trim() !== '');
      const screenNameIndex = urlSegments.indexOf('') + 2;
      if (screenNameIndex > 0 && screenNameIndex < urlSegments.length) {
          const screenName = urlSegments[screenNameIndex].toLowerCase().trim();
          console.log(`Screen name extracted: ${screenName}`);
          console.log(this.allowedScreens);
          return this.allowedScreens.has(screenName);
      }

      this.router.navigate(['/login']);

    return false;
  }

}
