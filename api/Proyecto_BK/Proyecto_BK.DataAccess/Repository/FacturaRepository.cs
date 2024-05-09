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
                parametro.Add("@Sucu_Id", item.Sucu_Id);
                parametro.Add("@Empl_Id", item.Empl_Id);
                parametro.Add("@Fact_Fecha", DateTime.Now);
                parametro.Add("@Fact_Total", item.Fact_Total);
                parametro.Add("@Fact_Usua_Creacion", 1);
                parametro.Add("@Fact_Fecha_Creacion", DateTime.Now);
                parametro.Add("@Clie_Identidad",item.Clie_Identidad);
                parametro.Add("@Clie_Nombre", item.Clie_Nombre);
                parametro.Add("@Clie_Apellido", "N/D");
                parametro.Add("@Clie_Sexo", "N");
                parametro.Add("@Clie_Correo", "N/D");
                parametro.Add("@Esta_Id", 6);
                parametro.Add("@Muni_Codigo", "0501");
                parametro.Add("@Carg_Id", 1);
                parametro.Add("@Clie_Usua_Creacion",1);
                parametro.Add("@Clie_Fecha_Creacion", DateTime.Now);
                parametro.Add("ID", dbType: DbType.Int32, direction: ParameterDirection.Output);

                var result = db.Execute(ScriptsBaseDeDatos.FacturaEncabezado_Insertar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );
                int Fact_Id = parametro.Get<int>("ID");
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
    }
}
