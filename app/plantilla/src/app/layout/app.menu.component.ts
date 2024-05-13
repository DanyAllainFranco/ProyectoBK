import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    usuario: string;

    constructor(public layoutService: LayoutService, private router: Router) { }

    ngOnInit() {
        this.usuario = localStorage.getItem('usuario');
        this.model = [
            {
                label: 'Graficos',
                items: [
                    { label: 'Graficos', icon: 'pi pi-fw pi-chart-bar', command: () => this.loadGraficos() },
                    { label: 'Dashboard', icon: 'pi pi-fw pi-chart-bar', command: () => this.loadGraficosFiltros() }
                ]
            },
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Reportes',
                        icon: 'pi pi-file',
                        items: [
                            {
                                label: 'Reporte Combos',
                                icon: 'pi pi-palette',
                                routerLink: ['/app/Index']
                            },
                        ]
                    },
                    {
                        label: 'General',
                        icon: 'pi pi-fw pi-globe',
                        items: [
                            {
                                label: 'Departamentos',
                                icon: 'pi pi-map-marker',
                                routerLink: ['/app/Index']
                            },
                            {
                                label: 'Empleados',
                                icon: 'pi pi-users',
                                routerLink: ['/app/IndexEmpleado']
                            },
                            {
                                label: 'Municipios',
                                icon: 'pi pi-map-marker',
                                routerLink: ['/app/IndexMunicipio']
                            },
                            {
                                label: 'Estados Civiles',
                                icon: 'pi pi-fw pi-heart',
                                routerLink: ['/app/IndexEstadoCivil']
                            },
                            {
                                label: 'Clientes',
                                icon: 'pi pi-fw pi-users',
                                routerLink: ['/app/IndexClientes']
                            },
                           
                        ]
                    },
                    {
                        label: 'Restaurante',
                        icon: 'pi pi-shopping-bag',
                        items: [
                            {
                                label: 'Combos Personales',
                                icon: 'pi pi-user',
                                routerLink: ['/app/IndexComboPersonal']
                            },
                            {
                                label: 'Alimentos',
                                icon: 'pi pi-plus-circle',
                                routerLink: ['/app/IndexAlimentos']
                            },
                            {
                                label: 'Complementos',
                                icon: 'pi pi-plus-circle',
                                routerLink: ['/app/IndexComplemento']
                            },
                            {
                                label: 'Postres',
                                icon: 'pi pi-plus-circle',
                                routerLink: ['/app/IndexPostre']
                            },
                            {
                                label: 'Bebidas',
                                icon: 'pi pi-plus-circle',
                                routerLink: ['/app/IndexBebidas']
                            },
                            {
                                label: 'Promociones',
                                icon: 'pi pi-plus-circle',
                                routerLink: ['/app/IndexPromocion']
                            },
                            {
                                label: 'Promociones Por Comidas',
                                icon: 'pi pi-plus-circle',
                                routerLink: ['/app/IndexPromocionPorComida']
                            },
                          
                          
                            {
                                label: 'Paquetes',
                                icon: 'pi pi-users',
                                routerLink: ['/app/IndexPaquetes']
                            },
                            {
                                label: 'Paquetes por alimento',
                                icon: 'pi pi-users',
                                routerLink: ['/app/IndexPaquetesporAlimento']
                            },
                            {
                                label: 'Promociones Por Sucursales',
                                icon: 'pi pi-building',
                                routerLink: ['/app/IndexPromocionPorSucursal']
                            },
                            {
                                label: 'Sucursales',
                                icon: 'pi pi-building',
                                routerLink: ['/app/IndexSucursales']
                            }
                        ]
                    },{
                        label: 'Acceso',
                        icon: 'pi pi-key',
                        items: [
                            {
                                label: 'Cargos',
                                icon: 'pi pi pi-fw pi-key',
                                routerLink: ['/app/IndexCargos']
                            },
                            {
                                label: 'Usuarios',
                                icon: 'pi pi-user-plus',
                                routerLink: ['/app/IndexUsuarios']
                            },
                            {
                                label: 'Roles',
                                icon: 'pi pi-sitemap',
                                routerLink: ['/app/IndexRoles']
                            },                                                   
                        ]
                    },
                ]
            },
        ];
    }
    loadGraficos() {
        this.router.navigate(['/app/PrincipalGraficos'], { queryParams: { usuario: this.usuario } });
    }
    loadGraficosFiltros() {
        this.router.navigate(['/app/FiltrosGraficos'], { queryParams: { usuario: this.usuario } });
    }

    
}

