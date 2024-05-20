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

        public IEnumerable<tbFactura> AlimentoMasVendio(string Usua_Usuario, string FechaInicio, string FechaFin)
        {
            IEnumerable<tbFactura> result = new List<tbFactura>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Usua_Usuario", Usua_Usuario);
                parameter.Add("FechaInicio", FechaInicio);
                parameter.Add("FechaFin", FechaFin);
                result = db.Query<tbFactura>(ScriptsBaseDeDatos.Grafi_AlimentoMasVendido, parameter, commandType: CommandType.StoredProcedure);
            }
            return result;
        }

        public IEnumerable<tbFactura> BebidaMasVendio(string Usua_Usuario, string FechaInicio, string FechaFin)
        {
            IEnumerable<tbFactura> result = new List<tbFactura>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Usua_Usuario", Usua_Usuario);
                parameter.Add("FechaInicio", FechaInicio);
                parameter.Add("FechaFin", FechaFin);
                result = db.Query<tbFactura>(ScriptsBaseDeDatos.Grafi_BebidaMasVendido, parameter, commandType: CommandType.StoredProcedure);
            }
            return result;
        }
        public IEnumerable<tbFactura> PostreMasVendio(string Usua_Usuario, string FechaInicio, string FechaFin)
        {
            IEnumerable<tbFactura> result = new List<tbFactura>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Usua_Usuario", Usua_Usuario);
                parameter.Add("FechaInicio", FechaInicio);
                parameter.Add("FechaFin", FechaFin);
                result = db.Query<tbFactura>(ScriptsBaseDeDatos.Grafi_PostreMasVendido, parameter, commandType: CommandType.StoredProcedure);
            }
            return result;
        }
        public IEnumerable<tbFactura> ComplementoMasVendio(string Usua_Usuario, string FechaInicio, string FechaFin)
        {
            IEnumerable<tbFactura> result = new List<tbFactura>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Usua_Usuario", Usua_Usuario);
                parameter.Add("FechaInicio", FechaInicio);
                parameter.Add("FechaFin", FechaFin);
                result = db.Query<tbFactura>(ScriptsBaseDeDatos.Grafi_ComplementoMasVendido, parameter, commandType: CommandType.StoredProcedure);
            }
            return result;
        }

        public IEnumerable<tbFactura> SucursalTop5(string Usua_Usuario, string FechaInicio, string FechaFin)
        {
            IEnumerable<tbFactura> result = new List<tbFactura>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Usua_Usuario", Usua_Usuario);
                parameter.Add("FechaInicio", FechaInicio);
                parameter.Add("FechaFin", FechaFin);
                result = db.Query<tbFactura>(ScriptsBaseDeDatos.Grafi_SucursalTop5, parameter, commandType: CommandType.StoredProcedure);
            }
            return result;
        }


        public IEnumerable<tbFacturaDetalle> ReporteEmpleados(int Empl_Id,string FechaInicio, string FechaFin)
        {
            IEnumerable<tbFacturaDetalle> result = new List<tbFacturaDetalle>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Empl_Id", Empl_Id);
                parameter.Add("@FechaInicio", FechaInicio);
                parameter.Add("@FechaFin", FechaFin);
                result = db.Query<tbFacturaDetalle>(ScriptsBaseDeDatos.Repor_VentasEmpleados, parameter, commandType: CommandType.StoredProcedure);
            }
            return result;
        }

        public IEnumerable<tbFacturaDetalle> ReporteEmpleadosTodos(string FechaInicio, string FechaFin)
        {
            IEnumerable<tbFacturaDetalle> result = new List<tbFacturaDetalle>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
            
                parameter.Add("@FechaInicio", FechaInicio);
                parameter.Add("@FechaFin", FechaFin);
                result = db.Query<tbFacturaDetalle>(ScriptsBaseDeDatos.Repor_VentasEmpleadosTodos, parameter, commandType: CommandType.StoredProcedure);
            }
            return result;
        }

        public IEnumerable<tbFacturaDetalle> ReporteSucursalTodos(string FechaInicio, string FechaFin)
        {
            IEnumerable<tbFacturaDetalle> result = new List<tbFacturaDetalle>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();

                parameter.Add("@FechaInicio", FechaInicio);
                parameter.Add("@FechaFin", FechaFin);
                result = db.Query<tbFacturaDetalle>(ScriptsBaseDeDatos.Repor_VentasSucursalesTodos, parameter, commandType: CommandType.StoredProcedure);
            }
            return result;
        }


        public IEnumerable<tbFacturaDetalle> ReporteProductos(string FechaInicio, string FechaFin)
        {
            IEnumerable<tbFacturaDetalle> result = new List<tbFacturaDetalle>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();

                parameter.Add("@FechaInicio", FechaInicio);
                parameter.Add("@FechaFin", FechaFin);
                result = db.Query<tbFacturaDetalle>(ScriptsBaseDeDatos.Repor_VentasProductos, parameter, commandType: CommandType.StoredProcedure);
            }
            return result;
        }

        public IEnumerable<tbFacturaDetalle> ReporteCompleto(string FechaInicio, string FechaFin)
        {
            IEnumerable<tbFacturaDetalle> result = new List<tbFacturaDetalle>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();

                parameter.Add("@FechaInicio", FechaInicio);
                parameter.Add("@FechaFin", FechaFin);
                result = db.Query<tbFacturaDetalle>(ScriptsBaseDeDatos.Repor_VentasCompleto, parameter, commandType: CommandType.StoredProcedure);
            }
            return result;
        }

        public IEnumerable<tbFacturaDetalle> ReporteIdentificador(string Sucu_Id, string FechaInicio, string FechaFin)
        {
            IEnumerable<tbFacturaDetalle> result = new List<tbFacturaDetalle>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Identificador", Sucu_Id);
                parameter.Add("@FechaInicio", FechaInicio);
                parameter.Add("@FechaFin", FechaFin);
                result = db.Query<tbFacturaDetalle>(ScriptsBaseDeDatos.Repor_VentasIdentificador, parameter, commandType: CommandType.StoredProcedure);
            }
            return result;
        }
        public IEnumerable<tbFacturaDetalle> ReporteSucursales(int Sucu_Id, string FechaInicio, string FechaFin)
        {
            IEnumerable<tbFacturaDetalle> result = new List<tbFacturaDetalle>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Sucursal_Id", Sucu_Id);
                parameter.Add("@FechaInicio", FechaInicio);
                parameter.Add("@FechaFin", FechaFin);
                result = db.Query<tbFacturaDetalle>(ScriptsBaseDeDatos.Repor_VentasSucursales, parameter, commandType: CommandType.StoredProcedure);
            }
            return result;
        }

        public IEnumerable<tbFactura> EmpleadoTop5(string Usua_Usuario, string FechaInicio, string FechaFin)
        {
            IEnumerable<tbFactura> result = new List<tbFactura>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Usua_Usuario", Usua_Usuario);
                parameter.Add("FechaInicio", FechaInicio);
                parameter.Add("FechaFin", FechaFin);
                result = db.Query<tbFactura>(ScriptsBaseDeDatos.Grafi_EmpleadosTop5, parameter, commandType: CommandType.StoredProcedure);
            }
            return result;
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
