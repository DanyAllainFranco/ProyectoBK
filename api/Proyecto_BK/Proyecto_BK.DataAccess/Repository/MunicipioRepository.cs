using Dapper;
using Microsoft.Data.SqlClient;
using Proyecto_BK.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto_BK.DataAccess.Repository
{
    public partial class MunicipioRepository : IRepository<tbMunicipios>
    {
        public RequestStatus Delete(int? id)
        {
            throw new NotImplementedException();
        }
        public RequestStatus Delete(string Muni_Codigo)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Muni_Codigo", Muni_Codigo);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Muni_Eliminar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Exito" : "Error" };
            }
        }

        public tbMunicipios Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbMunicipios item)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Muni_Codigo", item.Muni_Codigo);
                parameter.Add("Muni_Descripcion", item.Muni_Descripcion);
                parameter.Add("Dept_Codigo", item.Dept_Codigo);
                parameter.Add("Muni_Usua_Creacion", item.Muni_Usua_Creacion);
                parameter.Add("Muni_Fecha_Creacion", item.Muni_Fecha_Creacion);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Muni_Insertar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Exito" : "Error" };
            }
        }

        public IEnumerable<tbMunicipios> List()
        {

            List<tbMunicipios> result = new List<tbMunicipios>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                result = db.Query<tbMunicipios>(ScriptsBaseDeDatos.Muni_Listar, commandType: CommandType.Text).ToList();
                return result;
            }

        }
        //public List<tbMunicipios> List(string Dept_Codigo)
        //{
        //    List<tbMunicipios> result = new List<tbMunicipios>();
        //    using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
        //    {
        //        var parameter = new DynamicParameters();
        //        parameter.Add("Dept_Codigo", Dept_Codigo);
        //        result = db.Query<tbMunicipios>(ScriptsBaseDeDatos.Muni_ListarPorDept, parameter, commandType: CommandType.StoredProcedure).ToList();
        //        return result;
        //    }
        //}

        public tbMunicipios Find(string Muni_Codigo)
        {

            tbMunicipios result = new tbMunicipios();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Muni_Codigo", Muni_Codigo);
                result = db.QueryFirst<tbMunicipios>(ScriptsBaseDeDatos.Muni_Llenar, parameter, commandType: CommandType.StoredProcedure);
                return result;
            }

        }

        public RequestStatus Update(tbMunicipios item)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Muni_Codigo", item.Muni_Codigo);
                parameter.Add("Muni_Descripcion", item.Muni_Descripcion);
                parameter.Add("Muni_Usua_Modifica", item.Muni_Usua_Modifica);
                parameter.Add("Muni_Fecha_Modifica", item.Muni_Fecha_Modifica);

                var result = db.QueryFirst(ScriptsBaseDeDatos.Muni_Editar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Exito" : "Error" };
            }
        }
    }
}
