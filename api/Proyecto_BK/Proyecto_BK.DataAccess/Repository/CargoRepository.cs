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
    public partial class CargoRepository : IRepository<tbCargos>
    {
        public RequestStatus Delete(int? Carg_Id)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Carg_Id", Carg_Id);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Carg_Eliminar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Exito" : "Error" };
            }
        }

        public tbCargos Find(int? Carg_Id)
        {
            tbCargos result = new tbCargos();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Carg_Id", Carg_Id);
                result = db.QueryFirst<tbCargos>(ScriptsBaseDeDatos.Carg_Llenar, parameter, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public RequestStatus Insert(tbCargos item)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Carg_Descripcion", item.Carg_Descripcion);
                parameter.Add("Carg_Usua_Creacion", item.Carg_Usua_Creacion);
                parameter.Add("Carg_Fecha_Creacion", item.Carg_Fecha_Creacion);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Carg_Insertar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Exito" : "Error" };
            }
        }

        public IEnumerable<tbCargos> List()
        {
            List<tbCargos> result = new List<tbCargos>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                result = db.Query<tbCargos>(ScriptsBaseDeDatos.Carg_Listar, commandType: CommandType.Text).ToList();
                return result;
            }
        }

        public RequestStatus Update(tbCargos item)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Carg_Id", item.Carg_Id);
                parameter.Add("Carg_Descripcion", item.Carg_Descripcion);
                parameter.Add("Carg_Usua_Modifica", item.Carg_Usua_Modifica);
                parameter.Add("Carg_Fecha_Modifica", item.Carg_Fecha_Modifica);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Carg_Editar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Exito" : "Error" };
            }
        }
    }
}
