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
    public partial class PantallaRepository : IRepository<tbPantallas>
    {
        public RequestStatus Delete(int? Pant_Id)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Pant_Id", Pant_Id);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Pant_Eliminar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Exito" : "Error" };
            }
        }

        public tbPantallas Find(int? Pant_Id)
        {
            tbPantallas result = new tbPantallas();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Pant_Id", Pant_Id);
                result = db.QueryFirst<tbPantallas>(ScriptsBaseDeDatos.Pant_Llenar, parameter, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public RequestStatus Insert(tbPantallas item)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Pant_Descripcion", item.Pant_Descripcion);
                parameter.Add("Pant_Usua_Creacion", item.Pant_Usua_Creacion);
                parameter.Add("Pant_Fecha_Creacion", item.Pant_Fecha_Creacion);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Pant_Insertar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Exito" : "Error" };
            }
        }

        public IEnumerable<tbPantallas> List()
        {
            List<tbPantallas> result = new List<tbPantallas>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                result = db.Query<tbPantallas>(ScriptsBaseDeDatos.Pant_Listar, commandType: CommandType.Text).ToList();
                return result;
            }
        }

        public RequestStatus Update(tbPantallas item)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Pant_Id", item.Pant_Id);
                parameter.Add("Pant_Descripcion", item.Pant_Descripcion);
                parameter.Add("Pant_Usua_Modifica", item.Pant_Usua_Modifica);
                parameter.Add("Pant_Fecha_Modifica", item.Pant_Fecha_Modifica);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Pant_Editar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Exito" : "Error" };
            }
        }
    }
}
