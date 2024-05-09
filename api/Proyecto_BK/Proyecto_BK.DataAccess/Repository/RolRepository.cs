using Dapper;
using Microsoft.Data.SqlClient;
using Proyecto_BK.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto_BK.DataAccess.Repository
{
    public partial class RolRepository : IRepository<tbRoles>
    {
        public RequestStatus Delete(int? Rol_Id)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Rol_Id", Rol_Id);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Role_Eliminar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Exito" : "Error" };
            }
        }

        public tbRoles Find(int? Rol_Id)
        {
            tbRoles result = new tbRoles();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Rol_Id", Rol_Id);
                result = db.QueryFirst<tbRoles>(ScriptsBaseDeDatos.Role_Llenar, parameter, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public (RequestStatus, int) Insertar(tbRoles item)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parametro = new DynamicParameters();

                parametro.Add("Rol_Descripcion", item.Rol_Descripcion);

                parametro.Add("Rol_Usua_Creacion", 1);
                parametro.Add("Rol_Fecha_Creacion", DateTime.Now);

                parametro.Add("role_id", dbType: DbType.Int32, direction: ParameterDirection.Output);

                var result = db.Execute(ScriptsBaseDeDatos.Role_Insertar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                int proyId = 0;
                if (result > 0)
                {
                    proyId = parametro.Get<int>("role_id");
                }

                string mensaje = (result == 1) ? "Exito" : "Error";
                return (new RequestStatus { CodeStatus = result, MessageStatus = mensaje }, proyId);
            }
        }

        public RequestStatus InsertarPantallaPorRoles(tbPantallasPorRoles item)
        {
            string sql = ScriptsBaseDeDatos.PaRo_Insertar;

            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Pant_Id", item.Pant_Id);
                parametro.Add("@Rol_Id", item.Rol_Id);
                parametro.Add("@Paro_Usua_Creacion", item.Paro_Usua_Creacion);
                parametro.Add("@Paro_Fecha_Creacion", DateTime.Now);
                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);

                return new RequestStatus { CodeStatus = result, MessageStatus = "" };
            }
        }


        public IEnumerable<tbRoles> List()
        {
            List<tbRoles> result = new List<tbRoles>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                result = db.Query<tbRoles>(ScriptsBaseDeDatos.Role_Listar, commandType: CommandType.Text).ToList();
                return result;
            }
        }

        public IEnumerable<tbRoles> RolesDDL()
        {
            List<tbRoles> result = new List<tbRoles>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                result = db.Query<tbRoles>(ScriptsBaseDeDatos.RolesDDL, commandType: CommandType.Text).ToList();
                return result;
            }
        }

        public RequestStatus Update(tbRoles item)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Rol_Id", item.Rol_Id);
                parameter.Add("Rol_Descripcion", item.Rol_Descripcion);
                parameter.Add("Rol_Usua_Modifica", item.Rol_Usua_Modifica);
                parameter.Add("Rol_Fecha_Modifica", item.Rol_Fecha_Modifica);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Role_Editar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Exito" : "Error" };
            }
        }

        public RequestStatus Insert(tbRoles item)
        {
            throw new NotImplementedException();
        }
    }
}
