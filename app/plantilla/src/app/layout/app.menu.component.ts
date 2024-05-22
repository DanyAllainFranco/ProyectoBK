import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RolService } from '../demo/service/rol.service';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';
import { Subscription } from 'rxjs';
import { aD } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

  model: any[] = [];
  usuario: string;
  permisosPermitidos: Set<string> = new Set();
  prueba: boolean = false;
  private subscription: Subscription = new Subscription();
  constructor(
    private servicioLogin: RolService,
    private cookieService: CookieService,
    public layoutService: LayoutService,
    private router: Router
  ) { }

  ngOnInit() {
    const admin = this.cookieService.get('Usua_Admin').toString();

   
    const storedPermissions = localStorage.getItem('allowedScreens');
    console.log("PERMISOS: " + storedPermissions)
    if (storedPermissions) {
        this.permisosPermitidos = new Set(JSON.parse(storedPermissions));
    }
    console.log('ADMIN: '+ admin )
    if (admin !== 'true') {
        const roleId = Number.parseInt(this.cookieService.get('Rol_Id'));
      console.log('ENTROO: ' + roleId)
        this.subscription.add(
            this.servicioLogin.getPantallasAgregadas(roleId).subscribe(pantallasPermitidas => {
                const nombresPermitidos = new Set(
                    pantallasPermitidas
                        .map(pant => pant.pant_Descripcion ? pant.pant_Descripcion.toLowerCase().replace(/\s+/g, '') : '')
                        .filter(pantalla => pantalla !== '')
                );
                console.log("PANTLLAA: " + nombresPermitidos)
                const filtrarItems = (items) => {
                    return items
                        .map(opcion => {
                            if (opcion.items) {
                                const subItemsFiltrados = filtrarItems(opcion.items);
                                if (subItemsFiltrados.length > 0) {
                                    return { ...opcion, items: subItemsFiltrados };
                                }
                            } else if (nombresPermitidos.has(opcion.label.toLowerCase().replace(/\s+/g, ''))) {
                              console.log("DFSD: " + nombresPermitidos)
                                return opcion;
                            }
                            return null;
                        })
                        .filter(opcion => opcion !== null);
                };

                this.model = this.Menucompleto.map(section => {
                    const itemsFiltrados = filtrarItems(section.items);
                    if (itemsFiltrados.length > 0) {
                        return { ...section, items: itemsFiltrados };
                    }
                    return null;
                }).filter(section => section !== null);
                this.addInicioMenu();
            })
        );
    } else {
      this.addInicioMenu();
        this.model = this.Menucompleto;
        
    }
}



ngOnDestroy() {
    this.subscription.unsubscribe();
}

addInicioMenu() {
  const inicioMenu = {
      label: 'Inicio',
      icon: 'pi pi-fw pi-home',
      routerLink: ['/app/Inicio']
  };

  let inicioSection = this.model.find(section => section.items.some(item => item.label === 'Inicio'));
  if (!inicioSection) {
      if (this.model.length > 0) {
          this.model[0].items.unshift(inicioMenu);
      } else {
          this.model.push({ items: [inicioMenu] });
      }
  }
}

Menucompleto = [
    {
      items: [
        { label: 'Inicio', icon: 'pi pi-fw pi-home',    routerLink: ['/app/Inicio']  },
        { 
          label: 'Dashboard', 
          icon: 'pi pi-fw pi-chart-pie', 
          routerLink: ['/app/dashboard'] 
        },
        {
          label: 'Reportes',
          icon: 'pi pi-file',
          items: [
            // {
            //   label: 'Reporte Combos',
            //   icon: 'pi pi-palette',
            //   routerLink: ['/app/Index']
            // },
            {
              label: 'Reporte Empleados',
              icon: 'pi pi-file',
              routerLink: ['/app/reporteempleados']
            },
            {
              label: 'Reporte Productos',
              icon: 'pi pi-file',
              routerLink: ['/app/reporteproductos']
            },
            {
              label: 'Reporte Sucursal',
              icon: 'pi pi-file',
              routerLink: ['/app/reportesucursal']
            },
            {
              label: 'Reporte Completo',
              icon: 'pi pi-file',
              routerLink: ['/app/reportecompleto']
            },
            {
              label: 'Reporte Categoria',
              icon: 'pi pi-file',
              routerLink: ['/app/reportecategoria']
            },
          ]
        },
        {
          label: 'Acceso',
          icon: 'pi pi-key',
          items: [
            {
              label: 'Cargos',
              icon: 'pi pi-key',
              routerLink: ['/app/cargos']
            },
            {
              label: 'Usuarios',
              icon: 'pi pi-key',
              routerLink: ['/app/usuarios']
            },
            {
              label: 'Roles',
              icon: 'pi pi-key',
              routerLink: ['/app/roles']
            },
          ]
        },
        {
          label: 'Generales',
          icon: 'pi pi-fw pi-globe',
          items: [
            {
              label: 'Departamentos',
              icon: 'pi pi-fw pi-globe',
              routerLink: ['/app/departamentos']
            },
            {
              label: 'Empleados',
              icon: 'pi pi-fw pi-globe',
              routerLink: ['/app/empleados']
            },
            {
              label: 'Municipios',
              icon: 'pi pi-fw pi-globe',
              routerLink: ['/app/municipios']
            },
            {
              label: 'Estados Civiles',
              icon: 'pi pi-fw pi-globe',
              routerLink: ['/app/estadosciviles']
            },
            {
              label: 'Clientes',
              icon: 'pi pi-fw pi-globe',
              routerLink: ['/app/clientes']
            },
          ]
        },
        {
          label: 'Restaurante',
          icon: 'pi pi-shopping-bag',
          items: [
            {
              label: 'Combos',
              icon: 'pi pi-shopping-bag',
              routerLink: ['/app/combo']
            },
            {
              label: 'Alimentos',
              icon: 'pi pi-shopping-bag',
              routerLink: ['/app/alimentos']
            },
            {
              label: 'Complementos',
              icon: 'pi pi-shopping-bag',
              routerLink: ['/app/complementos']
            },
            {
              label: 'Postres',
              icon: 'pi pi-shopping-bag',
              routerLink: ['/app/postres']
            },
            {
              label: 'Bebidas',
              icon: 'pi pi-shopping-bag',
              routerLink: ['/app/bebidas']
            },
            {
              label: 'Promociones',
              icon: 'pi pi-shopping-bag',
              routerLink: ['/app/promociones']
            },
            {
              label: 'Paquetes',
              icon: 'pi pi-shopping-bag',
              routerLink: ['/app/paquetes']
            },
            {
              label: 'Sucursales',
              icon: 'pi pi-shopping-bag',
              routerLink: ['/app/sucursales']
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
              routerLink: ['/app/facturas']
            },
          ]
        },
      ],
    },
  ];

  // ngOnInit() {
  //   this.usuario = localStorage.getItem('usuario');
  //   const admin = this.cookieService.get('Usua_Admin').toString();
  //   if (admin != "true") {
  //     const roleId = Number.parseInt(this.cookieService.get('Rol_Id'));

  //     this.servicioLogin.getPantallasAgregadas(roleId).subscribe(pantallasPermitidas => {
  //       const nombresPermitidos = new Set(pantallasPermitidas.map(pant => pant.pant_Descripcion.toLowerCase().trim()));

        

  //       const filtrarSubitems = (subitems) => {
  //         return subitems.filter(opcion => {
  //           const nombreLowerCase = opcion.label.toLowerCase().trim();
  //           return nombresPermitidos.has(nombreLowerCase);
  //         });
  //       };

  //       const seccionesFiltradas = this.menuCompleto.map(section => {
  //         const itemsFiltrados = section.items.map(subSection => {
  //           if (subSection.items) {
  //             const subItemsFiltrados = filtrarSubitems(subSection.items);
  //             return {
  //               ...subSection,
  //               items: subItemsFiltrados
  //             };
  //           }
  //           return subSection;
  //         }).filter(subSection => subSection.items ? subSection.items.length > 0 : true);

  //         return {
  //           ...section,
  //           items: itemsFiltrados
  //         };
  //       });

  //       this.model = seccionesFiltradas;
  //     });
  //   } else {
  //     this.model = this.menuCompleto;
  //   }
  // }





  loadGraficos() {
    this.router.navigate(['/app/Inicio'], { queryParams: { usuario: this.usuario } });
  }

  loadGraficosFiltros() {
    this.router.navigate(['/app/FiltrosGraficos'], { queryParams: { usuario: this.usuario } });
  }
}
