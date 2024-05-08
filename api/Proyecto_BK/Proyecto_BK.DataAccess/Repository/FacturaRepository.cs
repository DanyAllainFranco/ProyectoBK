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
    public partial class FacturaRepository : IRepository<FacturaViewModel>
    {
        public RequestStatus Delete(int? id)
        {
            throw new NotImplementedException();
        }

        public FacturaViewModel Find(int? Fact_Id)
        {
            FacturaViewModel result = new FacturaViewModel();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Fact_Id", Fact_Id);
                result = db.QueryFirst<FacturaViewModel>(ScriptsBaseDeDatos.Factura_Encontrar, parameter, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public RequestStatus Insert(FacturaViewModel item)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {

                //(Clie_Identidad, Clie_Nombre, Clie_Apellido, Clie_Sexo, Clie_Correo, Esta_Id, Muni_Codigo, Carg_Id, Clie_Usua_Creacion, Clie_Fecha_Creacion)
                var parameter = new DynamicParameters();
                parameter.Add("@Sucu_Id", item.Sucu_Id);
                parameter.Add("@Empl_Id", item.Empl_Id);
                parameter.Add("@Fact_Fecha", item.Fact_Fecha);
                parameter.Add("@Fact_Total", item.Fact_Total);
                parameter.Add("@Fact_Fecha_Creacion", item.Fact_Fecha_Creacion);
                parameter.Add("@Fact_Usua_Creacion", item.Fact_Usua_Creacion);
                parameter.Add("@Clie_Id", item.Clie_Id);
                parameter.Add("@Fact_Id", item.Fact_Id);
                parameter.Add("@Prom_Id", item.Prom_Id);
                parameter.Add("@Comb_Id", item.Comb_Id);
                parameter.Add("@Paqe_Id", item.Paqe_Id);
                parameter.Add("@Bebi_Id", item.Bebi_Id);
                parameter.Add("@Post_id", item.Post_id);
                parameter.Add("@Comp_Id", item.Comp_Id);
                parameter.Add("@Alim_Id", item.Alim_Id);
                parameter.Add("@FaDe_Cantidad", item.FaDe_Cantidad);
                parameter.Add("@FaDe_Subtotal", item.FaDe_Subtotal);
                parameter.Add("@FaDe_Usua_Creacion", item.FaDe_Usua_Creacion);
                parameter.Add("@FaDe_Fecha_Creacion", item.FaDe_Fecha_Creacion);
                parameter.Add("@Clie_Identidad", item.Clie_Identidad);
                parameter.Add("@Clie_Nombre", item.Clie_Nombre);
                parameter.Add("@Clie_Apellido", item.Clie_Apellido);
                parameter.Add("@Clie_Sexo", item.Clie_Sexo);
                parameter.Add("@Clie_Correo", item.Clie_Correo);
                parameter.Add("@Esta_Id", item.Esta_Id);
                parameter.Add("@Muni_Codigo", item.Muni_Codigo);
                parameter.Add("@Carg_Id", item.Carg_Id);
                parameter.Add("@Clie_Usua_Creacion", item.Clie_Usua_Creacion);
                parameter.Add("@Clie_Fecha_Creacion", item.Clie_Fecha_Creacion);
                var result = db.QueryFirst(ScriptsBaseDeDatos.Factura_Insertar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Exito" : "Error" };
            }
        }

        public IEnumerable<FacturaViewModel> List()
        {
            List<FacturaViewModel> result = new List<FacturaViewModel>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                result = db.Query<FacturaViewModel>(ScriptsBaseDeDatos.Factura_Listar, commandType: CommandType.Text).ToList();
                return result;
            }
        }


        public RequestStatus Update(FacturaViewModel item)
        {
            throw new NotImplementedException();
        }
    }
}
