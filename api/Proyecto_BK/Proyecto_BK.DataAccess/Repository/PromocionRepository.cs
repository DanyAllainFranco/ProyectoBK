using Dapper;
using Microsoft.Data.SqlClient;
using Proyecto_BK.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace Proyecto_BK.DataAccess.Repository
{
    public partial class PromocionRepository : IRepository<tbPromociones>
    {
        public RequestStatus Delete(int? Prom_Id)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Prom_Id", Prom_Id);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Prom_Eliminar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Éxito" : "Error" };
            }
        }

        public tbPromociones Find(int? Prom_Id)
        {
            tbPromociones result = new tbPromociones();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Prom_Id", Prom_Id);
                result = db.QueryFirst<tbPromociones>(ScriptsBaseDeDatos.Prom_Llenar, parameter, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public RequestStatus Insert(tbPromociones item)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Prom_Descripcion", item.Prom_Descripcion);
                parameter.Add("Prom_Precio", item.Prom_Precio);
                parameter.Add("Prom_Imagen", item.Prom_Imagen);
                parameter.Add("Prom_Dia", item.Prom_Dia);
                parameter.Add("Prom_Usua_Creacion", item.Prom_Usua_Creacion);
                parameter.Add("Prom_Fecha_Creacion", item.Prom_Fecha_Creacion);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Prom_Insertar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Éxito" : "Error" };
            }
        }

        public IEnumerable<tbPromociones> List()
        {
            List<tbPromociones> result = new List<tbPromociones>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                result = db.Query<tbPromociones>(ScriptsBaseDeDatos.Prom_Listar, commandType: CommandType.Text).ToList();
                return result;
            }
        }

        public RequestStatus Update(tbPromociones item)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Prom_Id", item.Prom_Id);
                parameter.Add("Prom_Descripcion", item.Prom_Descripcion);
                parameter.Add("Prom_Precio", item.Prom_Precio);
                parameter.Add("Prom_Imagen", item.Prom_Imagen);
                parameter.Add("Prom_Dia", item.Prom_Dia);
                parameter.Add("Prom_Usua_Modifica", item.Prom_Usua_Modifica);
                parameter.Add("Prom_Fecha_Modifica", item.Prom_Fecha_Modifica);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Prom_Editar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Éxito" : "Error" };
            }
        }
    }
}
