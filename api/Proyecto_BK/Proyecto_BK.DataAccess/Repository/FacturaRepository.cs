using Dapper;
using Microsoft.Data.SqlClient;
using Proyecto_BK.Common.Models;
using Proyecto_BK.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto_BK.DataAccess.Repository
{
    public class FacturaRepository : IRepository<FacturaViewModel>
    {
        public RequestStatus Delete(int? id)
        {
            throw new NotImplementedException();
        }

        public FacturaViewModel Details(int? id)
        {
            throw new NotImplementedException();
        }

        public FacturaViewModel find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(FacturaViewModel item)
        {
            throw new NotImplementedException();
        }


        public RequestStatus InsertarDetalle(FacturaDetalleViewModel item)
        {
            const string sql = "[Rest].[SP_FacturaDetalle_Insertar]";

            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@FaDe_Ident", item.FaDe_Ident);
                parametro.Add("@FaDe_ProdId", item.FaDe_ProdId);
                parametro.Add("@FaDe_Cantidad", item.FaDe_Cantidad);
                parametro.Add("@FaDe_Subtotal", "200");
                parametro.Add("@Fact_Id", item.Fact_Id);
           

                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "Exito" : "Error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }
        public (RequestStatus, int) Insertar(FacturaViewModel item)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Sucu_Id", 1);
                parametro.Add("@Empl_Id", 1);
                parametro.Add("@Fact_Fecha", DateTime.Now);
                parametro.Add("@Fact_Total", "100");
                parametro.Add("@Fact_Total", item.Fact_Total);
                parametro.Add("@Fact_Usua_Creacion", 1);
                parametro.Add("@Fact_Fecha_Creacion", DateTime.Now);
                parametro.Add("@Clie_Identidad", item.Clie_Identidad);
                parametro.Add("@Clie_Nombre", item.Clie_Nombre);
                parametro.Add("@Fact_Id", dbType:DbType.Int32,direction:ParameterDirection.Output);
                var result = db.Execute(ScriptsBaseDeDatos.FacturaEncabezado_Insertar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );
                int Fact_Id = parametro.Get<int>("Fact_Id");
                string mensaje = (result == 1) ? "Exito" : "Error";

                return (new RequestStatus { CodeStatus = result, MessageStatus = mensaje }, Fact_Id);
            }
        }

        public IEnumerable<FacturaViewModel> ListaDetalles(int Fact_Id)
        {
            const string sql = "[Rest].[SP_FacturaDetalles_Mostrar]";

            var parameters = new { Fact_Id = Fact_Id };
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                return db.Query<FacturaViewModel>(sql, parameters, commandType: CommandType.StoredProcedure).ToList();
            }
        }

        public IEnumerable<FacturaViewModel> List()
        {
            const string sql = "Rest.SP_FacturaEncabezado_Listar";

            List<FacturaViewModel> result = new List<FacturaViewModel>();

            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                result = db.Query<FacturaViewModel>(sql, commandType: CommandType.Text).ToList();

                return result;
            }
        }

        public RequestStatus Update(FacturaViewModel item)
        {
            throw new NotImplementedException();
        }

        public FacturaViewModel Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Delete(string Fact_Id, string Prod_Nombre, int dif)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Fact_Id", Fact_Id);
                parameter.Add("Prod_Nombre", Prod_Nombre);
                var result = db.QueryFirst(ScriptsBaseDeDatos.Eliminar, parameter, commandType: CommandType.StoredProcedure);

                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Exito" : "Error" };
            }
        }
    }
}
