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
                    { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', command: () => this.loadGraficos() }
                ]
            },
            {
                label: 'Inicio',
                items: [
                    { label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: ['/app/uikit/'] }
                ]
            },
        
            {
                label: 'Sistema',
                items: [
                    { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/app/uikit/formlayout'] },
                    { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/app/uikit/input'] },
                    { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/app/uikit/floatlabel'] },
                    { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/app/uikit/invalidstate'] },
                    { label: 'Button', icon: 'pi pi-fw pi-box', routerLink: ['/app/uikit/button'] },
                    { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/app/uikit/table'] },
                    { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/app/uikit/list'] },
                    { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/app/uikit/tree'] },
                    { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/app/uikit/panel'] },
                    { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/app/uikit/overlay'] },
                    { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/app/uikit/media'] },
                    { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/app/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },
                    { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/app/uikit/message'] },
                    { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/app/uikit/file'] },
                    { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/app/uikit/charts'] },
                    { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/app/uikit/misc'] }
                ]
            },
            {
                label: 'Prime Blocks',
                items: [
                    { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', routerLink: ['/app/blocks'], badge: 'NEW' },
                    { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank' },
                ]
            },

            {
                label: 'Utilities',
                items: [
                    { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['/app/utilities/icons'] },
                    { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: ['https://www.primefaces.org/primeflex/'], target: '_blank' },
                ]
            },
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Landing',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/app/landing']
                    },
                    {
                        label: 'General',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Departamentos',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/app/Index']
                            },
                            {
                                label: 'Empleados',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/app/IndexEmpleado']
                            },
                            {
                                label: 'Municipios',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/app/IndexMunicipio']
                            },
                            {
                                label: 'Estados Civiles',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/app/IndexEstadoCivil']
                            },
                            {
                                label: 'Clinetes',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/app/IndexClientes']
                            },
                            {
                                label: '',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/app/auth/access']
                            }
                        ]
                    },
                    {
                        label: 'Restaurante',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Combos Personales',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/app/IndexComboPersonal']
                            },
                            {
                                label: 'Complementos',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/app/IndexComplemento']
                            },
                            {
                                label: 'Postres',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/app/IndexPostre']
                            },
                            {
                                label: 'Promociones',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/app/IndexPromocion']
                            },
                            {
                                label: 'Promociones Por Comidas',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/app/IndexPromocionPorComida']
                            },
                            {
                                label: 'Promociones Por Sucursales',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/app/IndexPromocionPorSucursal']
                            },
                            {
                                label: 'Bebidas',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/app/IndexBebidas']
                            },
                            {
                                label: 'Paquetes',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/app/IndexPaquetes']
                            },
                            {
                                label: 'Paquetes por alimento',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/app/IndexPaquetesporAlimento']
                            },
                            {
                                label: 'Sucursales',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/app/IndexSucursales']
                            }
                        ]
                    },{
                        label: 'Acceso',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Cargos',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/app/IndexCargo']
                            },
                            {
                                label: 'Usuarios',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/app/IndexUsuarios']
                            },                        
                        
                        ]
                    },
                    {
                        label: 'Crud',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/app/pages/crud']
                    },
                    {
                        label: 'Timeline',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: ['/app/pages/timeline']
                    },
                    {
                        label: 'Not Found',
                        icon: 'pi pi-fw pi-exclamation-circle',
                        routerLink: ['/app/notfound']
                    },
                    {
                        label: 'Empty',
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: ['/app/pages/empty']
                    },
                ]
            },
            {
                label: 'Hierarchy',
                items: [
                    {
                        label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
                                ]
                            },
                            {
                                label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }
                                ]
                            },
                        ]
                    },
                    {
                        label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
                                ]
                            },
                            {
                                label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
                                ]
                            },
                        ]
                    }
                ]
            },
            {
                label: 'Get Started',
                items: [
                    {
                        label: 'Documentation', icon: 'pi pi-fw pi-question', routerLink: ['/app/documentation']
                    },
                    {
                        label: 'View Source', icon: 'pi pi-fw pi-search', url: ['https://github.com/primefaces/sakai-ng'], target: '_blank'
                    }
                ]
            }
        ];
    }
    loadGraficos() {
        this.router.navigate(['/app/PrincipalGraficos'], { queryParams: { usuario: this.usuario } });
    }
}

