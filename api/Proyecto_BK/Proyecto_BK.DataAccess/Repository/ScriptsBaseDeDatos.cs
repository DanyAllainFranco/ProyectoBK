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
        #endregion

        #region Estados Civiles 
        public static string Esta_Listar = "[Gral].SP_EstadosCiviles_Mostrar";
        public static string Esta_Llenar = "[Gral].SP_EstadosCiviles_Llenar";
        public static string Esta_Insertar = "[Gral].SP_EstadosCiviles_Insertar";
        public static string Esta_Editar = "[Gral].SP_EstadosCiviles_Editar";
        public static string Esta_Eliminar = "[Gral].SP_EstadosCiviles_Eliminar";
        #endregion

        #region Municipios
        public static string Muni_Listar = "[Gral].SP_Municipios_Mostrar";
        public static string Muni_Llenar = "[Gral].SP_Municipios_Llenar";
        public static string Muni_Insertar = "[Gral].SP_Municipios_Insertar";
        public static string Muni_Editar = "[Gral].SP_Municipios_Editar";
        public static string Muni_Eliminar = "[Gral].SP_Municipios_Eliminar";
        #endregion
    }
}
