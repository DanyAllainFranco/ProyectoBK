using Proyecto_BK.Common.Models;
using Proyecto_BK.DataAccess.Repository;
//using Proyecto_BK.Entities.Entities;
using Proyecto_BK.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto_BK.BusinessLogic.Services
{
    public class RestauranteServices
    {
        private readonly AlimentoRepository _alimentoRepository;
        private readonly BebidaRepository _bebidaRepository;
        private readonly ComboPersonalRepository _comboPersonalRepository;
        private readonly ComplementoRepository _complementoRepository;
        private readonly PaqueteRepository _paqueteRepository;
        private readonly PaquetePorComidaRepository _paquetePorComidaRepository;
        private readonly PostreRepository _postreRepository;
        private readonly PromocionRepository _promocionRepository;
        private readonly PromocionPorComidaRepository _promocionPorComidaRepository;
        private readonly PromocionPorSucursalRepository _promocionPorSucursalRepository;
        private readonly SucursalRepository _sucursalRepository;
        private readonly FacturaRepository _facturaRepository;


        public RestauranteServices(
               AlimentoRepository alimentoRepository,
               BebidaRepository bebidaRepository,
               ComboPersonalRepository comboPersonalRepository,
               ComplementoRepository complementoRepository,
               PaqueteRepository paqueteRepository,
               PaquetePorComidaRepository paquetePorComidaRepository,
               PostreRepository postreRepository,
               PromocionRepository promocionRepository,
               PromocionPorComidaRepository promocionPorComidaRepository,
               PromocionPorSucursalRepository promocionPorSucursalRepository,
               SucursalRepository sucursalRepository,
               FacturaRepository facturaRepository
            )

        {
            _alimentoRepository = alimentoRepository;
            _bebidaRepository = bebidaRepository;
            _comboPersonalRepository = comboPersonalRepository;
            _complementoRepository = complementoRepository;
            _paqueteRepository = paqueteRepository;
            _paquetePorComidaRepository = paquetePorComidaRepository;
            _postreRepository = postreRepository;
            _promocionRepository = promocionRepository;
            _promocionPorComidaRepository = promocionPorComidaRepository;
            _promocionPorSucursalRepository = promocionPorSucursalRepository;
            _sucursalRepository = sucursalRepository;
            _facturaRepository = facturaRepository;
        }


        #region Factura


        //public ServiceResult ElimnarFacturaDetalle(string Fact_Id, string prod_nombre, int dif)
        //{
        //    var result = new ServiceResult();
        //    try
        //    {
        //        var list = _facturaRepository.Delete(Fact_Id, prod_nombre, dif);
        //        if (list.CodeStatus > 0)
        //        {
        //            return result.Ok($"La accion ha sido existosa", list);
        //        }
        //        else
        //        {
        //            return result.Error("No se pudo realizar la accion");
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return result.Error(ex);
        //    }
        //}

        public ServiceResult ListadoFacturaDetalles(int Fact_Id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _facturaRepository.ListaDetalles(Fact_Id);
                return result.Ok(list);
            }

            catch (Exception ex)
            {

                return result.Error(ex.Message);
            }
        }

        public ServiceResult ListadoFactura()
        {
            var result = new ServiceResult();
            try
            {
                var list = _facturaRepository.List();
                return result.Ok(list);
            }

            catch (Exception ex)
            {

                return result.Error(ex.Message);
            }
        }

        public ServiceResult CrearFactura(FacturaViewModel item, out int id)
        {
            var result = new ServiceResult();
            try
            {
                var (lost, scope) = _facturaRepository.Insertar(item);
                id = scope;
                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    lost.MessageStatus = (lost.CodeStatus != 1) ? "401 Error de consulta" : lost.MessageStatus;
                    return result.Error(lost);
                }
            }
            catch (Exception ex)
            {
                id = 0;
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarDetalle(FacturaDetalleViewModel item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _facturaRepository.InsertarDetalle(item);
                if (list.CodeStatus > 0)
                {
                    return result.Ok(list);
                }
                else
                {
                    return result.Error(list);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }


        #endregion

        #region Alimentos
        public ServiceResult ListAlimento()
        {
            var result = new ServiceResult();
            try
            {
                var list = _alimentoRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }

        public ServiceResult LlenarAlimento(int Alim_Id)
        {
            var result = new ServiceResult();
            try
            {
                var alimento = _alimentoRepository.Find(Alim_Id);
                if (alimento != null)
                {
                    return result.Ok(alimento);
                }
                else
                {
                    return result.Error($"No se encontró el Alimento con ID {Alim_Id}");
                }
            }
            catch (Exception ex)
            {
                return result.Error($"No se encontró el Alimento con ID {Alim_Id}");
            }
        }

        public ServiceResult CrearAlimento(tbAlimentos item)
        {
            var result = new ServiceResult();
            try
            {
                var response = _alimentoRepository.Insert(item);
                if (response.CodeStatus == 1)
                {
                    return result.Ok("Alimento creado con éxito", response);
                }
                else
                {
                    return result.Error("Por favor, rellene todos los campos");
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error al guardar la información del Alimento");
            }
        }

        public ServiceResult EditarAlimento(tbAlimentos item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _alimentoRepository.Update(item);
                if (list.CodeStatus > 0)
                {
                    return result.Ok(list);
                }
                else
                {
                    list.MessageStatus = (list.CodeStatus == 0) ? "Ya existe un Alimento con ese nombre" : list.MessageStatus;
                    return result.Error(list);
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }

        public ServiceResult EliminarAlimento(int Alim_Id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _alimentoRepository.Delete(Alim_Id);
                if (list.CodeStatus > 0)
                {
                    return result.Ok(list);
                }
                else
                {
                    list.MessageStatus = (list.CodeStatus == 0) ? "No se encontró el Alimento a eliminar" : list.MessageStatus;
                    return result.Error(list);
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }
        #endregion

        #region Bebidas
        public ServiceResult ListBebida()
        {
            var result = new ServiceResult();
            try
            {
                var list = _bebidaRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }

        public ServiceResult BebidasAutocompletado()
        {
            var result = new ServiceResult();
            try
            {
                var list = _bebidaRepository.BebidaDDL();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }

        public ServiceResult LlenarBebida(int Bebi_Id)
        {
            var result = new ServiceResult();
            try
            {
                var bebida = _bebidaRepository.Find(Bebi_Id);
                if (bebida != null)
                {
                    return result.Ok(bebida);
                }
                else
                {
                    return result.Error($"No se encontró la Bebida con ID {Bebi_Id}");
                }
            }
            catch (Exception ex)
            {
                return result.Error($"No se encontró la Bebida con ID {Bebi_Id}");
            }
        }

        public ServiceResult CrearBebida(tbBebidas item)
        {
            var result = new ServiceResult();
            try
            {
                var response = _bebidaRepository.Insert(item);
                if (response.CodeStatus == 1)
                {
                    return result.Ok("Bebida creada con éxito", response);
                }
                else
                {
                    return result.Error("Por favor, rellene todos los campos");
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error al guardar la información de la Bebida");
            }
        }

        public ServiceResult EditarBebida(tbBebidas item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _bebidaRepository.Update(item);
                if (list.CodeStatus > 0)
                {
                    return result.Ok(list);
                }
                else
                {
                    list.MessageStatus = (list.CodeStatus == 0) ? "Ya existe una Bebida con ese nombre" : list.MessageStatus;
                    return result.Error(list);
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }

        public ServiceResult EliminarBebida(int Bebi_Id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _bebidaRepository.Delete(Bebi_Id);
                if (list.CodeStatus > 0)
                {
                    return result.Ok(list);
                }
                else
                {
                    list.MessageStatus = (list.CodeStatus == 0) ? "No se encontró la Bebida a eliminar" : list.MessageStatus;
                    return result.Error(list);
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }
        #endregion

        #region Combo Personal
        public ServiceResult ListComboPersonal()
        {
            var result = new ServiceResult();
            try
            {
                var list = _comboPersonalRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }

        public ServiceResult LlenarComboPersonal(string id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _comboPersonalRepository.Fill(id);

                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex);
            }
        }

        public ServiceResult GrafiCombos(string Usua_Usuario)
        {
            var result = new ServiceResult();
            try
            {
                var comboPersonal = _comboPersonalRepository.GrafiCombos(Usua_Usuario);
                if (comboPersonal != null)
                {
                    return result.Ok(comboPersonal);
                }
                else
                {
                    return result.Error($"No se encontró el Combo Personal con ID {Usua_Usuario}");
                }
            }
            catch (Exception ex)
            {
                return result.Error($"No se encontró el Combo Personal con ID {Usua_Usuario}");
            }
        }

        public ServiceResult GrafiPostres(string Usua_Usuario)
        {
            var result = new ServiceResult();
            try
            {
                var comboPersonal = _comboPersonalRepository.GrafiPostres(Usua_Usuario);
                if (comboPersonal != null)
                {
                    return result.Ok(comboPersonal);
                }
                else
                {
                    return result.Error($"No se encontró el Combo Personal con ID {Usua_Usuario}");
                }
            }
            catch (Exception ex)
            {
                return result.Error($"No se encontró el Combo Personal con ID {Usua_Usuario}");
            }
        }

        public ServiceResult GrafiPaquetes(string Usua_Usuario)
        {
            var result = new ServiceResult();
            try
            {
                var comboPersonal = _comboPersonalRepository.GrafiPaquetes(Usua_Usuario);
                if (comboPersonal != null)
                {
                    return result.Ok(comboPersonal);
                }
                else
                {
                    return result.Error($"No se encontró el Combo Personal con ID {Usua_Usuario}");
                }
            }
            catch (Exception ex)
            {
                return result.Error($"No se encontró el Combo Personal con ID {Usua_Usuario}");
            }
        }

        public ServiceResult GrafiAlimentos(string Usua_Usuario)
        {
            var result = new ServiceResult();
            try
            {
                var comboPersonal = _comboPersonalRepository.GrafiAlimentos(Usua_Usuario);
                if (comboPersonal != null)
                {
                    return result.Ok(comboPersonal);
                }
                else
                {
                    return result.Error($"No se encontró el Combo Personal con ID {Usua_Usuario}");
                }
            }
            catch (Exception ex)
            {
                return result.Error($"No se encontró el Combo Personal con ID {Usua_Usuario}");
            }
        }

        public ServiceResult GrafiAlimentosFiltro(string Usua_Usuario, string FechaInicio, string FechaFin)
        {
            var result = new ServiceResult();
            try
            {
                var comboPersonal = _comboPersonalRepository.GrafiAlimentosFiltro(Usua_Usuario, FechaInicio, FechaFin);
                if (comboPersonal != null)
                {
                    return result.Ok(comboPersonal);
                }
                else
                {
                    return result.Error($"No se encontró el Combo Personal con ID {Usua_Usuario}");
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult GrafiPostreFiltro(string Usua_Usuario, string FechaInicio, string FechaFin)
        {
            var result = new ServiceResult();
            try
            {
                var comboPersonal = _comboPersonalRepository.GrafiPostreFiltro(Usua_Usuario, FechaInicio, FechaFin);
                if (comboPersonal != null)
                {
                    return result.Ok(comboPersonal);
                }
                else
                {
                    return result.Error($"No se encontró el Combo Personal con ID {Usua_Usuario}");
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult GrafiComboFiltro(string Usua_Usuario, string FechaInicio, string FechaFin)
        {
            var result = new ServiceResult();
            try
            {
                var comboPersonal = _comboPersonalRepository.GrafiComboFiltro(Usua_Usuario, FechaInicio, FechaFin);
                if (comboPersonal != null)
                {
                    return result.Ok(comboPersonal);
                }
                else
                {
                    return result.Error($"No se encontró el Combo Personal con ID {Usua_Usuario}");
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        public ServiceResult GrafiPaqueteFiltro(string Usua_Usuario, string FechaInicio, string FechaFin)
        {
            var result = new ServiceResult();
            try
            {
                var comboPersonal = _comboPersonalRepository.GrafiPaquetesFiltro(Usua_Usuario, FechaInicio, FechaFin);
                if (comboPersonal != null)
                {
                    return result.Ok(comboPersonal);
                }
                else
                {
                    return result.Error($"No se encontró el Combo Personal con ID {Usua_Usuario}");
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult CrearComboPersonal(tbCombo item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _comboPersonalRepository.Insert(item);
                if (list.CodeStatus > 0)
                {
                    return result.Ok(list);
                }
                else
                {
                    return result.Error(list);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EditarComboPersonal(tbCombo item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _comboPersonalRepository.Update(item);
                if (list.CodeStatus > 0)
                {
                    return result.Ok(list);
                }
                else
                {
                    return result.Error("Ya existe un registro con ese nombre");
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex);
            }
        }

        public ServiceResult EliminarComboPersonal(int Comb_Id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _comboPersonalRepository.Delete(Comb_Id);
                if (list.CodeStatus > 0)
                {
                    return result.Ok(list);
                }
                else
                {
                    list.MessageStatus = (list.CodeStatus == 0) ? "No se encontró el Empleado a eliminar" : list.MessageStatus;
                    return result.Error(list);
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }
        #endregion

        #region Complemento
        public ServiceResult ListComplemento()
        {
            var result = new ServiceResult();
            try
            {
                var list = _complementoRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }

        public ServiceResult ComplementoAutocompletado()
        {
            var result = new ServiceResult();
            try
            {
                var list = _complementoRepository.ComplementosDDL();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }

        public ServiceResult LlenarComplemento(int Comp_Id)
      {
            var result = new ServiceResult();
            try
            {
                var list = _complementoRepository.Fill(Comp_Id.ToString());

                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex);
            }
        }

        public ServiceResult CrearComplemento(tbComplementos item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _complementoRepository.Insert(item);
                if (list.CodeStatus > 0)
                {
                    return result.Ok(list);
                }
                else
                {
                    return result.Error(list);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EditarComplemento(tbComplementos item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _complementoRepository.Update(item);
                if (list.CodeStatus > 0)
                {
                    return result.Ok(list);
                }
                else
                {
                    return result.Error("Ya existe un registro con ese nombre");
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex);
            }
        }

        public ServiceResult EliminarComplemento(int Comp_Id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _complementoRepository.Delete(Comp_Id);
                if (list.CodeStatus > 0)
                {
                    return result.Ok(list);
                }
                else
                {
                    list.MessageStatus = (list.CodeStatus == 0) ? "No se encontró el Complemento a eliminar" : list.MessageStatus;
                    return result.Error(list);
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }
        #endregion

        #region Paquete
        public ServiceResult ListPaquete()
        {
            var result = new ServiceResult();
            try
            {
                var list = _paqueteRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }

        public ServiceResult PaqueteAucompletado()
        {
            var result = new ServiceResult();
            try
            {
                var list = _paqueteRepository.PaqueteDDL();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }

        public ServiceResult LlenarPaquete(int Paqe_Id)
        {
            var result = new ServiceResult();
            try
            {
                var paquete = _paqueteRepository.Find(Paqe_Id);
                if (paquete != null)
                {
                    return result.Ok(paquete);
                }
                else
                {
                    return result.Error($"No se encontró el Paquete con ID {Paqe_Id}");
                }
            }
            catch (Exception ex)
            {
                return result.Error($"No se encontró el Paquete con ID {Paqe_Id}");
            }
        }
        public ServiceResult InsertarPaquete(tbPaquetes item, out int ingrId)
        {
            var result = new ServiceResult();
            ingrId = 0;
            try
            {
                var (lost, idGenerado) = _paqueteRepository.Insertar(item);
                if (lost.CodeStatus > 0)
                {
                    ingrId = idGenerado;
                    return result.Ok(lost);
                }
                else
                {
                    lost.MessageStatus = (lost.CodeStatus == 0) ? "401 Error de Consulta" : lost.MessageStatus;
                    return result.Error(lost);
                }

            }
            catch (Exception ex)
            {

                return result.Error(ex.Message);
            }
        }

        public ServiceResult EditarPaquete(tbPaquetes item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _paqueteRepository.Update(item);
                if (list.CodeStatus > 0)
                {
                    return result.Ok(list);
                }
                else
                {
                    list.MessageStatus = (list.CodeStatus == 0) ? "Ya existe un Paquete con ese nombre" : list.MessageStatus;
                    return result.Error(list);
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }

        public ServiceResult EliminarPaquete(int Paqe_Id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _paqueteRepository.Delete(Paqe_Id);
                if (list.CodeStatus > 0)
                {
                    return result.Ok(list);
                }
                else
                {
                    list.MessageStatus = (list.CodeStatus == 0) ? "No se encontró el Paquete a eliminar" : list.MessageStatus;
                    return result.Error(list);
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }
        #endregion

        #region Paquete por Comidas
        public ServiceResult ListPaquetePorComida()
        {
            var result = new ServiceResult();
            try
            {
                var list = _paquetePorComidaRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }

        public ServiceResult LlenarPaquetePorComida(int PaCo_Id)
        {
            var result = new ServiceResult();
            try
            {
                var paquetePorComida = _paquetePorComidaRepository.Find(PaCo_Id);
                if (paquetePorComida != null)
                {
                    return result.Ok(paquetePorComida);
                }
                else
                {
                    return result.Error($"No se encontró el Paquete por Comida con ID {PaCo_Id}");
                }
            }
            catch (Exception ex)
            {
                return result.Error($"No se encontró el Paquete por Comida con ID {PaCo_Id}");
            }
        }

        public ServiceResult CrearPaquetePorComida(tbPaquetesPorComidas item)
        {
            var result = new ServiceResult();
            try
            {
                var response = _paquetePorComidaRepository.Insert(item);
                if (response.CodeStatus == 1)
                {
                    return result.Ok("Paquete por Comida creado con éxito", response);
                }
                else
                {
                    return result.Error("Por favor, rellene todos los campos");
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error al guardar la información del Paquete por Comida");
            }
        }

        public ServiceResult EditarPaquetePorComida(tbPaquetesPorComidas item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _paquetePorComidaRepository.Update(item);
                if (list.CodeStatus > 0)
                {
                    return result.Ok(list);
                }
                else
                {
                    list.MessageStatus = (list.CodeStatus == 0) ? "Ya existe un Paquete por Comida con ese nombre" : list.MessageStatus;
                    return result.Error(list);
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }

        public ServiceResult EliminarPaquetePorComida(int PaCo_Id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _paquetePorComidaRepository.Delete(PaCo_Id);
                if (list.CodeStatus > 0)
                {
                    return result.Ok(list);
                }
                else
                {
                    list.MessageStatus = (list.CodeStatus == 0) ? "No se encontró el Paquete por Comida a eliminar" : list.MessageStatus;
                    return result.Error(list);
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }
        #endregion

        #region Postres
        public ServiceResult ListPostre()
        {
            var result = new ServiceResult();
            try
            {
                var list = _postreRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }

        public ServiceResult PostreAutocompletar()
        {
            var result = new ServiceResult();
            try
            {
                var list = _postreRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }


        public ServiceResult LlenarPostre(int Post_id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _postreRepository.Fill(Post_id.ToString());

                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex);
            }
        }

        public ServiceResult CrearPostre(tbPostres item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _postreRepository.Insert(item);
                if (list.CodeStatus > 0)
                {
                    return result.Ok(list);
                }
                else
                {
                    return result.Error(list);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EditarPostre(tbPostres item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _postreRepository.Update(item);
                if (list.CodeStatus > 0)
                {
                    return result.Ok(list);
                }
                else
                {
                    return result.Error("Ya existe un registro con ese nombre");
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex);
            }
        }

        public ServiceResult EliminarPostre(int Post_id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _postreRepository.Delete(Post_id);
                if (list.CodeStatus > 0)
                {
                    return result.Ok(list);
                }
                else
                {
                    list.MessageStatus = (list.CodeStatus == 0) ? "No se encontró el Postre a eliminar" : list.MessageStatus;
                    return result.Error(list);
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }
        #endregion

        #region Promocion
        public ServiceResult ListPromocion()
        {
            var result = new ServiceResult();
            try
            {
                var list = _promocionRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }

        public ServiceResult ListDias()
        {
            var result = new ServiceResult();
            try
            {
                var list = _promocionRepository.ListDias();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }
        public ServiceResult LlenarPromocion(string id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _promocionRepository.Fill(id);

                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex);
            }
        }
        public ServiceResult InsertarPromo(tbPromociones item, out int ingrId)
        {
            var result = new ServiceResult();
            ingrId = 0;
            try
            {
                var (lost, idGenerado) = _promocionRepository.Insertar(item);
                if (lost.CodeStatus > 0)
                {
                    ingrId = idGenerado;
                    return result.Ok(lost);
                }
                else
                {
                    lost.MessageStatus = (lost.CodeStatus == 0) ? "401 Error de Consulta" : lost.MessageStatus;
                    return result.Error(lost);
                }

            }
            catch (Exception ex)
            {

                return result.Error(ex.Message);
            }
        }

        public ServiceResult CrearPromocion(tbPromociones item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _promocionRepository.Insert(item);
                if (list.CodeStatus > 0)
                {
                    return result.Ok(list);
                }
                else
                {
                    return result.Error(list);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EditarPromocion(tbPromociones item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _promocionRepository.Update(item);
                if (list.CodeStatus > 0)
                {
                    return result.Ok(list);
                }
                else
                {
                    return result.Error("Ya existe un registro con ese nombre");
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex);
            }
        }

        public ServiceResult EliminarPromocion(int Prom_Id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _promocionRepository.Delete(Prom_Id);
                if (list.CodeStatus > 0)
                {
                    return result.Ok(list);
                }
                else
                {
                    list.MessageStatus = (list.CodeStatus == 0) ? "No se encontró el Complemento a eliminar" : list.MessageStatus;
                    return result.Error(list);
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }
        #endregion

        #region Promocion por Comida
        public ServiceResult ListPromocionPorComida()
        {
            var result = new ServiceResult();
            try
            {
                var list = _promocionPorComidaRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }

        public ServiceResult LlenarPromocionPorComida(string id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _promocionPorComidaRepository.Fill(id);

                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex);
            }
        }

        public ServiceResult CrearPromocionPorComida(tbPromocionesPorComidas item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _promocionPorComidaRepository.Insert(item);
                if (list.CodeStatus > 0)
                {
                    return result.Ok(list);
                }
                else
                {
                    return result.Error(list);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EditarPromocionPorComida(tbPromocionesPorComidas item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _promocionPorComidaRepository.Update(item);
                if (list.CodeStatus > 0)
                {
                    return result.Ok(list);
                }
                else
                {
                    return result.Error("Ya existe un registro con ese nombre");
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex);
            }
        }

        public ServiceResult EliminarPromocionPorComida(int PrSe_Id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _promocionPorComidaRepository.Delete(PrSe_Id);
                if (list.CodeStatus > 0)
                {
                    return result.Ok(list);
                }
                else
                {
                    list.MessageStatus = (list.CodeStatus == 0) ? "No se encontró el Complemento a eliminar" : list.MessageStatus;
                    return result.Error(list);
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }
        #endregion

        #region Promocion por Sucursal
        public ServiceResult ListPromocionPorSucursal()
        {
            var result = new ServiceResult();
            try
            {
                var list = _promocionPorSucursalRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }

        public ServiceResult LlenarPromocionPorSucursal(string id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _promocionPorSucursalRepository.Fill(id);

                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex);
            }
        }

        public ServiceResult CrearPromocionPorSucursal(tbPromocionesPorSusursales item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _promocionPorSucursalRepository.Insert(item);
                if (list.CodeStatus > 0)
                {
                    return result.Ok(list);
                }
                else
                {
                    return result.Error(list);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EditarPromocionPorSucursal(tbPromocionesPorSusursales item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _promocionPorSucursalRepository.Update(item);
                if (list.CodeStatus > 0)
                {
                    return result.Ok(list);
                }
                else
                {
                    return result.Error("Ya existe un registro con ese nombre");
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex);
            }
        }

        public ServiceResult EliminarPromocionPorSucursal(int PPSu_Id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _promocionPorSucursalRepository.Delete(PPSu_Id);
                if (list.CodeStatus > 0)
                {
                    return result.Ok(list);
                }
                else
                {
                    list.MessageStatus = (list.CodeStatus == 0) ? "No se encontró el Complemento a eliminar" : list.MessageStatus;
                    return result.Error(list);
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }
        #endregion

        #region Sucursal
        public ServiceResult ListSucursal()
        {
            var result = new ServiceResult();
            try
            {
                var list = _sucursalRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }

        public ServiceResult LlenarSucursal(int Sucu_Id)
        {
            var result = new ServiceResult();
            try
            {
                var sucursal = _sucursalRepository.Find(Sucu_Id);
                if (sucursal != null)
                {
                    return result.Ok(sucursal);
                }
                else
                {
                    return result.Error($"No se encontró la Sucursal con ID {Sucu_Id}");
                }
            }
            catch (Exception ex)
            {
                return result.Error($"No se encontró la Sucursal con ID {Sucu_Id}");
            }
        }

        public ServiceResult CrearSucursal(tbSucursales item)
        {
            var result = new ServiceResult();
            try
            {
                var response = _sucursalRepository.Insert(item);
                if (response.CodeStatus == 1)
                {
                    return result.Ok("Sucursal creada con éxito", response);
                }
                else
                {
                    return result.Error("Por favor, rellene todos los campos");
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error al guardar la información de la Sucursal");
            }
        }

        public ServiceResult EditarSucursal(tbSucursales item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _sucursalRepository.Update(item);
                if (list.CodeStatus > 0)
                {
                    return result.Ok(list);
                }
                else
                {
                    list.MessageStatus = (list.CodeStatus == 0) ? "Ya existe una Sucursal con ese nombre" : list.MessageStatus;
                    return result.Error(list);
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }

        public ServiceResult EliminarSucursal(int Sucu_Id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _sucursalRepository.Delete(Sucu_Id);
                if (list.CodeStatus > 0)
                {
                    return result.Ok(list);
                }
                else
                {
                    list.MessageStatus = (list.CodeStatus == 0) ? "No se encontró la Sucursal a eliminar" : list.MessageStatus;
                    return result.Error(list);
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
            }
        }
        #endregion

        #region PromocionPorAlimentos
        public ServiceResult InsertarAlimentos(List<int> AlimIds, int Prom_Id)
        {
            var result = new ServiceResult();
            try
            {
                if(AlimIds.Count > 0)
                {
                    foreach (var Alim_Id in AlimIds)
                    {
                        var lost = _promocionRepository.InsertarAlimentos(Alim_Id, Prom_Id);
                        if (lost.CodeStatus > 0)
                        {
                            //return result.Ok(lost);
                        }
                        else
                        {
                            lost.MessageStatus = (lost.CodeStatus == 0) ? "401 Error de Consulta" : lost.MessageStatus;
                            return result.Error(lost);
                        }
                    }

                    return result.Ok(); // Si todo fue exitoso
                }
                else
                {
                    return result.Ok();
                }

            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ListaAlimentosAgregados(int Prom_Id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _promocionRepository.List1(Prom_Id);
                if (lost.Count() > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    return result.Error();
                }

            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);

            }
        }

        public ServiceResult ListAlimentos(int Prom_Id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _promocionRepository.ListAlimentos(Prom_Id);
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarAlimentos(int Prom_Id)
        {
            var result = new ServiceResult();
            try
            {
                var response = _promocionRepository.EliminarAlimentos(Prom_Id);
                if (response.CodeStatus > 0)
                {
                    return result.Ok("Pantalla por rol eliminada con éxito", response);
                }
                else
                {
                    return result.Error("No se encontró la pantalla por rol a eliminar");
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region PromocionPorBebidas
        public ServiceResult InsertarBebidas(List<int> AlimIds, int Prom_Id)
        {
            var result = new ServiceResult();
            try
            {
                foreach (var Alim_Id in AlimIds)
                {
                    var lost = _promocionRepository.InsertarBebidas(Alim_Id, Prom_Id);
                    if (lost.CodeStatus > 0)
                    {
                        //return result.Ok(lost);
                    }
                    else
                    {
                        lost.MessageStatus = (lost.CodeStatus == 0) ? "401 Error de Consulta" : lost.MessageStatus;
                        return result.Error(lost);
                    }
                }

                return result.Ok(); // Si todo fue exitoso
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ListaBebidasAgregados(int Prom_Id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _promocionRepository.List2(Prom_Id);
                if (lost.Count() > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    return result.Error();
                }

            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);

            }
        }

        public ServiceResult ListBebidas(int Prom_Id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _promocionRepository.ListBebidas(Prom_Id);
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarBebidas(int Prom_Id)
        {
            var result = new ServiceResult();
            try
            {
                var response = _promocionRepository.EliminarBebidas(Prom_Id);
                if (response.CodeStatus > 0)
                {
                    return result.Ok("Pantalla por rol eliminada con éxito", response);
                }
                else
                {
                    return result.Error("No se encontró la pantalla por rol a eliminar");
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region PromocionPorPostres
        public ServiceResult InsertarPostres(List<int> AlimIds, int Prom_Id)
        {
            var result = new ServiceResult();
            try
            {
                foreach (var Alim_Id in AlimIds)
                {
                    var lost = _promocionRepository.InsertarPostres(Alim_Id, Prom_Id);
                    if (lost.CodeStatus > 0)
                    {
                        //return result.Ok(lost);
                    }
                    else
                    {
                        lost.MessageStatus = (lost.CodeStatus == 0) ? "401 Error de Consulta" : lost.MessageStatus;
                        return result.Error(lost);
                    }
                }

                return result.Ok(); // Si todo fue exitoso
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ListaPostresAgregados(int Prom_Id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _promocionRepository.List3(Prom_Id);
                if (lost.Count() > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    return result.Error();
                }

            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);

            }
        }

        public ServiceResult ListPostres(int Prom_Id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _promocionRepository.ListPostres(Prom_Id);
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarPostres(int Prom_Id)
        {
            var result = new ServiceResult();
            try
            {
                var response = _promocionRepository.EliminarPostres(Prom_Id);
                if (response.CodeStatus > 0)
                {
                    return result.Ok("Pantalla por rol eliminada con éxito", response);
                }
                else
                {
                    return result.Error("No se encontró la pantalla por rol a eliminar");
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region PromocionPorComplementos
        public ServiceResult InsertarComplementos(List<int> AlimIds, int Prom_Id)
        {
            var result = new ServiceResult();
            try
            {
                foreach (var Alim_Id in AlimIds)
                {
                    var lost = _promocionRepository.InsertarComplemento(Alim_Id, Prom_Id);
                    if (lost.CodeStatus > 0)
                    {
                        //return result.Ok(lost);
                    }
                    else
                    {
                        lost.MessageStatus = (lost.CodeStatus == 0) ? "401 Error de Consulta" : lost.MessageStatus;
                        return result.Error(lost);
                    }
                }

                return result.Ok(); // Si todo fue exitoso
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ListaComplementosAgregados(int Prom_Id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _promocionRepository.List4(Prom_Id);
                if (lost.Count() > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    return result.Error();
                }

            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);

            }
        }

        public ServiceResult ListComplementos(int Prom_Id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _promocionRepository.ListComplentos(Prom_Id);
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarComplementos(int Prom_Id)
        {
            var result = new ServiceResult();
            try
            {
                var response = _promocionRepository.EliminarComplementos(Prom_Id);
                if (response.CodeStatus > 0)
                {
                    return result.Ok("Pantalla por rol eliminada con éxito", response);
                }
                else
                {
                    return result.Error("No se encontró la pantalla por rol a eliminar");
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region PromocionPorSucursales
        public ServiceResult InsertarSucursales(List<int> AlimIds, int Prom_Id, int Usua_Id)
        {
            var result = new ServiceResult();
            try
            {
                foreach (var Alim_Id in AlimIds)
                {
                    var lost = _promocionRepository.InsertarSucursal(Alim_Id, Prom_Id, Usua_Id);
                    if (lost.CodeStatus > 0)
                    {
                        //return result.Ok(lost);
                    }
                    else
                    {
                        lost.MessageStatus = (lost.CodeStatus == 0) ? "401 Error de Consulta" : lost.MessageStatus;
                        return result.Error(lost);
                    }
                }

                return result.Ok(); // Si todo fue exitoso
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ListaSucursalesAgregados(int Prom_Id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _promocionRepository.List5(Prom_Id);
                if (lost.Count() > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    return result.Error();
                }

            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);

            }
        }

        public ServiceResult ListSucursales(int Prom_Id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _promocionRepository.ListSucursales(Prom_Id);
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarSucursales(int Prom_Id)        
        {
            var result = new ServiceResult();
            try
            {
                var response = _promocionRepository.EliminarSucursales(Prom_Id);
                if (response.CodeStatus > 0)
                {
                    return result.Ok("Pantalla por rol eliminada con éxito", response);
                }
                else
                {
                    return result.Error("No se encontró la pantalla por rol a eliminar");
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion
    }
}
