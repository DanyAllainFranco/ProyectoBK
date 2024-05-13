using Proyecto_BK.Common.Models;
using Proyecto_BK.DataAccess.Repository;
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


        public ServiceResult ElimnarFacturaDetalle(string Fact_Id, string prod_nombre, int dif)
        {
            var result = new ServiceResult();
            try
            {
                var list = _facturaRepository.Delete(Fact_Id, prod_nombre, dif);
                if (list.CodeStatus > 0)
                {
                    return result.Ok($"La accion ha sido existosa", list);
                }
                else
                {
                    return result.Error("No se pudo realizar la accion");
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex);
            }
        }

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

        public ServiceResult LlenarComboPersonal(int Comb_Id)
        {
            var result = new ServiceResult();
            try
            {
                var comboPersonal = _comboPersonalRepository.Find(Comb_Id);
                if (comboPersonal != null)
                {
                    return result.Ok(comboPersonal);
                }
                else
                {
                    return result.Error($"No se encontró el Combo Personal con ID {Comb_Id}");
                }
            }
            catch (Exception ex)
            {
                return result.Error($"No se encontró el Combo Personal con ID {Comb_Id}");
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

        public ServiceResult CrearComboPersonal(tbCombosPersonales item)
        {
            var result = new ServiceResult();
            try
            {
                var response = _comboPersonalRepository.Insert(item);
                if (response.CodeStatus == 1)
                {
                    return result.Ok("Combo Personal creado con éxito", response);
                }
                else
                {
                    return result.Error("Por favor, rellene todos los campos");
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error al guardar la información del Combo Personal");
            }
        }

        public ServiceResult EditarComboPersonal(tbCombosPersonales item)
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
                    list.MessageStatus = (list.CodeStatus == 0) ? "Ya existe un Combo Personal con ese nombre" : list.MessageStatus;
                    return result.Error(list);
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
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
                    list.MessageStatus = (list.CodeStatus == 0) ? "No se encontró el Combo Personal a eliminar" : list.MessageStatus;
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
                var complemento = _complementoRepository.Find(Comp_Id);
                if (complemento != null)
                {
                    return result.Ok(complemento);
                }
                else
                {
                    return result.Error($"No se encontró el Complemento con ID {Comp_Id}");
                }
            }
            catch (Exception ex)
            {
                return result.Error($"No se encontró el Complemento con ID {Comp_Id}");
            }
        }

        public ServiceResult CrearComplemento(tbComplementos item)
        {
            var result = new ServiceResult();
            try
            {
                var response = _complementoRepository.Insert(item);
                if (response.CodeStatus == 1)
                {
                    return result.Ok("Complemento creado con éxito", response);
                }
                else
                {
                    return result.Error("Por favor, rellene todos los campos");
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error al guardar la información del Complemento");
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
                    list.MessageStatus = (list.CodeStatus == 0) ? "Ya existe un Complemento con ese nombre" : list.MessageStatus;
                    return result.Error(list);
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
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

        public ServiceResult CrearPaquete(tbPaquetes item)
        {
            var result = new ServiceResult();
            try
            {
                var response = _paqueteRepository.Insert(item);
                if (response.CodeStatus == 1)
                {
                    return result.Ok("Paquete creado con éxito", response);
                }
                else
                {
                    return result.Error("Por favor, rellene todos los campos");
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error al guardar la información del Paquete");
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
                var postre = _postreRepository.Find(Post_id);
                if (postre != null)
                {
                    return result.Ok(postre);
                }
                else
                {
                    return result.Error($"No se encontró el Postre con ID {Post_id}");
                }
            }
            catch (Exception ex)
            {
                return result.Error($"No se encontró el Postre con ID {Post_id}");
            }
        }

        public ServiceResult CrearPostre(tbPostres item)
        {
            var result = new ServiceResult();
            try
            {
                var response = _postreRepository.Insert(item);
                if (response.CodeStatus == 1)
                {
                    return result.Ok("Postre creado con éxito", response);
                }
                else
                {
                    return result.Error("Por favor, rellene todos los campos");
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error al guardar la información del Postre");
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
                    list.MessageStatus = (list.CodeStatus == 0) ? "Ya existe un Postre con ese nombre" : list.MessageStatus;
                    return result.Error(list);
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
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

        public ServiceResult LlenarPromocion(int Prom_Id)
        {
            var result = new ServiceResult();
            try
            {
                var promocion = _promocionRepository.Find(Prom_Id);
                if (promocion != null)
                {
                    return result.Ok(promocion);
                }
                else
                {
                    return result.Error($"No se encontró la Promoción con ID {Prom_Id}");
                }
            }
            catch (Exception ex)
            {
                return result.Error($"No se encontró la Promoción con ID {Prom_Id}");
            }
        }

        public ServiceResult CrearPromocion(tbPromociones item)
        {
            var result = new ServiceResult();
            try
            {
                var response = _promocionRepository.Insert(item);
                if (response.CodeStatus == 1)
                {
                    return result.Ok("Promoción creada con éxito", response);
                }
                else
                {
                    return result.Error("Por favor, rellene todos los campos");
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error al guardar la información de la Promoción");
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
                    list.MessageStatus = (list.CodeStatus == 0) ? "Ya existe una Promoción con ese nombre" : list.MessageStatus;
                    return result.Error(list);
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
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
                    list.MessageStatus = (list.CodeStatus == 0) ? "No se encontró la Promoción a eliminar" : list.MessageStatus;
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

        public ServiceResult LlenarPromocionPorComida(int PrSe_Id)
        {
            var result = new ServiceResult();
            try
            {
                var promocionPorComida = _promocionPorComidaRepository.Find(PrSe_Id);
                if (promocionPorComida != null)
                {
                    return result.Ok(promocionPorComida);
                }
                else
                {
                    return result.Error($"No se encontró la Promoción por Comida con ID {PrSe_Id}");
                }
            }
            catch (Exception ex)
            {
                return result.Error($"No se encontró la Promoción por Comida con ID {PrSe_Id}");
            }
        }

        public ServiceResult CrearPromocionPorComida(tbPromocionesPorComidas item)
        {
            var result = new ServiceResult();
            try
            {
                var response = _promocionPorComidaRepository.Insert(item);
                if (response.CodeStatus == 1)
                {
                    return result.Ok("Promoción por Comida creada con éxito", response);
                }
                else
                {
                    return result.Error("Por favor, rellene todos los campos");
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error al guardar la información de la Promoción por Comida");
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
                    list.MessageStatus = (list.CodeStatus == 0) ? "Ya existe una Promoción por Comida con ese nombre" : list.MessageStatus;
                    return result.Error(list);
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
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
                    list.MessageStatus = (list.CodeStatus == 0) ? "No se encontró la Promoción por Comida a eliminar" : list.MessageStatus;
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

        public ServiceResult LlenarPromocionPorSucursal(int PPSu_Id)
        {
            var result = new ServiceResult();
            try
            {
                var promocionPorSucursal = _promocionPorSucursalRepository.Find(PPSu_Id);
                if (promocionPorSucursal != null)
                {
                    return result.Ok(promocionPorSucursal);
                }
                else
                {
                    return result.Error($"No se encontró la Promoción por Sucursal con ID {PPSu_Id}");
                }
            }
            catch (Exception ex)
            {
                return result.Error($"No se encontró la Promoción por Sucursal con ID {PPSu_Id}");
            }
        }

        public ServiceResult CrearPromocionPorSucursal(tbPromocionesPorSusursales item)
        {
            var result = new ServiceResult();
            try
            {
                var response = _promocionPorSucursalRepository.Insert(item);
                if (response.CodeStatus == 1)
                {
                    return result.Ok("Promoción por Sucursal creada con éxito", response);
                }
                else
                {
                    return result.Error("Por favor, rellene todos los campos");
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error al guardar la información de la Promoción por Sucursal");
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
                    list.MessageStatus = (list.CodeStatus == 0) ? "Ya existe una Promoción por Sucursal con ese nombre" : list.MessageStatus;
                    return result.Error(list);
                }
            }
            catch (Exception ex)
            {
                return result.Error("Error de capa 8");
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
                    list.MessageStatus = (list.CodeStatus == 0) ? "No se encontró la Promoción por Sucursal a eliminar" : list.MessageStatus;
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
    }
}
