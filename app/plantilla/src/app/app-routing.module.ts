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
import { ReporteVentasComponent } from './demo/components/reporte-ventas/reporte-ventas.component';
import { ListDemoComponent } from './demo/components/uikit/list/listdemo.component';
import { GraficosComponent } from './demo/components/uikit/charts/chartsdemo.component';
import { FacturaListadoComponent } from './demo/components/factura-listado/factura-listado.component';
import { FacturacionComponent } from './demo/components/facturacion/facturacion.component';
import { FacturaComponent } from './demo/components/factura/factura.component';
import { RolListadoComponent } from './demo/components/rol-listado/rol-listado.component';
import { FiltrosComponent } from './demo/components/filtros/filtros.component';
import { RolCreateComponent } from './demo/components/rol-create/rol-create.component';
import { RolEditarComponent } from './demo/components/rol-editar/rol-editar.component';
import { ComboCreateComponent } from './demo/components/combo-create/combo-create.component';
import { ComboEditarComponent } from './demo/components/combo-editar/combo-editar.component';
import { ComboDetalleComponent } from './demo/components/combo-detalle/combo-detalle.component';
import { RolDetalleComponent } from './demo/components/rol-detalle/rol-detalle.component';
import { PromocionCreateComponent } from './demo/components/promocion-create/promocion-create.component';
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
import { ClienteEditarComponent } from './demo/components/cliente-editar/cliente-editar.component';
import { ClienteDetalleComponent } from './demo/components/cliente-detalle/cliente-detalle.component';
import { SucursalDetalleComponent } from './demo/components/sucursal-detalle/sucursal-detalle.component';
import { EmpleadoCreateComponent } from './demo/components/empleado-create/empleado-create.component';
import { EmpleadoEditarComponent } from './demo/components/empleado-editar/empleado-editar.component';
import { EmpleadoDemoModule } from './demo/components/empleado-listado/empleadodemo.module';
import { EmpleadoDetalleComponent } from './demo/components/empleado-detalle/empleado-detalle.component';
import { AuthGuardService } from './demo/service/auth-guard.service';
import { PaqueteEditarComponent } from './demo/components/paquete-editar/paquete-editar.component';
import { PaqueteDetalleComponent } from './demo/components/paquete-detalle/paquete-detalle.component';
import { InicioComponent } from './demo/components/inicio/inicio.component';
import { ReporteEmpleadoComponent } from './demo/components/reporte-empleado/reporte-empleado.component';
import { ReporteProductos } from './demo/models/FacturaViewModel';
import { ReporteProductosComponent } from './demo/components/reporte-productos/reporte-productos.component';
import { ReporteSucursalComponent } from './demo/components/reporte-sucursal/reporte-sucursal.component';
import { ReporteCompletoComponent } from './demo/components/reporte-completo/reporte-completo.component';
import { ReporteIdentificadorComponent } from './demo/components/reporte-identificador/reporte-identificador.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
    {
        path: '', component: InicioDeSesionComponent // Componente de inicio de sesión como raíz
    },
    {
        path: 'app', component: AppLayoutComponent, // Resto de tus rutas van bajo 'app'
        children: [
            { path: 'Principal', component: ListDemoComponent  },
            { path: 'PrincipalGraficos', component: GraficosComponent },
            { path: 'Inicio', component: InicioComponent, },
            { path: 'dashboard', component: FiltrosComponent},
            { path: 'hoo', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
            { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
            { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
            { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
            { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
            { path: 'departamentos', component: DepartamentosListadoComponent,  canActivate: [AuthGuard] },
            { path: 'combo', component: CombopersonalListadoComponent, canActivate: [AuthGuard] },
            { path: 'CreateCombo', component: ComboCreateComponent },
            { path: 'complementos', component: ComplementoListadoComponent, canActivate: [AuthGuard]},
            { path: 'empleados', data: { breadcrumb: 'Empleado' }, loadChildren: () => import('./demo/components/empleado-listado/empleadodemo.module').then(m => m.EmpleadoDemoModule), canActivate: [AuthGuard] },
            { path: 'estadosciviles', data: { breadcrumb: 'Estado' }, loadChildren: () => import('./demo/components/estadocivil-listado/EstadoCivildemo.module').then(m => m.EstadoCivilDemoModule),  canActivate: [AuthGuard] },
            { path: 'municipios', data: { breadcrumb: 'Municipio' }, loadChildren: () => import('./demo/components/municipio-listado/Municipiodemo.module').then(m => m.MunicipioDemoModule), canActivate: [AuthGuard] },
            { path: 'postres', component: PostreListadoComponent, canActivate: [AuthGuard] },
            { path: 'promociones', component: PromocionListadoComponent, canActivate: [AuthGuard] },
            { path: 'IndexPromocionPorComida', component: PromocionporcomidaListadoComponent },
            { path: 'IndexPromocionPorSucursal', component: PromocionporsucursalListadoComponent },
            { path: 'cargos', component: CargoListadoComponent, canActivate: [AuthGuard]  },
            { path: 'alimentos', component: AlimentosListadoComponent, canActivate: [AuthGuard]},
            { path: 'bebidas', component: BebidaListadoComponent, canActivate: [AuthGuard]},
            { path: 'clientes', component: ClientesListadoComponent, canActivate: [AuthGuard]},
            { path: 'usuarios', component: UsuariosListadoComponent, canActivate: [AuthGuard] },
            { path: 'paquetes', component: PaqueteListadoComponent, canActivate: [AuthGuard] },
            { path: 'sucursales', component: SucursalListadoComponent, canActivate: [AuthGuard] },
            { path: 'roles', component: RolListadoComponent, canActivate: [AuthGuard]},
            { path: 'CreateRol', component: RolCreateComponent},
            { path: 'CreatePaquete', component: PaqueteCreateComponent},
            { path: 'CreateEmpleado', component: EmpleadoCreateComponent },
            { path: 'EditarRol/:id', component: RolEditarComponent },
            { path: 'EditarEmpleado/:id', component: EmpleadoEditarComponent },
            { path: 'DetalleEmpleado/:id', component: EmpleadoDetalleComponent, },
            { path: 'EditarCliente/:id', component: ClienteEditarComponent },
            { path: 'EditarPaquete/:id', component: PaqueteEditarComponent },
            { path: 'EditarPromocion/:id', component: PromocionEditarComponent },
            { path: 'DetalleRol/:id', component: RolDetalleComponent },
            { path: 'DetallePaquete/:id', component: PaqueteDetalleComponent },
            { path: 'DetalleSucursal/:id', component: SucursalDetalleComponent,  },
            { path: 'DetalleCliente/:id', component: ClienteDetalleComponent, },
            { path: 'CreatePromocion', component: PromocionCreateComponent, },
            { path: 'EditarCombo/:id', component: ComboEditarComponent, },
            { path: 'CreateCliente', component: ClienteCreateComponent, },
            { path: 'DetalleCombo/:id', component: ComboDetalleComponent, },
            { path: 'DetalleUsuario/:id', component: UsuarioDetalleComponent, },
            { path: 'DetallePromocion/:id', component: PromocionDetalleComponent, },
            { path: 'DetalleCargo/:id', component: CargoDetalleComponent, },
            { path: 'DetalleDepartamento/:id', component: DepartamentoDetalleComponent },
            { path: 'DetallePostre/:id', component: PostreDetalleComponent },
            { path: 'DetalleAlimento/:id', component: AlimentoDetalleComponent,  },
            { path: 'DetalleBebida/:id', component: BebidaDetalleComponent, },
            { path: 'CreateUsuario', component: UsuarioCreateComponent,   },
            { path: 'DetalleComplemento/:id', component: ComplementoDetalleComponent, },
            { path: 'IndexInforme', component: ReporteVentasComponent,},
            { path: 'facturas', component: FacturaListadoComponent, canActivate: [AuthGuard]  },
            { path: 'IndexFacturacion', component: FacturacionComponent, },
            { path: 'IndexFac', component: FacturaComponent, },
            { path: 'login', component: InicioDeSesionComponent },
            { path: 'reporteempleados', component: ReporteEmpleadoComponent, canActivate: [AuthGuard] },
            { path: 'reporteproductos', component: ReporteProductosComponent, },
            { path: 'reportesucursal', component: ReporteSucursalComponent, canActivate: [AuthGuard] },
            { path: 'reportecompleto', component: ReporteCompletoComponent,  canActivate: [AuthGuard]},
            { path: 'reportecategoria', component: ReporteIdentificadorComponent, canActivate: [AuthGuard] }
        ]
    },
    { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
    { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
    { path: 'notfound', component: NotfoundComponent },
 
    // { path: '**', redirectTo: '/notfound' },
]

@NgModule({
    imports: [RouterModule.forRoot(routes,{ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
