import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CreationGuard implements CanActivate {

  private allowAccess: boolean = false;

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.allowAccess) {
      this.allowAccess = false; // Reset after allowing access once
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }

  public allow() {
    this.allowAccess = true;
  }
}
