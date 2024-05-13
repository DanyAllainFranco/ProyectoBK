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
        public (RequestStatus, int) Insertar(tbPromociones item)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Prom_Descripcion", item.Prom_Descripcion);
                parametro.Add("@Prom_Precio", item.Prom_Precio);
                parametro.Add("@Prom_Imagen", item.Prom_Imagen);
                parametro.Add("@Dias_Id", item.Dias_Id);
                parametro.Add("@Prom_Usua_Creacion", item.Prom_Usua_Creacion);
                parametro.Add("@Prom_Fecha_Creacion", item.Prom_Fecha_Creacion);

                parametro.Add("Prom_Id", dbType: DbType.Int32, direction: ParameterDirection.Output);

                var result = db.Execute(ScriptsBaseDeDatos.Prom_Insertar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                int proyId = 0;
                if (result > 0)
                {
                    proyId = parametro.Get<int>("Prom_Id");
                }

                string mensaje = (result == 1) ? "Exito" : "Error";
                return (new RequestStatus { CodeStatus = result, MessageStatus = mensaje }, proyId);
            }
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
                parametro.Add("@Dias_Id", item.Dias_Id);
                parametro.Add("@Prom_Usua_Creacion", item.Prom_Usua_Creacion);
                parametro.Add("@Prom_Fecha_Creacion", item.Prom_Fecha_Creacion);


                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "Exito" : "Error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbDias> ListDias()
        {
            List<tbDias> result = new List<tbDias>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                result = db.Query<tbDias>(ScriptsBaseDeDatos.Dias_Mostrar, commandType: CommandType.Text).ToList();
                return result;
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
                parameter.Add("@Dias_Id", item.Dias_Id);
                parameter.Add("@Prom_Usua_Modifica", item.Prom_Usua_Modifica);
                parameter.Add("@Prom_Fecha_Modifica", item.Prom_Fecha_Modifica);
                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };

            }
        }

        #region Alimentos
        public RequestStatus InsertarAlimentos(int Alim_Id, int Prom_Id)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Prom_Id", Prom_Id);
                parametro.Add("Alim_Id", Alim_Id);

                var result = db.Execute(ScriptsBaseDeDatos.Pali_Insertar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public RequestStatus EliminarAlimentos(int? id)
        {
            string sql = ScriptsBaseDeDatos.Pali_Eliminar;

            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Prom_Id", id);
                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);

                return new RequestStatus { CodeStatus = result, MessageStatus = "" };

            }
        }

        public IEnumerable<tbAlimentos> ListAlimentos(int PromId)
        {
            List<tbAlimentos> result = new List<tbAlimentos>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Prom_Id", PromId);

                result = db.Query<tbAlimentos>(ScriptsBaseDeDatos.Alim_Mostrar2, parametro, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public IEnumerable<tbPromocionesPorAlimentos> List1(int Prom_Id)
        {
            string sql = ScriptsBaseDeDatos.Pali_Mostrar;

            List<tbPromocionesPorAlimentos> result = new List<tbPromocionesPorAlimentos>();

            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Prom_Id", Prom_Id);
                result = db.Query<tbPromocionesPorAlimentos>(sql, parametro, commandType: CommandType.StoredProcedure).ToList();

                return result;
            }
        }
        #endregion


        #region Bebidas
        public RequestStatus InsertarBebidas(int Bebi_Id, int Prom_Id)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Prom_Id", Prom_Id);
                parametro.Add("Bebi_Id", Bebi_Id);

                var result = db.Execute(ScriptsBaseDeDatos.Pbeb_Insertar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public RequestStatus EliminarBebidas(int? id)
        {
            string sql = ScriptsBaseDeDatos.Pbeb_Eliminar;

            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Prom_Id", id);
                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);

                return new RequestStatus { CodeStatus = result, MessageStatus = "" };

            }
        }

        public IEnumerable<tbBebidas> ListBebidas(int PromId)
        {
            List<tbBebidas> result = new List<tbBebidas>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Prom_Id", PromId);

                result = db.Query<tbBebidas>(ScriptsBaseDeDatos.Bebi_Mostrar2, parametro, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public IEnumerable<tbPromocionesPorBebidas> List2(int Prom_Id)
        {
            string sql = ScriptsBaseDeDatos.Pbeb_Mostrar;

            List<tbPromocionesPorBebidas> result = new List<tbPromocionesPorBebidas>();

            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Prom_Id", Prom_Id);
                result = db.Query<tbPromocionesPorBebidas>(sql, parametro, commandType: CommandType.StoredProcedure).ToList();

                return result;
            }
        }
        #endregion


        #region Postres
        public RequestStatus InsertarPostres(int Post_Id, int Prom_Id)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Prom_Id", Prom_Id);
                parametro.Add("Post_Id", Post_Id);

                var result = db.Execute(ScriptsBaseDeDatos.Ppos_Insertar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public RequestStatus EliminarPostres(int? id)
        {
            string sql = ScriptsBaseDeDatos.Ppos_Eliminar;

            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Prom_Id", id);
                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);

                return new RequestStatus { CodeStatus = result, MessageStatus = "" };

            }
        }

        public IEnumerable<tbPostres> ListPostres(int PromId)
        {
            List<tbPostres> result = new List<tbPostres>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Prom_Id", PromId);

                result = db.Query<tbPostres>(ScriptsBaseDeDatos.Post_Mostrar2, parametro, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public IEnumerable<tbPromocionesPorPostres> List3(int Prom_Id)
        {
            string sql = ScriptsBaseDeDatos.Ppos_Mostrar;

            List<tbPromocionesPorPostres> result = new List<tbPromocionesPorPostres>();

            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Prom_Id", Prom_Id);
                result = db.Query<tbPromocionesPorPostres>(sql, parametro, commandType: CommandType.StoredProcedure).ToList();

                return result;
            }
        }
        #endregion

        #region Complementos
        public RequestStatus InsertarComplemento(int Comp_Id, int Prom_Id)
        {
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Prom_Id", Prom_Id);
                parametro.Add("Comp_Id", Comp_Id);

                var result = db.Execute(ScriptsBaseDeDatos.Pcom_Insertar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public RequestStatus EliminarComplementos(int? id)
        {
            string sql = ScriptsBaseDeDatos.Pcom_Eliminar;

            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Prom_Id", id);
                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);

                return new RequestStatus { CodeStatus = result, MessageStatus = "" };

            }
        }

        public IEnumerable<tbComplementos> ListComplentos(int PromId)
        {
            List<tbComplementos> result = new List<tbComplementos>();
            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Prom_Id", PromId);

                result = db.Query<tbComplementos>(ScriptsBaseDeDatos.Comp_Mostrar2, parametro, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public IEnumerable<tbPromocionesPorComplementos> List4(int Prom_Id)
        {
            string sql = ScriptsBaseDeDatos.Pcom_Mostrar;

            List<tbPromocionesPorComplementos> result = new List<tbPromocionesPorComplementos>();

            using (var db = new SqlConnection(Proyecto_BKContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Prom_Id", Prom_Id);
                result = db.Query<tbPromocionesPorComplementos>(sql, parametro, commandType: CommandType.StoredProcedure).ToList();

                return result;
            }
        }
        #endregion
    }
}
