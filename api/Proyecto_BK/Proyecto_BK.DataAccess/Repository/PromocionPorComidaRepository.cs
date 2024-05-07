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

        public tbPromocionesPorComidas Fill(string id)
        {

            tbPromocionesPorComidas result = new tbPromocionesPorComidas();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("PrSe_Id", id);
                result = db.QueryFirst<tbPromocionesPorComidas>(ScriptsBaseDeDatos.PrSe_Llenar, parameter, commandType: CommandType.StoredProcedure);
                return result;
            }

        }

        public tbPromocionesPorComidas Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbPromocionesPorComidas item)
        {
            string sql = ScriptsBaseDeDatos.PrSe_Insertar;

            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Prom_Id", item.Prom_Id);
                parametro.Add("Bebi_Id", item.Bebi_Id);
                parametro.Add("Post_id", item.Post_id);
                parametro.Add("Comp_Id", item.Comp_Id);
                parametro.Add("Alim_Id", item.Alim_Id);
                parametro.Add("PrSe_Usua_Creacion", item.PrSe_Usua_Creacion);
                parametro.Add("PrSe_Fecha_Creacion", item.PrSe_Fecha_Creacion);


                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "Exito" : "Error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
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
            string sql = ScriptsBaseDeDatos.PrSe_Editar;

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
                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };

            }
        }
    }
}
