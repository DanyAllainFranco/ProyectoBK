using Dapper;
using Microsoft.Data.SqlClient;
using Proyecto_BK.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace Proyecto_BK.DataAccess.Repository
{
    public partial class BebidaRepository : IRepository<tbBebidas>
    {
        public RequestStatus Delete(int? Bebi_Id)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Bebi_Id", Bebi_Id);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Bebi_Eliminar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Éxito" : "Error" };
            }
        }

        public tbBebidas Find(int? Bebi_Id)
        {
            tbBebidas result = new tbBebidas();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Bebi_Id", Bebi_Id);
                result = db.QueryFirst<tbBebidas>(ScriptsBaseDeDatos.Bebi_Llenar, parameter, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public RequestStatus Insert(tbBebidas item)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Bebi_Descripcion", item.Bebi_Descripcion);
                parameter.Add("Bebi_Precio", item.Bebi_Precio);
                parameter.Add("Bebi_Imagen", item.Bebi_Imagen);
                parameter.Add("Bebi_Usua_Creacion", item.Bebi_Usua_Creacion);
                parameter.Add("Bebi_Fecha_Creacion", item.Bebi_Fecha_Creacion);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Bebi_Insertar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Éxito" : "Error" };
            }
        }

        public IEnumerable<tbBebidas> List()
        {
            List<tbBebidas> result = new List<tbBebidas>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                result = db.Query<tbBebidas>(ScriptsBaseDeDatos.Bebi_Listar, commandType: CommandType.Text).ToList();
                return result;
            }
        }

        public RequestStatus Update(tbBebidas item)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Bebi_Id", item.Bebi_Id);
                parameter.Add("Bebi_Descripcion", item.Bebi_Descripcion);
                parameter.Add("Bebi_Precio", item.Bebi_Precio);
                parameter.Add("Bebi_Imagen", item.Bebi_Imagen);
                parameter.Add("Bebi_Usua_Modifica", item.Bebi_Usua_Modifica);
                parameter.Add("Bebi_Fecha_Modifica", item.Bebi_Fecha_Modifica);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Bebi_Editar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Éxito" : "Error" };
            }
        }
    }
}
