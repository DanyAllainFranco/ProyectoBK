using Dapper;
using Microsoft.Data.SqlClient;
using Proyecto_BK.Entities;
//using Proyecto_BK.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto_BK.DataAccess.Repository
{
    public partial class EmpleadoRepository : IRepository<tbEmpleados>
    {
        public RequestStatus Delete(int? Empl_Id)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Empl_Id", Empl_Id);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Empl_Eliminar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Exito" : "Error" };
            }
        }

        public tbEmpleados Fill(int id)
        {

            tbEmpleados result = new tbEmpleados();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Empl_Id", id);
                result = db.QueryFirst<tbEmpleados>(ScriptsBaseDeDatos.Empl_Llenar, parameter, commandType: CommandType.StoredProcedure);
                return result;
            }

        }

        public tbEmpleados Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbEmpleados item)
        {
            const string sql = "[Gral].SP_Empleados_Insertar";



            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parametro = new DynamicParameters();

                parametro.Add("@Empl_Identidad", item.Empl_Identidad);
                parametro.Add("@Empl_Nombre", item.Empl_Nombre);
                parametro.Add("@Empl_Apellido", item.Empl_Apellido);
                parametro.Add("@Empl_Sexo", item.Empl_Sexo);
                parametro.Add("@Empl_Correo", item.Empl_Correo);
                parametro.Add("@Esta_Id", item.Esta_Id);
                parametro.Add("@Muni_Codigo", item.Muni_Codigo);
                parametro.Add("@Carg_Id", item.Carg_Id);
                parametro.Add("@Empl_Usua_Creacion", item.Empl_Usua_Creacion);
                parametro.Add("@Empl_Fecha_Creacion", item.Empl_Fecha_Creacion);

                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "Exito" : "Error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbEmpleados> List()
        {

            List<tbEmpleados> result = new List<tbEmpleados>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                result = db.Query<tbEmpleados>(ScriptsBaseDeDatos.Empl_Listar, commandType: CommandType.Text).ToList();
                return result;
            }

        }

        public IEnumerable<tbEmpleados> EmpleadoDDL()
        {

            List<tbEmpleados> result = new List<tbEmpleados>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                result = db.Query<tbEmpleados>(ScriptsBaseDeDatos.EmpleadoDDL, commandType: CommandType.Text).ToList();
                return result;
            }

        }

        public RequestStatus Update(tbEmpleados item)
        {
            string sql = ScriptsBaseDeDatos.Empl_Editar;

            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Empl_Id", item.Empl_Id);
                parameter.Add("@Empl_Identidad", item.Empl_Identidad);
                parameter.Add("@Empl_Nombre", item.Empl_Nombre);
                parameter.Add("@Empl_Apellido", item.Empl_Apellido);
                parameter.Add("@Empl_Sexo", item.Empl_Sexo);
                parameter.Add("@Empl_Correo", item.Empl_Correo);
                parameter.Add("@Esta_Id", item.Esta_Id);
                parameter.Add("@Muni_Codigo", item.Muni_Codigo);
                parameter.Add("@Carg_Id", item.Carg_Id);
                parameter.Add("@Empl_Usua_Modifica", item.Empl_Usua_Modifica);
                parameter.Add("@Empl_Fecha_Modifica", item.Empl_Fecha_Modifica);
                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };

            }
        }
    }
}
