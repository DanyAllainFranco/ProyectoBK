using Dapper;
using Microsoft.Data.SqlClient;
using Proyecto_BK.Entities;
//using Proyecto_BK.Entities.Entities;
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

        public tbComplementos Fill(string id)
        {

            tbComplementos result = new tbComplementos();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Comp_Id", id);
                result = db.QueryFirst<tbComplementos>(ScriptsBaseDeDatos.Comp_Llenar, parameter, commandType: CommandType.StoredProcedure);
                return result;
            }

        }

        public IEnumerable<tbComplementos> ListComplementos3(int Paqe_Id)
        {
            List<tbComplementos> result = new List<tbComplementos>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Paqe_Id", Paqe_Id);

                result = db.Query<tbComplementos>(ScriptsBaseDeDatos.Comp_Mostrar3, parametro, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public tbComplementos Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbComplementos item)
        {
             string sql = ScriptsBaseDeDatos.Comp_Insertar;

            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Comp_Descripcion", item.Comp_Descripcion);
                parametro.Add("@Comp_Precio", item.Comp_Precio);
                parametro.Add("@Comp_Imagen", item.Comp_Imagen);
                parametro.Add("@Comp_Usua_Creacion", item.Comp_Usua_Creacion);
                parametro.Add("@Comp_Fecha_Creacion", item.Comp_Fecha_Creacion);


                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "Exito" : "Error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
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

        public IEnumerable<tbComplementos> ComplementosDDL()
        {
            List<tbComplementos> result = new List<tbComplementos>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                result = db.Query<tbComplementos>(ScriptsBaseDeDatos.Comp_Autocompletar, commandType: CommandType.Text).ToList();
                return result;
            }
        }

        public RequestStatus Update(tbComplementos item)
        {
            string sql = ScriptsBaseDeDatos.Comp_Editar;

            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Comp_Id", item.Comp_Id);
                parameter.Add("@Comp_Descripcion", item.Comp_Descripcion);
                parameter.Add("@Comp_Precio", item.Comp_Precio);
                parameter.Add("@Comp_Imagen", item.Comp_Imagen);
                parameter.Add("@Comp_Usua_Modifica", item.Comp_Usua_Modifica);
                parameter.Add("@Comp_Fecha_Modifica", item.Comp_Fecha_Modifica);
                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };

            }
        }
    }
}
