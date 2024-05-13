using Dapper;
using Microsoft.Data.SqlClient;
using Proyecto_BK.Entities;
using Proyecto_BK.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace Proyecto_BK.DataAccess.Repository
{
    public partial class PromocionPorSucursalRepository : IRepository<tbPromocionesPorSusursales>
    {
        public RequestStatus Delete(int? PPSu_Id)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("PPSu_Id", PPSu_Id);

                var result = db.QueryFirst(ScriptsBaseDeDatos.PPSu_Eliminar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Éxito" : "Error" };
            }
        }

        public tbPromocionesPorSusursales Fill(string id)
        {

            tbPromocionesPorSusursales result = new tbPromocionesPorSusursales();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("PPSu_Id", id);
                result = db.QueryFirst<tbPromocionesPorSusursales>(ScriptsBaseDeDatos.PPSu_Llenar, parameter, commandType: CommandType.StoredProcedure);
                return result;
            }

        }

        public tbPromocionesPorSusursales Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbPromocionesPorSusursales item)
        {
            string sql = ScriptsBaseDeDatos.PPSu_Insertar;

            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Prom_Id", item.Prom_Id);
                parametro.Add("Sucu_Id", item.Sucu_Id);
                parametro.Add("PPSu_Usua_Creacion", item.PPSu_Usua_Creacion);
                parametro.Add("PPSu_Fecha_Creacion", item.PPSu_Fecha_Creacion);


                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "Exito" : "Error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbPromocionesPorSusursales> List()
        {
            List<tbPromocionesPorSusursales> result = new List<tbPromocionesPorSusursales>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                result = db.Query<tbPromocionesPorSusursales>(ScriptsBaseDeDatos.PPSu_Listar, commandType: CommandType.Text).ToList();
                return result;
            }
        }

        public RequestStatus Update(tbPromocionesPorSusursales item)
        {
            string sql = ScriptsBaseDeDatos.PPSu_Editar;

            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("PPSu_Id", item.PPSu_Id);
                parameter.Add("Prom_Id", item.Prom_Id);
                parameter.Add("Sucu_Id", item.Sucu_Id);
                parameter.Add("PPSu_Usua_Modifica", item.PPSu_Usua_Modifica);
                parameter.Add("PPSu_Fecha_Modifica", item.PPSu_Fecha_Modifica);
                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };

            }
        }
    }
}
