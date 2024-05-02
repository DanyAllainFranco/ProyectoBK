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
    public partial class UsuarioRepository : IRepository<tbUsuarios>
    {
        public RequestStatus Delete(int? Usua_Id)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Usua_Id", Usua_Id);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Usua_Eliminar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Exito" : "Error" };
            }
        }
        public tbUsuarios Login(string Usua_Usuario, string Usua_Contra)
        {
            tbUsuarios result = new tbUsuarios();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Usua_Usuario", Usua_Usuario);
                parameter.Add("Usua_Contra", Usua_Contra);
                result = db.QueryFirst<tbUsuarios>(ScriptsBaseDeDatos.Usua_Login, parameter, commandType: CommandType.StoredProcedure);
                return result;
            }
        }
        public tbUsuarios Find(int? Usua_Id)
        {
            tbUsuarios result = new tbUsuarios();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Usua_Id", Usua_Id);
                result = db.QueryFirst<tbUsuarios>(ScriptsBaseDeDatos.Usua_Llenar, parameter, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public RequestStatus Insert(tbUsuarios item)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Usua_Usuario", item.Usua_Usuario);
                parameter.Add("Usua_Contra", item.Usua_Contra);
                parameter.Add("Usua_Admin", item.Usua_Admin);
                parameter.Add("Empl_Id", item.Empl_Id);
                parameter.Add("Rol_Id", item.Rol_Id);
                parameter.Add("Usua_Usua_Creacion", item.Usua_Usua_Creacion);
                parameter.Add("Usua_Fecha_Creacion", item.Usua_Fecha_Creacion);
                parameter.Add("Usua_Activo", item.Usua_Activo);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Usua_Insertar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Exito" : "Error" };
            }
        }

        public IEnumerable<tbUsuarios> List()
        {
            List<tbUsuarios> result = new List<tbUsuarios>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                result = db.Query<tbUsuarios>(ScriptsBaseDeDatos.Usua_Listar, commandType: CommandType.Text).ToList();
                return result;
            }
        }

        public RequestStatus Update(tbUsuarios item)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Usua_Id", item.Usua_Id);
                parameter.Add("Usua_Usuario", item.Usua_Usuario);
                parameter.Add("Usua_Contra", item.Usua_Contra);
                parameter.Add("Usua_Admin", item.Usua_Admin);
                parameter.Add("Empl_Id", item.Empl_Id);
                parameter.Add("Rol_Id", item.Rol_Id);
                parameter.Add("Usua_Usua_Modifica", item.Usua_Usua_Modifica);
                parameter.Add("Usua_Fecha_Modifica", item.Usua_Fecha_Modifica);
                parameter.Add("Usua_Activo", item.Usua_Activo);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Usua_Editar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Exito" : "Error" };
            }
        }
    }
}
