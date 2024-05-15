import { Route, RouterModule, Routes } from '@angular/router';
import { NgModule, createComponent } from '@angular/core';
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
// import { GraficosComponent } from './demo/components/graficos/graficos.component';
import { ReporteVentasComponent } from './demo/components/reporte-ventas/reporte-ventas.component';
import { ListDemoComponent } from './demo/components/uikit/list/listdemo.component';
import { GraficosComponent } from './demo/components/uikit/charts/chartsdemo.component';
import { FacturaListadoComponent } from './demo/components/factura-listado/factura-listado.component';
import { FacturacionComponent } from './demo/components/facturacion/facturacion.component';
import { FacturaComponent } from './demo/components/factura/factura.component';
import { RolListadoComponent } from './demo/components/rol-listado/rol-listado.component';
import { FiltrosComponent } from './demo/components/filtros/filtros.component';
import {RolCreateComponent} from './demo/components/rol-create/rol-create.component';
import {RolEditarComponent} from './demo/components/rol-editar/rol-editar.component';
import {ComboCreateComponent} from './demo/components/combo-create/combo-create.component';
import {ComboEditarComponent} from './demo/components/combo-editar/combo-editar.component';
import {ComboDetalleComponent} from './demo/components/combo-detalle/combo-detalle.component';
import {RolDetalleComponent} from './demo/components/rol-detalle/rol-detalle.component';
import {PromocionCreateComponent} from './demo/components/promocion-create/promocion-create.component';
import { PromocionEditarComponent } from './demo/components/promocion-editar/promocion-editar.component';
import { PromocionDetalleComponent } from './demo/components/promocion-detalle/promocion-detalle.component';
import { PostreDetalleComponent } from './demo/components/postre-detalle/postre-detalle.component';
import { AlimentoDetalleComponent } from './demo/components/alimento-detalle/alimento-detalle.component';
import { BebidaDetalleComponent } from './demo/components/bebida-detalle/bebida-detalle.component';
import { ComplementoDetalleComponent } from './demo/components/complemento-detalle/complemento-detalle.component';
import { UsuarioCreateComponent } from './demo/components/usuario-create/usuario-create.component';
import { PaqueteCreateComponent } from './demo/components/paquete-create/paquete-create.component';
import { UsuarioDetalleComponent } from './demo/components/usuario-detalle/usuario-detalle.component';
import { CargoDetalleComponent } from './demo/components/cargo-detalle/cargo-detalle.component';
import { DepartamentoDetalleComponent } from './demo/components/departamento-detalle/departamento-detalle.component';
import { ClienteCreateComponent } from './demo/components/cliente-create/cliente-create.component';




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
                    { path: 'PrincipalGraficos',  component:GraficosComponent},
                    { path: 'FiltrosGraficos',  component:FiltrosComponent},
                    { path: 'dashboard', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
                    { path: 'Index', component: DepartamentosListadoComponent },
                    { path: 'IndexComboPersonal', component: CombopersonalListadoComponent }, 
                    { path: 'CreateCombo', component: ComboCreateComponent }, 
                    { path: 'IndexComplemento', component: ComplementoListadoComponent }, 
                    { path: 'IndexEmpleado', data: { breadcrumb: 'Empleado' }, loadChildren: () => import('./demo/components/empleado-listado/empleadodemo.module').then(m => m.EmpleadoDemoModule) },
                    { path: 'IndexEstadoCivil', data: { breadcrumb: 'Estado' }, loadChildren: () => import('./demo/components/estadocivil-listado/EstadoCivildemo.module').then(m => m.EstadoCivilDemoModule) },
                    { path: 'IndexMunicipio', data: { breadcrumb: 'Municipio' }, loadChildren: () => import('./demo/components/municipio-listado/Municipiodemo.module').then(m => m.MunicipioDemoModule) },
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
                    { path: 'IndexSucursales', component: SucursalListadoComponent },
                    {path: 'IndexRoles', component:RolListadoComponent},
                    { path: 'CreateRol', component: RolCreateComponent } , 
                    { path: 'CreatePaquete', component: PaqueteCreateComponent } , 
                    { path: 'EditarRol/:id', component: RolEditarComponent } ,
                    { path: 'EditarPromocion/:id', component: PromocionEditarComponent } ,
                    { path: 'DetalleRol/:id', component: RolDetalleComponent } ,
                    { path: 'CreatePromocion', component: PromocionCreateComponent } ,
                    { path: 'EditarCombo/:id', component: ComboEditarComponent } ,
                    { path: 'CreateCliente', component: ClienteCreateComponent } ,
                    { path: 'DetalleCombo/:id', component: ComboDetalleComponent },
                    { path: 'DetalleUsuario/:id', component: UsuarioDetalleComponent },
                    { path: 'DetallePromocion/:id', component: PromocionDetalleComponent},
                    { path: 'DetalleCargo/:id', component: CargoDetalleComponent},
                    { path: 'DetalleDepartamento/:id', component: DepartamentoDetalleComponent},
                    { path: 'DetallePostre/:id', component: PostreDetalleComponent},
                    { path: 'DetalleAlimento/:id', component: AlimentoDetalleComponent},
                    { path: 'DetalleBebida/:id', component: BebidaDetalleComponent},
                    { path: 'CreateUsuario', component: UsuarioCreateComponent},
                    { path: 'DetalleComplemento/:id', component: ComplementoDetalleComponent},
                    // { path: 'IndexGraficos', component: GraficosComponent }
                    { path: 'IndexInforme', component: ReporteVentasComponent }, //IndexFactura
                    { path: 'IndexFactura', component: FacturaListadoComponent }, //IndexFactura
                    { path: 'IndexFacturacion', component: FacturacionComponent }, //Factura
                    { path: 'IndexFac', component: FacturaComponent } //Factura

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
