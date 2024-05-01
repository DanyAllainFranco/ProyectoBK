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
    public partial class EstadoCivilRepository : IRepository<tbEstadosCiviles>
    {
        public RequestStatus Delete(int? Esta_Id)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Esta_Id", Esta_Id);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Esta_Eliminar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Éxito" : "Error" };
            }
        }

        public tbEstadosCiviles Find(int? Esta_Id)
        {
            tbEstadosCiviles result = new tbEstadosCiviles();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Esta_Id", Esta_Id);
                result = db.QueryFirst<tbEstadosCiviles>(ScriptsBaseDeDatos.Esta_Llenar, parameter, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public RequestStatus Insert(tbEstadosCiviles item)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Esta_Id", item.Esta_Id);
                parameter.Add("Esta_Descripcion", item.Esta_Descripcion);
                parameter.Add("Esta_Usua_Creacion", item.Esta_Usua_Creacion);
                parameter.Add("Esta_Fecha_Creacion", item.Esta_Fecha_Creacion);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Esta_Insertar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Exito" : "Error" };
            }
        }

        public IEnumerable<tbEstadosCiviles> List()
        {

            List<tbEstadosCiviles> result = new List<tbEstadosCiviles>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                result = db.Query<tbEstadosCiviles>(ScriptsBaseDeDatos.Esta_Listar, commandType: CommandType.Text).ToList();
                return result;
            }

        }

        public RequestStatus Update(tbEstadosCiviles item)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Esta_Id", item.Esta_Id);
                parameter.Add("Esta_Descripcion", item.Esta_Descripcion);
                parameter.Add("Esta_Usua_Modifica", item.Esta_Usua_Modifica);
                parameter.Add("Esta_Fecha_Modifica", item.Esta_Fecha_Modifica);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Esta_Editar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Exito" : "Error" };
            }
        }
    }
}
