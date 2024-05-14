using Dapper;
using Microsoft.Data.SqlClient;
using Proyecto_BK.Entities;
//using Proyecto_BK.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto_BK.DataAccess.Repository
{
    public partial class PantallaPorRolRepository : IRepository<tbPantallasPorRoles>
    {
        public RequestStatus Delete(int? Paro_Id)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Paro_Id", Paro_Id);

                var result = db.QueryFirst(ScriptsBaseDeDatos.PaRo_Eliminar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Exito" : "Error" };
            }
        }

        public tbPantallasPorRoles Find(int? Paro_Id)
        {
            tbPantallasPorRoles result = new tbPantallasPorRoles();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Paro_Id", Paro_Id);
                result = db.QueryFirst<tbPantallasPorRoles>(ScriptsBaseDeDatos.PaRo_Llenar, parameter, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public RequestStatus Insert(tbPantallasPorRoles item)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Rol_Id", item.Rol_Id);
                parameter.Add("Pant_Id", item.Pant_Id);
                parameter.Add("Paro_Usua_Creacion", item.Paro_Usua_Creacion);
                parameter.Add("Paro_Fecha_Creacion", item.Paro_Fecha_Creacion);

                var result = db.QueryFirst(ScriptsBaseDeDatos.PaRo_Insertar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Exito" : "Error" };
            }
        }

        public IEnumerable<tbPantallasPorRoles> List()
        {
            List<tbPantallasPorRoles> result = new List<tbPantallasPorRoles>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                result = db.Query<tbPantallasPorRoles>(ScriptsBaseDeDatos.PaRo_Listar, commandType: CommandType.Text).ToList();
                return result;
            }
        }

        public RequestStatus Update(tbPantallasPorRoles item)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Paro_Id", item.Paro_Id);
                parameter.Add("Rol_Id", item.Rol_Id);
                parameter.Add("Pant_Id", item.Pant_Id);
                parameter.Add("Paro_Usua_Modifica", item.Paro_Usua_Modifica);
                parameter.Add("Paro_Fecha_Modifica", item.Paro_Fecha_Modifica);

                var result = db.QueryFirst(ScriptsBaseDeDatos.PaRo_Editar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Exito" : "Error" };
            }
        }
    }
}
