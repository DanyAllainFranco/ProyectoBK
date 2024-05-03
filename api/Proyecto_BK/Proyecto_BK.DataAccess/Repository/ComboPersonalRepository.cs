using Dapper;
using Microsoft.Data.SqlClient;
using Proyecto_BK.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace Proyecto_BK.DataAccess.Repository
{
    public partial class ComboPersonalRepository : IRepository<tbCombosPersonales>
    {
        public RequestStatus Delete(int? Comb_Id)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Comb_Id", Comb_Id);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Comb_Eliminar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Éxito" : "Error" };
            }
        }

        public tbCombosPersonales Find(int? Comb_Id)
        {
            tbCombosPersonales result = new tbCombosPersonales();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Comb_Id", Comb_Id);
                result = db.QueryFirst<tbCombosPersonales>(ScriptsBaseDeDatos.Comb_Llenar, parameter, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public tbCombosPersonales GrafiCombos(string Usua_Usuario)
        {
            tbCombosPersonales result = new tbCombosPersonales();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Usua_Usuario", Usua_Usuario);
                result = db.QueryFirst<tbCombosPersonales>(ScriptsBaseDeDatos.Grafi_Combos, parameter, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public tbCombosPersonales GrafiPostres(string Usua_Usuario)
        {
            tbCombosPersonales result = new tbCombosPersonales();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Usua_Usuario", Usua_Usuario);
                result = db.QueryFirst<tbCombosPersonales>(ScriptsBaseDeDatos.Grafi_Postre, parameter, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public tbCombosPersonales GrafiPaquetes(string Usua_Usuario)
        {
            tbCombosPersonales result = new tbCombosPersonales();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Usua_Usuario", Usua_Usuario);
                result = db.QueryFirst<tbCombosPersonales>(ScriptsBaseDeDatos.Grafi_Paquetes, parameter, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public tbCombosPersonales GrafiAlimentos(string Usua_Usuario)
        {
            tbCombosPersonales result = new tbCombosPersonales();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Usua_Usuario", Usua_Usuario);
                result = db.QueryFirst<tbCombosPersonales>(ScriptsBaseDeDatos.Grafi_Alimento, parameter, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public RequestStatus Insert(tbCombosPersonales item)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Comb_Descripcion", item.Comb_Descripcion);
                parameter.Add("Comb_Precio", item.Comb_Precio);
                parameter.Add("Comb_Imagen", item.Comb_Imagen);
                parameter.Add("Bebi_Id", item.Bebi_Id);
                parameter.Add("Post_id", item.Post_id);
                parameter.Add("Comp_Id", item.Comp_Id);
                parameter.Add("Alim_Id", item.Alim_Id);
                parameter.Add("Comb_Usua_Creacion", item.Comb_Usua_Creacion);
                parameter.Add("Comb_Fecha_Creacion", item.Comb_Fecha_Creacion);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Comb_Insertar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Éxito" : "Error" };
            }
        }

        public IEnumerable<tbCombosPersonales> List()
        {
            List<tbCombosPersonales> result = new List<tbCombosPersonales>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                result = db.Query<tbCombosPersonales>(ScriptsBaseDeDatos.Comb_Listar, commandType: CommandType.Text).ToList();
                return result;
            }
        }

        public RequestStatus Update(tbCombosPersonales item)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Comb_Id", item.Comb_Id);
                parameter.Add("Comb_Descripcion", item.Comb_Descripcion);
                parameter.Add("Comb_Precio", item.Comb_Precio);
                parameter.Add("Comb_Imagen", item.Comb_Imagen);
                parameter.Add("Bebi_Id", item.Bebi_Id);
                parameter.Add("Post_id", item.Post_id);
                parameter.Add("Comp_Id", item.Comp_Id);
                parameter.Add("Alim_Id", item.Alim_Id);
                parameter.Add("Comb_Usua_Modifica", item.Comb_Usua_Modifica);
                parameter.Add("Comb_Fecha_Modifica", item.Comb_Fecha_Modifica);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Comb_Editar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Éxito" : "Error" };
            }
        }
    }
}
