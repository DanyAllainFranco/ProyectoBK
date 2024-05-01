using Dapper;
using Microsoft.Data.SqlClient;
using Proyecto_BK.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace Proyecto_BK.DataAccess.Repository
{
    public partial class ClienteRepository : IRepository<tbClientes>
    {
        public RequestStatus Delete(int? Clie_Id)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Clie_Id", Clie_Id);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Clie_Eliminar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Éxito" : "Error" };
            }
        }

        public tbClientes Find(int? Clie_Id)
        {
            tbClientes result = new tbClientes();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Clie_Id", Clie_Id);
                result = db.QueryFirst<tbClientes>(ScriptsBaseDeDatos.Clie_Llenar, parameter, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public RequestStatus Insert(tbClientes item)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Clie_Identidad", item.Clie_Identidad);
                parameter.Add("Clie_Nombre", item.Clie_Nombre);
                parameter.Add("Clie_Apellido", item.Clie_Apellido);
                parameter.Add("Clie_Sexo", item.Clie_Sexo);
                parameter.Add("Clie_Correo", item.Clie_Correo);
                parameter.Add("Esta_Id", item.Esta_Id);
                parameter.Add("Muni_Codigo", item.Muni_Codigo);
                parameter.Add("Carg_Id", item.Carg_Id);
                parameter.Add("Clie_Usua_Creacion", item.Clie_Usua_Creacion);
                parameter.Add("Clie_Fecha_Creacion", item.Clie_Fecha_Creacion);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Clie_Insertar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Éxito" : "Error" };
            }
        }

        public IEnumerable<tbClientes> List()
        {
            List<tbClientes> result = new List<tbClientes>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                result = db.Query<tbClientes>(ScriptsBaseDeDatos.Clie_Listar, commandType: CommandType.Text).ToList();
                return result;
            }
        }

        public RequestStatus Update(tbClientes item)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Clie_Id", item.Clie_Id);
                parameter.Add("Clie_Identidad", item.Clie_Identidad);
                parameter.Add("Clie_Nombre", item.Clie_Nombre);
                parameter.Add("Clie_Apellido", item.Clie_Apellido);
                parameter.Add("Clie_Sexo", item.Clie_Sexo);
                parameter.Add("Clie_Correo", item.Clie_Correo);
                parameter.Add("Esta_Id", item.Esta_Id);
                parameter.Add("Muni_Codigo", item.Muni_Codigo);
                parameter.Add("Carg_Id", item.Carg_Id);
                parameter.Add("Clie_Usua_Modifica", item.Clie_Usua_Modifica);
                parameter.Add("Clie_Fecha_Modifica", item.Clie_Fecha_Modifica);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Clie_Editar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Éxito" : "Error" };
            }
        }
    }
}
