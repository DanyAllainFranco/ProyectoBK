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


        public tbCombosPersonales Fill(string id)
        {

            tbCombosPersonales result = new tbCombosPersonales();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Comb_Id", id);
                result = db.QueryFirst<tbCombosPersonales>(ScriptsBaseDeDatos.Comb_Llenar, parameter, commandType: CommandType.StoredProcedure);
                return result;
            }

        }

        public IEnumerable<tbCombosPersonales> GrafiCombos(string Usua_Usuario)
        {
            IEnumerable<tbCombosPersonales> result = new List<tbCombosPersonales>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Usua_Usuario", Usua_Usuario);
                result = db.Query<tbCombosPersonales>(ScriptsBaseDeDatos.Grafi_Combos, parameter, commandType: CommandType.StoredProcedure);
            }
            return result;
        }

        public IEnumerable<tbCombosPersonales> GrafiPostres(string Usua_Usuario)
        {
            IEnumerable<tbCombosPersonales> result = new List<tbCombosPersonales>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Usua_Usuario", Usua_Usuario);
                result = db.Query<tbCombosPersonales>(ScriptsBaseDeDatos.Grafi_Postre, parameter, commandType: CommandType.StoredProcedure);
            }
            return result;
        }

        public IEnumerable<tbCombosPersonales> GrafiPaquetes(string Usua_Usuario)
        {
            IEnumerable<tbCombosPersonales> result = new List<tbCombosPersonales>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Usua_Usuario", Usua_Usuario);
                result = db.Query<tbCombosPersonales>(ScriptsBaseDeDatos.Grafi_Paquetes, parameter, commandType: CommandType.StoredProcedure);
            }
            return result;
        }


        public IEnumerable<tbCombosPersonales> GrafiAlimentos(string Usua_Usuario)
        {
            IEnumerable<tbCombosPersonales> result = new List<tbCombosPersonales>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Usua_Usuario", Usua_Usuario);
                result = db.Query<tbCombosPersonales>(ScriptsBaseDeDatos.Grafi_Alimento, parameter, commandType: CommandType.StoredProcedure);
            }
            return result;
        }
        public IEnumerable<tbCombosPersonales> GrafiAlimentosFiltro(string Usua_Usuario, string FechaInicio, string FechaFin)
        {
            IEnumerable<tbCombosPersonales> result = new List<tbCombosPersonales>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Usua_Usuario", Usua_Usuario);
                parameter.Add("FechaInicio", FechaInicio);
                parameter.Add("FechaFin", FechaFin);
                result = db.Query<tbCombosPersonales>(ScriptsBaseDeDatos.Grafi_AlimentoFiltro, parameter, commandType: CommandType.StoredProcedure);
            }
            return result;
        }
        public IEnumerable<tbCombosPersonales> GrafiPostreFiltro(string Usua_Usuario, string FechaInicio, string FechaFin)
        {
            IEnumerable<tbCombosPersonales> result = new List<tbCombosPersonales>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Usua_Usuario", Usua_Usuario);
                parameter.Add("FechaInicio", FechaInicio);
                parameter.Add("FechaFin", FechaFin);
                result = db.Query<tbCombosPersonales>(ScriptsBaseDeDatos.Grafi_PostreFiltro, parameter, commandType: CommandType.StoredProcedure);
            }
            return result;
        }

        public IEnumerable<tbCombosPersonales> GrafiComboFiltro(string Usua_Usuario, string FechaInicio, string FechaFin)
        {
            IEnumerable<tbCombosPersonales> result = new List<tbCombosPersonales>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Usua_Usuario", Usua_Usuario);
                parameter.Add("FechaInicio", FechaInicio);
                parameter.Add("FechaFin", FechaFin);
                result = db.Query<tbCombosPersonales>(ScriptsBaseDeDatos.Grafi_CombosFiltro, parameter, commandType: CommandType.StoredProcedure);
            }
            return result;
        }
        public IEnumerable<tbCombosPersonales> GrafiPaquetesFiltro(string Usua_Usuario, string FechaInicio, string FechaFin)
        {
            IEnumerable<tbCombosPersonales> result = new List<tbCombosPersonales>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Usua_Usuario", Usua_Usuario);
                parameter.Add("FechaInicio", FechaInicio);
                parameter.Add("FechaFin", FechaFin);
                result = db.Query<tbCombosPersonales>(ScriptsBaseDeDatos.Grafi_PaquetesFiltro, parameter, commandType: CommandType.StoredProcedure);
            }
            return result;
        }

        public RequestStatus Insert(tbCombosPersonales item)
        {
            const string sql = "[Rest].SP_CombosPersonales_Insertar";



            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Comb_Descripcion", item.Comb_Descripcion);
                parametro.Add("@Comb_Precio", item.Comb_Precio);
                parametro.Add("@Comb_Imagen", item.Comb_Imagen);
                parametro.Add("@Bebi_Id", item.Bebi_Id);
                parametro.Add("@Post_id", item.Post_id);
                parametro.Add("@Comp_Id", item.Comp_Id);
                parametro.Add("@Alim_Id", item.Alim_Id);
                parametro.Add("@Comb_Usua_Creacion", item.Comb_Usua_Creacion);
                parametro.Add("@Comb_Fecha_Creacion", item.Comb_Fecha_Creacion);


                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "Exito" : "Error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
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
            string sql = ScriptsBaseDeDatos.Comb_Editar;

            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Comb_Id", item.Comb_Id);
                parameter.Add("@Comb_Descripcion", item.Comb_Descripcion);
                parameter.Add("@Comb_Precio", item.Comb_Precio);
                parameter.Add("@Comb_Imagen", item.Comb_Imagen);
                parameter.Add("@Bebi_Id", item.Bebi_Id);
                parameter.Add("@Post_id", item.Post_id);
                parameter.Add("@Comp_Id", item.Comp_Id);
                parameter.Add("@Alim_Id", item.Alim_Id);
                parameter.Add("@Comb_Usua_Modifica", item.Comb_Usua_Modifica);
                parameter.Add("@Comb_Fecha_Modifica", item.Comb_Fecha_Modifica);
                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };

            }
        }


        public tbCombosPersonales Find(int? id)
        {
            throw new NotImplementedException();
        }
    
    }
}