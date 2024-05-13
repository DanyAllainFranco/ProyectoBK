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
    public partial class ComboPersonalRepository : IRepository<tbCombo>
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

        //public tbCombo Find(int Comb_Id)
        //{
        //    tbCombo result = new tbCombo();
        //    using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
        //    {
        //        var parameter = new DynamicParameters();
        //        parameter.Add("Comb_Id", Comb_Id);
        //        result = db.QueryFirst<tbCombo>(ScriptsBaseDeDatos.Comb_Llenar, parameter, commandType: CommandType.StoredProcedure);
        //        return result;
        //    }
        //}

        public IEnumerable<tbCombo> Find(int Comb_Id)
        {

            List<tbCombo> result = new List<tbCombo>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameters = new { Comb_Id = Comb_Id };
                result = db.Query<tbCombo>(ScriptsBaseDeDatos.Comb_Llenar, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }


        public tbCombo Fill(string id)
        {

            tbCombo result = new tbCombo();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Comb_Id", id);
                result = db.QueryFirst<tbCombo>(ScriptsBaseDeDatos.Comb_Llenar, parameter, commandType: CommandType.StoredProcedure);
                return result;
            }

        }

        public IEnumerable<tbCombo> GrafiCombos(string Usua_Usuario)
        {
            IEnumerable<tbCombo> result = new List<tbCombo>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Usua_Usuario", Usua_Usuario);
                result = db.Query<tbCombo>(ScriptsBaseDeDatos.Grafi_Combos, parameter, commandType: CommandType.StoredProcedure);
            }
            return result;
        }

        public IEnumerable<tbCombo> GrafiPostres(string Usua_Usuario)
        {
            IEnumerable<tbCombo> result = new List<tbCombo>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Usua_Usuario", Usua_Usuario);
                result = db.Query<tbCombo>(ScriptsBaseDeDatos.Grafi_Postre, parameter, commandType: CommandType.StoredProcedure);
            }
            return result;
        }

        public IEnumerable<tbCombo> GrafiPaquetes(string Usua_Usuario)
        {
            IEnumerable<tbCombo> result = new List<tbCombo>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Usua_Usuario", Usua_Usuario);
                result = db.Query<tbCombo>(ScriptsBaseDeDatos.Grafi_Paquetes, parameter, commandType: CommandType.StoredProcedure);
            }
            return result;
        }


        public IEnumerable<tbCombo> GrafiAlimentos(string Usua_Usuario)
        {
            IEnumerable<tbCombo> result = new List<tbCombo>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Usua_Usuario", Usua_Usuario);
                result = db.Query<tbCombo>(ScriptsBaseDeDatos.Grafi_Alimento, parameter, commandType: CommandType.StoredProcedure);
            }
            return result;
        }
        public IEnumerable<tbCombo> GrafiAlimentosFiltro(string Usua_Usuario, string FechaInicio, string FechaFin)
        {
            IEnumerable<tbCombo> result = new List<tbCombo>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Usua_Usuario", Usua_Usuario);
                parameter.Add("FechaInicio", FechaInicio);
                parameter.Add("FechaFin", FechaFin);
                result = db.Query<tbCombo>(ScriptsBaseDeDatos.Grafi_AlimentoFiltro, parameter, commandType: CommandType.StoredProcedure);
            }
            return result;
        }
        public IEnumerable<tbCombo> GrafiPostreFiltro(string Usua_Usuario, string FechaInicio, string FechaFin)
        {
            IEnumerable<tbCombo> result = new List<tbCombo>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Usua_Usuario", Usua_Usuario);
                parameter.Add("FechaInicio", FechaInicio);
                parameter.Add("FechaFin", FechaFin);
                result = db.Query<tbCombo>(ScriptsBaseDeDatos.Grafi_PostreFiltro, parameter, commandType: CommandType.StoredProcedure);
            }
            return result;
        }

        public IEnumerable<tbCombo> GrafiComboFiltro(string Usua_Usuario, string FechaInicio, string FechaFin)
        {
            IEnumerable<tbCombo> result = new List<tbCombo>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Usua_Usuario", Usua_Usuario);
                parameter.Add("FechaInicio", FechaInicio);
                parameter.Add("FechaFin", FechaFin);
                result = db.Query<tbCombo>(ScriptsBaseDeDatos.Grafi_CombosFiltro, parameter, commandType: CommandType.StoredProcedure);
            }
            return result;
        }
        public IEnumerable<tbCombo> GrafiPaquetesFiltro(string Usua_Usuario, string FechaInicio, string FechaFin)
        {
            IEnumerable<tbCombo> result = new List<tbCombo>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Usua_Usuario", Usua_Usuario);
                parameter.Add("FechaInicio", FechaInicio);
                parameter.Add("FechaFin", FechaFin);
                result = db.Query<tbCombo>(ScriptsBaseDeDatos.Grafi_PaquetesFiltro, parameter, commandType: CommandType.StoredProcedure);
            }
            return result;
        }

        public RequestStatus Insert(tbCombo item)
        {
            const string sql = "[Rest].SP_Combos_Insertar";



            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Comb_Descripcion", item.Comb_Descripcion);
                parametro.Add("@Comb_Precio", item.Comb_Precio);
                parametro.Add("@Comb_Imagen", item.Comb_Imagen);
                parametro.Add("@Bebi_Id", item.Bebi_Id);
                parametro.Add("@Post_id", item.Post_Id);
                parametro.Add("@Comp_Id", item.Comp_Id);
                parametro.Add("@Alim_Id", item.Alim_Id);
                parametro.Add("@Comb_Usua_Creacion", item.Comb_Usua_Creacion);
                parametro.Add("@Comb_Fecha_Creacion", item.Comb_Fecha_Creacion);


                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "Exito" : "Error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbCombo> List()
        {
            List<tbCombo> result = new List<tbCombo>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                result = db.Query<tbCombo>(ScriptsBaseDeDatos.Comb_Listar, commandType: CommandType.Text).ToList();
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
                parameter.Add("@Post_id", item.Post_Id);
                parameter.Add("@Comp_Id", item.Comp_Id);
                parameter.Add("@Alim_Id", item.Alim_Id);
                parameter.Add("@Comb_Usua_Modifica", item.Comb_Usua_Modifica);
                parameter.Add("@Comb_Fecha_Modifica", item.Comb_Fecha_Modificacion);
                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };

            }
        }


        public tbCombo Find(int? id)
        {
            throw new NotImplementedException();
        }
    
    }
}