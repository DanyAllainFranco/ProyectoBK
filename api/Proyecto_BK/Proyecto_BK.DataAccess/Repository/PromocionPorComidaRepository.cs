using Dapper;
using Microsoft.Data.SqlClient;
using Proyecto_BK.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace Proyecto_BK.DataAccess.Repository
{
    public partial class PromocionPorComidaRepository : IRepository<tbPromocionesPorComidas>
    {
        public RequestStatus Delete(int? PrSe_Id)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("PrSe_Id", PrSe_Id);

                var result = db.QueryFirst(ScriptsBaseDeDatos.PrSe_Eliminar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Éxito" : "Error" };
            }
        }

        public tbPromocionesPorComidas Find(int? PrSe_Id)
        {
            tbPromocionesPorComidas result = new tbPromocionesPorComidas();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("PrSe_Id", PrSe_Id);
                result = db.QueryFirst<tbPromocionesPorComidas>(ScriptsBaseDeDatos.PrSe_Llenar, parameter, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public RequestStatus Insert(tbPromocionesPorComidas item)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Prom_Id", item.Prom_Id);
                parameter.Add("Bebi_Id", item.Bebi_Id);
                parameter.Add("Post_id", item.Post_id);
                parameter.Add("Comp_Id", item.Comp_Id);
                parameter.Add("Alim_Id", item.Alim_Id);
                parameter.Add("PrSe_Usua_Creacion", item.PrSe_Usua_Creacion);
                parameter.Add("PrSe_Fecha_Creacion", item.PrSe_Fecha_Creacion);

                var result = db.QueryFirst(ScriptsBaseDeDatos.PrSe_Insertar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Éxito" : "Error" };
            }
        }

        public IEnumerable<tbPromocionesPorComidas> List()
        {
            List<tbPromocionesPorComidas> result = new List<tbPromocionesPorComidas>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                result = db.Query<tbPromocionesPorComidas>(ScriptsBaseDeDatos.PrSe_Listar, commandType: CommandType.Text).ToList();
                return result;
            }
        }

        public RequestStatus Update(tbPromocionesPorComidas item)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("PrSe_Id", item.PrSe_Id);
                parameter.Add("Prom_Id", item.Prom_Id);
                parameter.Add("Bebi_Id", item.Bebi_Id);
                parameter.Add("Post_id", item.Post_id);
                parameter.Add("Comp_Id", item.Comp_Id);
                parameter.Add("Alim_Id", item.Alim_Id);
                parameter.Add("PrSe_Usua_Modifica", item.PrSe_Usua_Modifica);
                parameter.Add("PrSe_Fecha_Modifica", item.PrSe_Fecha_Modifica);

                var result = db.QueryFirst(ScriptsBaseDeDatos.PrSe_Editar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Éxito" : "Error" };
            }
        }
    }
}
