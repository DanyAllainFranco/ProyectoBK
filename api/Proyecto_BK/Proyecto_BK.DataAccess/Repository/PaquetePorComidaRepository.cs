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
    public partial class PaquetePorComidaRepository : IRepository<tbPaquetesPorComidas>
    {
        public RequestStatus Delete(int? PaCo_Id)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("PaCo_Id", PaCo_Id);

                var result = db.QueryFirst(ScriptsBaseDeDatos.PaCo_Eliminar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Éxito" : "Error" };
            }
        }

        public tbPaquetesPorComidas Find(int? PaCo_Id)
        {
            tbPaquetesPorComidas result = new tbPaquetesPorComidas();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("PaCo_Id", PaCo_Id);
                result = db.QueryFirst<tbPaquetesPorComidas>(ScriptsBaseDeDatos.PaCo_Llenar, parameter, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public RequestStatus Insert(tbPaquetesPorComidas item)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Paqe_Id", item.Paqe_Id);
                parameter.Add("Bebi_Id", item.Bebi_Id);
                parameter.Add("Post_id", item.Post_id);
                parameter.Add("Comp_Id", item.Comp_Id);
                parameter.Add("Alim_Id", item.Alim_Id);
                parameter.Add("PaCo_Usua_Creacion", item.PaCo_Usua_Creacion);
                parameter.Add("PaCo_Fecha_Creacion", item.PaCo_Fecha_Creacion);

                var result = db.QueryFirst(ScriptsBaseDeDatos.PaCo_Insertar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Éxito" : "Error" };
            }
        }

        public IEnumerable<tbPaquetesPorComidas> List()
        {
            List<tbPaquetesPorComidas> result = new List<tbPaquetesPorComidas>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                result = db.Query<tbPaquetesPorComidas>(ScriptsBaseDeDatos.PaCo_Listar, commandType: CommandType.Text).ToList();
                return result;
            }
        }

        public RequestStatus Update(tbPaquetesPorComidas item)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("PaCo_Id", item.PaCo_Id);
                parameter.Add("Paqe_Id", item.Paqe_Id);
                parameter.Add("Bebi_Id", item.Bebi_Id);
                parameter.Add("Post_id", item.Post_id);
                parameter.Add("Comp_Id", item.Comp_Id);
                parameter.Add("Alim_Id", item.Alim_Id);
                parameter.Add("PaCo_Usua_Modifica", item.PaCo_Usua_Modifica);
                parameter.Add("PaCo_Fecha_Modifica", item.PaCo_Fecha_Modifica);

                var result = db.QueryFirst(ScriptsBaseDeDatos.PaCo_Editar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Éxito" : "Error" };
            }
        }
    }
}
