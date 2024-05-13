using Dapper;
using Microsoft.Data.SqlClient;
using Proyecto_BK.Entities;
using Proyecto_BK.Entities.Entities;
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
        public RequestStatus Delete(string Esta_Id)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Esta_Id", Esta_Id);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Esta_Eliminar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Exito" : "Error" };
            }
        }

        public RequestStatus Delete(int? id)
        {
            throw new NotImplementedException();
        }

        public tbEstadosCiviles Find(int id)
        {
            tbEstadosCiviles result = new tbEstadosCiviles();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Esta_Id", id);
                result = db.QueryFirst<tbEstadosCiviles>(ScriptsBaseDeDatos.Esta_Llenar, parameter, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public tbEstadosCiviles Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbEstadosCiviles item)
        {
            const string sql = "[Gral].SP_EstadosCiviles_Insertar";



            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Esta_Descripcion", item.Esta_Descripcion);
                parametro.Add("@Esta_Usua_Creacion", item.Esta_Usua_Creacion);
                parametro.Add("@Esta_Fecha_Creacion", item.Esta_Fecha_Creacion);


                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "Exito" : "Error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
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


        public IEnumerable<tbEstadosCiviles> EstadoCivilDDL()
        {

            List<tbEstadosCiviles> result = new List<tbEstadosCiviles>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                result = db.Query<tbEstadosCiviles>(ScriptsBaseDeDatos.EstadoCivilDDL, commandType: CommandType.Text).ToList();
                return result;
            }

        }

        public RequestStatus Update(tbEstadosCiviles item)
        {
            string sql = ScriptsBaseDeDatos.Esta_Editar;

            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Esta_Id", item.Esta_Id);
                parameter.Add("@Esta_Descripcion", item.Esta_Descripcion);
                parameter.Add("@Esta_Usua_Modifica", item.Esta_Usua_Modifica);
                parameter.Add("@Esta_Fecha_Modifica", item.Esta_Fecha_Modifica);

                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };

            }
        }
    }
}
