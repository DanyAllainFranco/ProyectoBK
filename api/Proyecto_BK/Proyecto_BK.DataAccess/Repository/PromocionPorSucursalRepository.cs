using Dapper;
using Microsoft.Data.SqlClient;
using Proyecto_BK.Entities;
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

        public tbPromocionesPorSusursales Find(int? PPSu_Id)
        {
            tbPromocionesPorSusursales result = new tbPromocionesPorSusursales();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("PPSu_Id", PPSu_Id);
                result = db.QueryFirst<tbPromocionesPorSusursales>(ScriptsBaseDeDatos.PPSu_Llenar, parameter, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public RequestStatus Insert(tbPromocionesPorSusursales item)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Prom_Id", item.Prom_Id);
                parameter.Add("Sucu_Id", item.Sucu_Id);
                parameter.Add("PPSu_Usua_Creacion", item.PPSu_Usua_Creacion);
                parameter.Add("PPSu_Fecha_Creacion", item.PPSu_Fecha_Creacion);

                var result = db.QueryFirst(ScriptsBaseDeDatos.PPSu_Insertar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Éxito" : "Error" };
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
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("PPSu_Id", item.PPSu_Id);
                parameter.Add("Prom_Id", item.Prom_Id);
                parameter.Add("Sucu_Id", item.Sucu_Id);
                parameter.Add("PPSu_Usua_Modifica", item.PPSu_Usua_Modifica);
                parameter.Add("PPSu_Fecha_Modifica", item.PPSu_Fecha_Modifica);

                var result = db.QueryFirst(ScriptsBaseDeDatos.PPSu_Editar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Éxito" : "Error" };
            }
        }
    }
}
