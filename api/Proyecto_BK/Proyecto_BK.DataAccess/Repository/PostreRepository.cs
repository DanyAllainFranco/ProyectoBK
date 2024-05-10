using Dapper;
using Microsoft.Data.SqlClient;
using Proyecto_BK.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace Proyecto_BK.DataAccess.Repository
{
    public partial class PostreRepository : IRepository<tbPostres>
    {
        public RequestStatus Delete(int? Post_id)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Post_id", Post_id);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Post_Eliminar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Éxito" : "Error" };
            }
        }

        public tbPostres Find(int? Post_id)
        {
            tbPostres result = new tbPostres();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Post_id", Post_id);
                result = db.QueryFirst<tbPostres>(ScriptsBaseDeDatos.Post_Llenar, parameter, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public RequestStatus Insert(tbPostres item)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Post_Descripcion", item.Post_Descripcion);
                parameter.Add("Post_Precio", item.Post_Precio);
                parameter.Add("Post_Imagen", item.Post_Imagen);
                parameter.Add("Post_Usua_Creacion", item.Post_Usua_Creacion);
                parameter.Add("Post_Fecha_Creacion", item.Post_Fecha_Creacion);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Post_Insertar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Éxito" : "Error" };
            }
        }

        public IEnumerable<tbPostres> List()
        {
            List<tbPostres> result = new List<tbPostres>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                result = db.Query<tbPostres>(ScriptsBaseDeDatos.Post_Listar, commandType: CommandType.Text).ToList();
                return result;
            }
        }

        public IEnumerable<tbPostres> PostresDDL()
        {
            List<tbPostres> result = new List<tbPostres>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                result = db.Query<tbPostres>(ScriptsBaseDeDatos.Post_Autocompletar, commandType: CommandType.Text).ToList();
                return result;
            }
        }

        public RequestStatus Update(tbPostres item)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Post_id", item.Post_id);
                parameter.Add("Post_Descripcion", item.Post_Descripcion);
                parameter.Add("Post_Precio", item.Post_Precio);
                parameter.Add("Post_Imagen", item.Post_Imagen);
                parameter.Add("Post_Usua_Modifica", item.Post_Usua_Modifica);
                parameter.Add("Post_Fecha_Modifica", item.Post_Fecha_Modifica);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Post_Editar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Éxito" : "Error" };
            }
        }
    }
}
