import { Route, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { ListDemoComponent } from './demo/components/uikit/list/listdemo.component';
import {DepartamentosListadoComponent} from './demo/components/departamentos_listado/departamentos-listado.component';
import {CombopersonalListadoComponent} from './demo/components/combopersonal-listado/combopersonal-listado.component';
import {ComplementoListadoComponent} from './demo/components/complemento-listado/complemento-listado.component';
import {EmpleadoListadoComponent} from './demo/components/empleado-listado/empleado-listado.component';
import {EstadocivilListadoComponent} from './demo/components/estadocivil-listado/estadocivil-listado.component';
import {MunicipioListadoComponent} from './demo/components/municipio-listado/municipio-listado.component';
import {PostreListadoComponent} from './demo/components/postre-listado/postre-listado.component';
import {PromocionListadoComponent} from './demo/components/promocion-listado/promocion-listado.component';
import {PromocionporcomidaListadoComponent} from './demo/components/promocionporcomida-listado/promocionporcomida-listado.component';
import {PromocionporsucursalListadoComponent} from './demo/components/promocionporsucursal-listado/promocionporsucursal-listado.component';



@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', component: ListDemoComponent }, // Componente ListDemoComponent cargado como componente raíz
                    { path: 'dashboard', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
                    { path: 'Index', component: DepartamentosListadoComponent }, // Agrega la ruta para DepartamentosListadoComponent
                    { path: 'Index', component: CombopersonalListadoComponent }, 
                    { path: 'Index', component: ComplementoListadoComponent }, 
                    { path: 'Index', component: EmpleadoListadoComponent }, 
                    { path: 'Index', component: EstadocivilListadoComponent }, 
                    { path: 'Index', component: MunicipioListadoComponent },
                    { path: 'Index', component: PostreListadoComponent }, 
                    { path: 'Index', component: PromocionListadoComponent },
                    { path: 'Index', component: PromocionporcomidaListadoComponent }, 
                    { path: 'Index', component: PromocionporsucursalListadoComponent } 

                ]
            },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
