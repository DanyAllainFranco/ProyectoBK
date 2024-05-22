import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { RolService } from './rol.service';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from './UrlParaAPI';
import { ReorderableColumn } from 'primeng/table';


interface Pantalla {
  pant_Descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  private allowedScreens: Set<string> = new Set();
  private static readonly USUARIO_KEY = 'usuarioLogueado';
  private static readonly PERMISSIONS_KEY = 'allowedScreens';

  constructor(private http: HttpClient, private service: RolService,
              private cookieService: CookieService, private router: Router) {
    const storedPermissions = localStorage.getItem(AuthGuardService.PERMISSIONS_KEY);
    if (storedPermissions) {
      this.allowedScreens = new Set(JSON.parse(storedPermissions));
    }
  }

  setUsuarioLogueado(usuario: string) {
    localStorage.setItem(AuthGuardService.USUARIO_KEY, usuario);
  }

  getUsuarioLogueado(): string {
    return localStorage.getItem(AuthGuardService.USUARIO_KEY) || '';
  }

  clearUsuarioLogueado() {
    localStorage.removeItem(AuthGuardService.USUARIO_KEY);
    localStorage.removeItem(AuthGuardService.PERMISSIONS_KEY);
  }

  loadPermissions(): void {
    const roleId = Number.parseInt(this.cookieService.get('Rol_Id'));
    console.log('ROL: ' + roleId)
    if (!roleId) {
      console.error('Role ID is not set or invalid.');
      return;
    }
  
    this.service.getPantallasAgregadas(roleId).subscribe({
      next: (pantallas: Pantalla[]) => {
        this.allowedScreens = new Set(
          pantallas.map(pant =>
            pant.pant_Descripcion.toLowerCase().replace(/\s+/g, ''),
            console.log("Hola: " + pantallas)
          )
        );
        console.log("PANTALLAS2: " + this.allowedScreens)
        localStorage.setItem(AuthGuardService.PERMISSIONS_KEY, JSON.stringify(Array.from(this.allowedScreens)));
      },
      error: (error) => {
        console.error('Error', error);
      }
    });
  }

  isUrlAllowed(url: string): boolean {
    const admin = this.cookieService.get('Usua_Admin').toString();

    if (url === '/app/login' || url === '/auth' || url === '/') {
    
      return true;
    }

    if (admin === "true") {
      return true;
    }

    const urlSegments = url.toLowerCase().split('/').filter(segment => segment.trim() !== '');

    const screenNameIndex = urlSegments.indexOf('app') + 1;
    if (screenNameIndex > 0 && screenNameIndex < urlSegments.length) {
      const screenName = urlSegments[screenNameIndex].trim();
      console.log("PANTALLAS: " + this.allowedScreens.has(screenName))
      return this.allowedScreens.has(screenName);
    }

    return false;
  }

  isAuthenticated(): boolean {
    return this.cookieService.check('Usua_Usuario');
  }

  logout() {
    this.cookieService.deleteAll();
    this.clearUsuarioLogueado();
    this.router.navigate(['/']);
  }
}
