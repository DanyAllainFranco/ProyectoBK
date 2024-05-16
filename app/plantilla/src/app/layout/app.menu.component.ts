import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RolService } from '../demo/service/rol.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

  model: any[] = [];
  usuario: string;
  permisosPermitidos: Set<string> = new Set();
  prueba: boolean = false;

  constructor(
    private servicioLogin: RolService,
    private cookieService: CookieService,
    public layoutService: LayoutService,
    private router: Router
  ) { }

  menuCompleto = [
    {
      items: [
        { label: 'Graficos', icon: 'pi pi-fw pi-chart-bar', command: () => this.loadGraficos() },
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
        {
          label: 'Generales',
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
              label: 'Combo',
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
              label: 'Paquetes',
              icon: 'pi pi-users',
              routerLink: ['/app/IndexPaquetes']
            },
            {
              label: 'Sucursales',
              icon: 'pi pi-building',
              routerLink: ['/app/IndexSucursales']
            }
          ]
        },
        {
          label: 'Ventas',
          icon: 'pi pi-key',
          items: [
            {
              label: 'Facturas',
              icon: 'pi pi pi-fw pi-key',
              routerLink: ['/app/IndexFactura/']
            },
          ]
        },
      ],
    },
  ];

  ngOnInit() {
    this.usuario = localStorage.getItem('usuario');
    const admin = this.cookieService.get('Usua_Admin').toString();
    if (admin != "true") {
      const roleId = Number.parseInt(this.cookieService.get('Rol_Id'));

      this.servicioLogin.getPantallasAgregadas(roleId).subscribe(pantallasPermitidas => {
        const nombresPermitidos = new Set(pantallasPermitidas.map(pant => pant.pant_Descripcion.toLowerCase().trim()));

        const filtrarSubitems = (subitems) => {
          return subitems.filter(opcion => {
            const nombreLowerCase = opcion.label.toLowerCase().trim();
            return nombresPermitidos.has(nombreLowerCase);
          });
        };

        const seccionesFiltradas = this.menuCompleto.map(section => {
          const itemsFiltrados = section.items.map(subSection => {
            if (subSection.items) {
              const subItemsFiltrados = filtrarSubitems(subSection.items);
              return {
                ...subSection,
                items: subItemsFiltrados
              };
            }
            return subSection;
          }).filter(subSection => subSection.items ? subSection.items.length > 0 : true);

          return {
            ...section,
            items: itemsFiltrados
          };
        });

        // Mantener siempre los elementos "Graficos" y "Reportes"
        const graficosYReportes = this.menuCompleto[0].items.filter(item =>
          item.label.toLowerCase() === 'graficos' || item.label.toLowerCase() === 'reportes'
        );

        // Verificar si ya están presentes antes de agregar
        graficosYReportes.forEach(grItem => {
          if (!seccionesFiltradas[0].items.some(item => item.label.toLowerCase() === grItem.label.toLowerCase())) {
            seccionesFiltradas[0].items.unshift(grItem);
          }
        });

        this.model = seccionesFiltradas;
      });
    } else {
      this.model = this.menuCompleto;
    }
  }

  loadGraficos() {
    this.router.navigate(['/app/PrincipalGraficos'], { queryParams: { usuario: this.usuario } });
  }

  loadGraficosFiltros() {
    this.router.navigate(['/app/FiltrosGraficos'], { queryParams: { usuario: this.usuario } });
  }
}
