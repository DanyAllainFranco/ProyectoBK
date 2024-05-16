using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto_BK.DataAccess.Repository
{
    public class ScriptsBaseDeDatos
    {
        #region Departamentos
        public static string Depa_Listar = "[Gral].[SP_Departamentos_Mostrar]";
        public static string Depa_Llenar = "[Gral].[SP_Departamentos_Llenar]";
        public static string Depa_Insertar = "[Gral].[SP_Departamentos_Insertar]";
        public static string Depa_Editar = "[Gral].[SP_Departamentos_Editar]";
        public static string Depa_Eliminar = "[Gral].[SP_Departamentos_Eliminar]";
        public static string MuniDDL = "[Gral].[MunicipioDDL]";

        #endregion

        #region Clientes
        public static string Clie_Listar = "[Gral].SP_Clientes_Mostrar";
        public static string Clie_Llenar = "[Gral].SP_Clientes_Llenar";
        public static string Clie_Insertar = "[Gral].SP_Clientes_Insertar";
        public static string Clie_Editar = "[Gral].SP_Clientes_Editar";
        public static string Clie_Eliminar = "[Gral].SP_Clientes_Eliminar";
        #endregion

        #region Empleados
        public static string Empl_Listar = "[Gral].SP_Empleados_Mostrar";
        public static string Empl_Llenar = "[Gral].SP_Empleados_Llenar";
        public static string Empl_Insertar = "[Gral].SP_Empleados_Insertar";
        public static string Empl_Editar = "[Gral].SP_Empleados_Editar";
        public static string Empl_Eliminar = "[Gral].SP_Empleados_Eliminar";
        public static string EmpleadoDDL = "[Gral].EmpleadoDDL";

        #endregion

        #region Estados Civiles 
        public static string Esta_Listar = "[Gral].SP_EstadosCiviles_Mostrar";
        public static string Esta_Llenar = "[Gral].SP_EstadosCiviles_Llenar";
        public static string Esta_Insertar = "[Gral].SP_EstadosCiviles_Insertar";
        public static string Esta_Editar = "[Gral].SP_EstadosCiviles_Editar";
        public static string Esta_Eliminar = "[Gral].SP_EstadosCiviles_Eliminar"; //EstadoCivilDDL
        public static string EstadoCivilDDL = "[Gral].EstadoCivilDDL";

        #endregion

        #region Municipios
        public static string Muni_Listar = "[Gral].SP_Municipios_Mostrar";
        public static string Muni_Llenar = "[Gral].SP_Municipios_Llenar";
        public static string Muni_Insertar = "[Gral].SP_Municipios_Insertar";
        public static string Muni_Editar = "[Gral].SP_Municipios_Editar";
        public static string Muni_Eliminar = "[Gral].SP_Municipios_Eliminar";
        #endregion

        #region Alimentos
        public static string Alim_Listar = "[Rest].SP_Alimentos_Mostrar";
        public static string Alim_Llenar = "[Rest].SP_Alimentos_Llenar";
        public static string Alim_Insertar = "[Rest].SP_Alimentos_Insertar";
        public static string Alim_Editar = "[Rest].SP_Alimentos_Editar";
        public static string Alim_Eliminar = "[Rest].SP_Alimentos_Eliminar";
        #endregion

        #region Bebidas
        public static string Bebi_Listar = "[Rest].SP_Bebiidas_Mostrar";
        public static string Bebi_Llenar = "[Rest].SP_Bebiidas_Llenar";
        public static string Bebi_Insertar = "[Rest].SP_Bebiidas_Insertar";
        public static string Bebi_Editar = "[Rest].SP_Bebiidas_Editar";
        public static string Bebi_Eliminar = "[Rest].SP_Bebiidas_Eliminar";

        public static string Bebi_Autocompletar = "[Rest].[SP_BebidasDDL]";

        #endregion

        #region Combos
        public static string Combos_Autocompletado  = "[Rest].[SP_CombosDDL]";

        #endregion

        #region CombosPersonales
        public static string Comb_Listar = "[Rest].SP_Combos_Mostrar";
        public static string Comb_Llenar = "[Rest].SP_Combos_Llenar";
        public static string Comb_Insertar = "[Rest].SP_Combos_Insertar";
        public static string Comb_Editar = "[Rest].SP_Combos_Editar";
        public static string Comb_Eliminar = "[Rest].SP_Combos_Eliminar";
        #endregion

        #region Complementos
        public static string Comp_Listar = "[Rest].SP_Complementos_Mostrar";
        public static string Comp_Llenar = "[Rest].SP_Complementos_Llenar";
        public static string Comp_Insertar = "[Rest].SP_Complementos_Insertar";
        public static string Comp_Editar = "[Rest].SP_Complementos_Editar";
        public static string Comp_Eliminar = "[Rest].SP_Complementos_Eliminar";

        public static string Comp_Autocompletar = "[Rest].[SP_ComplementosDDL]";

        #endregion

        #region Paquetes
        public static string Paqe_Listar = "[Rest].[SP_Paquetes_Mostrar]";
        public static string Paqe_Llenar = "[Rest].SP_Paquetes_Llenar";
        public static string Paqe_Insertar = "[Rest].SP_Paquetes_Insertar";
        public static string Paqe_Editar = "[Rest].SP_Paquetes_Editar";
        public static string Paqe_Eliminar = "[Rest].SP_Paquetes_Eliminar";

        public static string Paqe_Autocompletar = "[Rest].[SP_PaquetesDDL]";

        #endregion

        #region Paquetes Por Comidas
        public static string PaCo_Listar = "[Rest].SP_PaquetesPorComidas_Mostrar";
        public static string PaCo_Llenar = "[Rest].SP_PaquetesPorComidas_Llenar";
        public static string PaCo_Insertar = "[Rest].SP_PaquetesPorComidas_Insertar";
        public static string PaCo_Editar = "[Rest].SP_PaquetesPorComidas_Editar";
        public static string PaCo_Eliminar = "[Rest].SP_PaquetesPorComidas_Eliminar";
        #endregion

        #region Postres
        public static string Post_Listar = "[Rest].SP_Postres_Mostrar";
        public static string Post_Llenar = "[Rest].SP_Postres_Llenar";
        public static string Post_Insertar = "[Rest].SP_Postres_Insertar";
        public static string Post_Editar = "[Rest].SP_Postres_Editar";
        public static string Post_Eliminar = "[Rest].SP_Postres_Eliminar";

        public static string Post_Autocompletar = "[Rest].[SP_PostresDDL]";

        #endregion

        #region Promociones
        public static string Prom_Listar = "[Rest].SP_Promociones_Mostrar";
        public static string Prom_Llenar = "[Rest].SP_Promociones_Llenar";
        public static string Prom_Insertar = "[Rest].SP_Promociones_Insertar";
        public static string Prom_Editar = "[Rest].SP_Promociones_Editar";
        public static string Prom_Eliminar = "[Rest].SP_Promociones_Eliminar";
        #endregion

        #region Promociones por Comidas

        public static string Dias_Mostrar = "[Gral].SP_Dias_Mostrar";
        public static string PrSe_Listar = "[Rest].SP_PromocionesPorComidas_Mostrar";
        public static string PrSe_Llenar = "[Rest].SP_PromocionesPorComidas_Llenar";
        public static string PrSe_Insertar = "[Rest].SP_PromocionesPorComidas_Insertar";
        public static string PrSe_Editar = "[Rest].SP_PromocionesPorComidas_Editar";
        public static string PrSe_Eliminar = "[Rest].SP_PromocionesPorComidas_Eliminar";

        public static string Bebi_Mostrar2 = "[Rest].SP_Bebidas_Mostrar2";
        public static string Post_Mostrar2 = "[Rest].SP_Postres_Mostrar2";
        public static string Comp_Mostrar2 = "[Rest].SP_Complementos_Mostrar2";
        public static string Sucu_Mostrar2 = "[Rest].SP_Sucursales_Mostrar2";
        public static string Alim_Mostrar2 = "[Rest].SP_Alimentos_Mostrar2";

        public static string Pali_Mostrar = "[Rest].SP_PromocionesPorAlimentos_Mostrar";
        public static string Pali_Insertar = "[Rest].SP_PromocionesPorAlimentos_Insertar";
        public static string Pali_Eliminar = "[Rest].SP_PromocionesPorAlimentos_Eliminar";


        public static string Pbeb_Mostrar = "[Rest].SP_PromocionesPorBebidas_Mostrar";
        public static string Pbeb_Insertar = "[Rest].SP_PromocionesPorBebidas_Insertar";
        public static string Pbeb_Eliminar = "[Rest].SP_PromocionesPorBebidas_Eliminar";

        public static string Ppos_Mostrar = "[Rest].SP_PromocionesPorPostres_Mostrar";
        public static string Ppos_Insertar = "[Rest].SP_PromocionesPorPostres_Insertar";
        public static string Ppos_Eliminar = "[Rest].SP_PromocionesPorPostres_Eliminar";

        public static string Pcom_Mostrar = "[Rest].SP_PromocionesPorComplementos_Mostrar";
        public static string Pcom_Insertar = "[Rest].SP_PromocionesPorComplementos_Insertar";
        public static string Pcom_Eliminar = "[Rest].SP_PromocionesPorComplementos_Eliminar";

        public static string Psucu_Mostrar = "[Rest].SP_PromocionesPorSucursales_Mostrar";
        public static string Psucu_Insertar = "[Rest].SP_PromocionesPorSucursales_Insertar";
        public static string Psucu_Eliminar = "[Rest].SP_PromocionesPorSucursales_Eliminar";
        #endregion

        #region Promociones por Sucursales
        public static string PPSu_Listar = "[Rest].[SP_PromocionesPorSucursales_Mostrar]";
        public static string PPSu_Llenar = "[Rest].SP_PromocionesPorSucursales_Llenar";
        public static string PPSu_Insertar = "[Rest].SP_PromocionesPorSucursales_Insertar";
        public static string PPSu_Editar = "[Rest].SP_PromocionesPorSucursales_Editar";
        public static string PPSu_Eliminar = "[Rest].SP_PromocionesPorSucursales_Eliminar";
        #endregion

        #region Sucursales
        public static string Sucu_Listar = "[Rest].SP_Sucursales_Mostrar";
        public static string Sucu_Llenar = "[Rest].SP_Sucursales_Llenar";
        public static string Sucu_Insertar = "[Rest].SP_Sucursales_Insertar";
        public static string Sucu_Editar = "[Rest].SP_Sucursales_Editar";
        public static string Sucu_Eliminar = "[Rest].SP_Sucursales_Eliminar";
        #endregion

        #region Cargos
        public static string Carg_Listar = "[Acce].SP_Cargos_Mostrar";
        public static string Carg_Llenar = "[Acce].SP_Cargos_Llenar";
        public static string Carg_Insertar = "[Acce].SP_Cargos_Insertar";
        public static string Carg_Editar = "[Acce].SP_Cargos_Editar";
        public static string Carg_Eliminar = "[Acce].SP_Cargos_Eliminar";
        #endregion

        #region Pantallas
        public static string Pant_Listar = "[Acce].SP_Pantallas_Mostrar";
        public static string Pant_Listar2 = "[Acce].SP_Pantallas_Mostrar2";
        public static string Pant_Llenar = "[Acce].SP_Pantallas_Llenar";
        public static string Pant_Insertar = "[Acce].SP_Pantallas_Insertar";
        public static string Pant_Editar = "[Acce].SP_Pantallas_Editar";
        public static string Pant_Eliminar = "[Acce].SP_Pantallas_Eliminar";
        #endregion

        #region Pantallas Por Roles
        public static string PaRo_Listar = "[Acce].SP_PantallasPorRoles_Mostrar";
        public static string PaRo_Llenar = "[Acce].SP_PantallasPorRoles_Llenar";
        public static string PaRo_Insertar = "[Acce].SP_PantallasPorRoles_Insertar";
        public static string PaRo_Editar = "[Acce].SP_PantallasPorRoles_Editar";
        public static string PaRo_Eliminar = "[Acce].SP_PantallasPorRoles_Eliminar";
        #endregion

        #region Roles
        public static string Role_Listar = "[Acce].SP_Roles_Mostrar";
        public static string Role_Llenar = "[Acce].SP_Roles_Llenar";
        public static string Role_Insertar = "[Acce].SP_Roles_Insertar";
        public static string Role_Editar = "[Acce].SP_Roles_Editar";
        public static string Role_Eliminar = "[Acce].SP_Roles_Eliminar";//RolesDDL
        public static string RolesDDL = "[Acce].SP_RolDDL";
        #endregion

        #region Usuarios
        public static string Usua_Listar = "[Acce].SP_Usuarios_Mostrar";
        public static string Usua_Llenar = "[Acce].SP_Usuarios_Llenar";
        public static string Usua_Insertar = "[Acce].SP_Usuarios_Insertar";
        public static string Usua_Editar = "[Acce].SP_Usuarios_Editar";
        public static string Usua_Eliminar = "[Acce].SP_Usuarios_Eliminar";
        public static string Usua_Login = "[Acce].Usuario_Login";

        #endregion

        #region Graficos
        public static string Grafi_Combos = "Rest.SP_ObtenerComboMasPedidoPorUsuario";
        public static string Grafi_Paquetes = "Rest.SP_ObtenerPaqueteMasPedidoPorUsuario";
        public static string Grafi_Alimento = "Rest.SP_ObtenerAlimentoMasPedidoPorUsuario";
        public static string Grafi_Postre = "Rest.SP_ObtenerPostreMasPedidoPorUsuario";
        public static string Grafi_AlimentoFiltro = "[Rest].[SP_ObtenerAlimentoMasPedidoPorUsuarioFiltro]";
        public static string Grafi_PostreFiltro = "[Rest].[SP_ObtenerPostreMasPedidoPorUsuarioFiltro]";
        public static string Grafi_PaquetesFiltro = "[Rest].[SP_ObtenerPaqueteMasPedidoPorUsuarioFiltro]";
        public static string Grafi_CombosFiltro = "[Rest].[SP_ObtenerComboMasPedidoPorUsuarioFiltro]";
        #endregion

        #region Factura
        public static string Factura_Mostrar = "[Rest].[SP_FacturaDetalles_Mostrar]";
        public static string Factura_Listar = "[Rest].[SP_FacturaDetalles_Listar]";
        public static string FacturaEncabezado_Insertar = "[Rest].SP_FacturaEncabezado_Insertar";
        public static string FacturaDetalle_Insertar = "[Rest].[SP_FacturaDetalle_Insertar]";
        #endregion


    }
}
