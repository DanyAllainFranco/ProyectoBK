using Dapper;
using Microsoft.Data.SqlClient;
using Proyecto_BK.Entities;
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

        public tbEmpleados Find(int? Empl_Id)
        {
            tbEmpleados result = new tbEmpleados();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Empl_Id", Empl_Id);
                result = db.QueryFirst<tbEmpleados>(ScriptsBaseDeDatos.Empl_Llenar, parameter, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public RequestStatus Insert(tbEmpleados item)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Empl_Identidad", item.Empl_Identidad);
                parameter.Add("Empl_Nombre", item.Empl_Nombre);
                parameter.Add("Empl_Apellido", item.Empl_Apellido);
                parameter.Add("Empl_Sexo", item.Empl_Sexo);
                parameter.Add("Empl_Correo", item.Empl_Correo);
                parameter.Add("Esta_Id", item.Esta_Id);
                parameter.Add("Muni_Codigo", item.Muni_Codigo);
                parameter.Add("Carg_Id", item.Carg_Id);
                parameter.Add("Empl_Usua_Creacion", item.Empl_Usua_Creacion);
                parameter.Add("Empl_Fecha_Creacion", item.Empl_Fecha_Creacion);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Empl_Insertar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Exito" : "Error" };
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

        public RequestStatus Update(tbEmpleados item)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Empl_Id", item.Empl_Id);
                parameter.Add("Empl_Identidad", item.Empl_Identidad);
                parameter.Add("Empl_Nombre", item.Empl_Nombre);
                parameter.Add("Empl_Apellido", item.Empl_Apellido);
                parameter.Add("Empl_Sexo", item.Empl_Sexo);
                parameter.Add("Empl_Correo", item.Empl_Correo);
                parameter.Add("Esta_Id", item.Esta_Id);
                parameter.Add("Muni_Codigo", item.Muni_Codigo);
                parameter.Add("Carg_Id", item.Carg_Id);
                parameter.Add("Empl_Usua_Modifica", item.Empl_Usua_Modifica);
                parameter.Add("Empl_Fecha_Modifica", item.Empl_Fecha_Modifica);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Empl_Editar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Exito" : "Error" };
            }
        }
    }
}
