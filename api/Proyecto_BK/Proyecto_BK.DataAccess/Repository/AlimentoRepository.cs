using Dapper;
using Microsoft.Data.SqlClient;
using Proyecto_BK.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace Proyecto_BK.DataAccess.Repository
{
    public partial class AlimentoRepository : IRepository<tbAlimentos>
    {
        public RequestStatus Delete(int? Alim_Id)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Alim_Id", Alim_Id);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Alim_Eliminar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Éxito" : "Error" };
            }
        }

        public tbAlimentos Find(int? Alim_Id)
        {
            tbAlimentos result = new tbAlimentos();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Alim_Id", Alim_Id);
                result = db.QueryFirst<tbAlimentos>(ScriptsBaseDeDatos.Alim_Llenar, parameter, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public RequestStatus Insert(tbAlimentos item)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Alim_Descripcion", item.Alim_Descripcion);
                parameter.Add("Alim_Precio", item.Alim_Precio);
                parameter.Add("Alim_Imagen", item.Alim_Imagen);
                parameter.Add("Alim_Usua_Creacion", item.Alim_Usua_Creacion);
                parameter.Add("Alim_Fecha_Creacion", item.Alim_Fecha_Creacion);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Alim_Insertar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Éxito" : "Error" };
            }
        }

        public IEnumerable<tbAlimentos> List()
        {
            List<tbAlimentos> result = new List<tbAlimentos>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                result = db.Query<tbAlimentos>(ScriptsBaseDeDatos.Alim_Listar, commandType: CommandType.Text).ToList();
                return result;
            }
        }

        public RequestStatus Update(tbAlimentos item)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Alim_Id", item.Alim_Id);
                parameter.Add("Alim_Descripcion", item.Alim_Descripcion);
                parameter.Add("Alim_Precio", item.Alim_Precio);
                parameter.Add("Alim_Imagen", item.Alim_Imagen);
                parameter.Add("Alim_Usua_Modifica", item.Alim_Usua_Modifica);
                parameter.Add("Alim_Fecha_Modifica", item.Alim_Fecha_Modifica);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Alim_Editar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Éxito" : "Error" };
            }
        }
    }
}
