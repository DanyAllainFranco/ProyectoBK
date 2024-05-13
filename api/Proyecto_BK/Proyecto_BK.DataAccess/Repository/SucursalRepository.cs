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
    public partial class SucursalRepository : IRepository<tbSucursales>
    {
        public RequestStatus Delete(int? Sucu_Id)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Sucu_Id", Sucu_Id);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Sucu_Eliminar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Éxito" : "Error" };
            }
        }

        public tbSucursales Find(int? Sucu_Id)
        {
            tbSucursales result = new tbSucursales();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Sucu_Id", Sucu_Id);
                result = db.QueryFirst<tbSucursales>(ScriptsBaseDeDatos.Sucu_Llenar, parameter, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public RequestStatus Insert(tbSucursales item)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Sucu_Descripcion", item.Sucu_Descripcion);
                parameter.Add("Muni_Codigo", item.Muni_Codigo);
                parameter.Add("Empl_Id", item.Empl_Id);
                parameter.Add("Sucu_Usua_Creacion", item.Sucu_Usua_Creacion);
                parameter.Add("Sucu_Fecha_Creacion", item.Sucu_Fecha_Creacion);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Sucu_Insertar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Éxito" : "Error" };
            }
        }

        public IEnumerable<tbSucursales> List()
        {
            List<tbSucursales> result = new List<tbSucursales>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                result = db.Query<tbSucursales>(ScriptsBaseDeDatos.Sucu_Listar, commandType: CommandType.Text).ToList();
                return result;
            }
        }

        public RequestStatus Update(tbSucursales item)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Sucu_Id", item.Sucu_Id);
                parameter.Add("Sucu_Descripcion", item.Sucu_Descripcion);
                parameter.Add("Muni_Codigo", item.Muni_Codigo);
                parameter.Add("Empl_Id", item.Empl_Id);
                parameter.Add("Sucu_Usua_Modifica", item.Sucu_Usua_Modifica);
                parameter.Add("Sucu_Fecha_Modifica", item.Sucu_Fecha_Modifica);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Sucu_Editar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Éxito" : "Error" };
            }
        }
    }
}
