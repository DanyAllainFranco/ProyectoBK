using Dapper;
using Microsoft.Data.SqlClient;
using Proyecto_BK.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace Proyecto_BK.DataAccess.Repository
{
    public partial class ComplementoRepository : IRepository<tbComplementos>
    {
        public RequestStatus Delete(int? Comp_Id)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Comp_Id", Comp_Id);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Comp_Eliminar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Éxito" : "Error" };
            }
        }

        public tbComplementos Find(int? Comp_Id)
        {
            tbComplementos result = new tbComplementos();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Comp_Id", Comp_Id);
                result = db.QueryFirst<tbComplementos>(ScriptsBaseDeDatos.Comp_Llenar, parameter, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public RequestStatus Insert(tbComplementos item)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Comp_Descripcion", item.Comp_Descripcion);
                parameter.Add("Comp_Precio", item.Comp_Precio);
                parameter.Add("Comp_Imagen", item.Comp_Imagen);
                parameter.Add("Comp_Usua_Creacion", item.Comp_Usua_Creacion);
                parameter.Add("Comp_Fecha_Creacion", item.Comp_Fecha_Creacion);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Comp_Insertar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Éxito" : "Error" };
            }
        }

        public IEnumerable<tbComplementos> List()
        {
            List<tbComplementos> result = new List<tbComplementos>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                result = db.Query<tbComplementos>(ScriptsBaseDeDatos.Comp_Listar, commandType: CommandType.Text).ToList();
                return result;
            }
        }

        public RequestStatus Update(tbComplementos item)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Comp_Id", item.Comp_Id);
                parameter.Add("Comp_Descripcion", item.Comp_Descripcion);
                parameter.Add("Comp_Precio", item.Comp_Precio);
                parameter.Add("Comp_Imagen", item.Comp_Imagen);
                parameter.Add("Comp_Usua_Modifica", item.Comp_Usua_Modifica);
                parameter.Add("Comp_Fecha_Modifica", item.Comp_Fecha_Modifica);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Comp_Editar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Éxito" : "Error" };
            }
        }
    }
}
