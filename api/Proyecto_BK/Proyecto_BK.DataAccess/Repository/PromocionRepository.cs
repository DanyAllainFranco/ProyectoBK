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

        public tbPromociones Fill(string id)
        {

            tbPromociones result = new tbPromociones();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Prom_Id", id);
                result = db.QueryFirst<tbPromociones>(ScriptsBaseDeDatos.Prom_Llenar, parameter, commandType: CommandType.StoredProcedure);
                return result;
            }

        }

        public tbPromociones Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbPromociones item)
        {
            string sql = ScriptsBaseDeDatos.Prom_Insertar;

            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
      
                parametro.Add("@Prom_Descripcion", item.Prom_Descripcion);
                parametro.Add("@Prom_Precio", item.Prom_Precio);
                parametro.Add("@Prom_Imagen", item.Prom_Imagen);
                parametro.Add("@Prom_Dia", item.Prom_Dia);
                parametro.Add("@Prom_Usua_Creacion", item.Prom_Usua_Creacion);
                parametro.Add("@Prom_Fecha_Creacion", item.Prom_Fecha_Creacion);


                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "Exito" : "Error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
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
            string sql = ScriptsBaseDeDatos.Prom_Editar;

            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Prom_Id", item.Prom_Id);
                parameter.Add("@Prom_Descripcion", item.Prom_Descripcion);
                parameter.Add("@Prom_Precio", item.Prom_Precio);
                parameter.Add("@Prom_Imagen", item.Prom_Imagen);
                parameter.Add("@Prom_Dia", item.Prom_Dia);
                parameter.Add("@Prom_Usua_Modifica", item.Prom_Usua_Modifica);
                parameter.Add("@Prom_Fecha_Modifica", item.Prom_Fecha_Modifica);
                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };

            }
        }
    }
}
