using Dapper;
using Microsoft.Data.SqlClient;
using Proyecto_BK.Entities;
//using Proyecto_BK.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace Proyecto_BK.DataAccess.Repository
{
    public partial class PaqueteRepository : IRepository<tbPaquetes>
    {
        public RequestStatus Delete(int? Paqe_Id)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Paqe_Id", Paqe_Id);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Paqe_Eliminar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Éxito" : "Error" };
            }
        }

        public tbPaquetes Find(int? Paqe_Id)
        {
            tbPaquetes result = new tbPaquetes();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Paqe_Id", Paqe_Id);
                result = db.QueryFirst<tbPaquetes>(ScriptsBaseDeDatos.Paqe_Llenar, parameter, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public (RequestStatus, int) Insertar(tbPaquetes item)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Paqe_Descripcion", item.Paqe_Descripcion);
                parameter.Add("Paqe_Precio", item.Paqe_Precio);
                parameter.Add("Paqe_Imagen", item.Paqe_Imagen);
                parameter.Add("Paqe_Usua_Creacion", item.Paqe_Usua_Creacion);
                parameter.Add("Paqe_Fecha_Creacion", item.Paqe_Fecha_Creacion);
                parameter.Add("Paqe_Id", dbType: DbType.Int32, direction: ParameterDirection.Output);

                var result = db.Execute(ScriptsBaseDeDatos.Paqe_Insertar,
                 parameter,
                  commandType: CommandType.StoredProcedure
                 );

                int proyId = 0;
                if (result > 0)
                {
                    proyId = parameter.Get<int>("Paqe_Id");
                }

                string mensaje = (result == 1) ? "Exito" : "Error";
                return (new RequestStatus { CodeStatus = result, MessageStatus = mensaje }, proyId);
            }
        }

        public IEnumerable<tbPaquetes> List()
        {
            List<tbPaquetes> result = new List<tbPaquetes>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                result = db.Query<tbPaquetes>(ScriptsBaseDeDatos.Paqe_Listar, commandType: CommandType.Text).ToList();
                return result;
            }
        }

        public IEnumerable<tbPaquetes> PaqueteDDL()
        {
            List<tbPaquetes> result = new List<tbPaquetes>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                result = db.Query<tbPaquetes>(ScriptsBaseDeDatos.Paqe_Autocompletar, commandType: CommandType.Text).ToList();
                return result;
            }
        }
        public RequestStatus Update(tbPaquetes item)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Paqe_Id", item.Paqe_Id);
                parameter.Add("Paqe_Descripcion", item.Paqe_Descripcion);
                parameter.Add("Paqe_Precio", item.Paqe_Precio);
                parameter.Add("Paqe_Imagen", item.Paqe_Imagen);
                parameter.Add("Paqe_Usua_Modifica", item.Paqe_Usua_Modifica);
                parameter.Add("Paqe_Fecha_Modifica", item.Paqe_Fecha_Modifica);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Paqe_Editar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Éxito" : "Error" };
            }
        }

        RequestStatus IRepository<tbPaquetes>.Insert(tbPaquetes item)
        {
            throw new NotImplementedException();
        }
    }
}
