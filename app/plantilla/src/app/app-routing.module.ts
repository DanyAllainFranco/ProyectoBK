import { Route, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { InicioDeSesionComponent } from './demo/components/inicio-de-sesion/inicio-de-sesion.component';
import { DepartamentosListadoComponent } from './demo/components/departamentos_listado/departamentos-listado.component';
import { CombopersonalListadoComponent } from './demo/components/combopersonal-listado/combopersonal-listado.component';
import { ComplementoListadoComponent } from './demo/components/complemento-listado/complemento-listado.component';
import { EmpleadoListadoComponent } from './demo/components/empleado-listado/empleado-listado.component';
import { EstadocivilListadoComponent } from './demo/components/estadocivil-listado/estadocivil-listado.component';
import { MunicipioListadoComponent } from './demo/components/municipio-listado/municipio-listado.component';
import { PostreListadoComponent } from './demo/components/postre-listado/postre-listado.component';
import { PromocionListadoComponent } from './demo/components/promocion-listado/promocion-listado.component';
import { PromocionporcomidaListadoComponent } from './demo/components/promocionporcomida-listado/promocionporcomida-listado.component';
import { PromocionporsucursalListadoComponent } from './demo/components/promocionporsucursal-listado/promocionporsucursal-listado.component';
import { CargoListadoComponent } from './demo/components/cargo-listado/cargo-listado.component';
import { AlimentosListadoComponent } from './demo/components/alimento-listado/alimento-listado.component';
import { BebidaListadoComponent } from './demo/components/bebida-listado/bebida-listado.component';
import { ClientesListadoComponent } from './demo/components/cliente-listado/cliente-listado.component';
import { UsuariosListadoComponent } from './demo/components/usuario-listado/usuario-listado.component';
import { PaqueteListadoComponent } from './demo/components/paquete-listado/paquete-listado.component';
import { SucursalListadoComponent } from './demo/components/sucursal-listado/sucursal-listado.component';
import { ListDemoComponent } from './demo/components/uikit/list/listdemo.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: InicioDeSesionComponent // Componente de inicio de sesión como raíz
            },
            {
                path: 'app', component: AppLayoutComponent, // Resto de tus rutas van bajo 'app'
                children: [
                    { path: 'Principal',  component:ListDemoComponent},
                    { path: 'dashboard', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
                    { path: 'Index', component: DepartamentosListadoComponent },
                    { path: 'IndexComboPersonal', component: CombopersonalListadoComponent }, 
                    { path: 'IndexComplemento', component: ComplementoListadoComponent }, 
                    { path: 'IndexEmpleado', component: EmpleadoListadoComponent }, 
                    { path: 'IndexEstadoCivil', component: EstadocivilListadoComponent }, 
                    { path: 'IndexMunicipio', component: MunicipioListadoComponent },
                    { path: 'IndexPostre', component: PostreListadoComponent }, 
                    { path: 'IndexPromocion', component: PromocionListadoComponent },
                    { path: 'IndexPromocionPorComida', component: PromocionporcomidaListadoComponent }, 
                    { path: 'IndexPromocionPorSucursal', component: PromocionporsucursalListadoComponent } ,
                    { path: 'IndexCargos', component: CargoListadoComponent },
                    { path: 'IndexAlimentos', component: AlimentosListadoComponent } ,
                    { path: 'IndexBebidas', component: BebidaListadoComponent }, 
                    { path: 'IndexClientes', component: ClientesListadoComponent },
                    { path: 'IndexUsuarios', component: UsuariosListadoComponent },
                    { path: 'IndexPaquetes', component: PaqueteListadoComponent },
                    { path: 'IndexSucursales', component: SucursalListadoComponent }
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
