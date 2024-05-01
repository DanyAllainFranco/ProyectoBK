using Proyecto_BK.DataAccess.Repository;
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
               SucursalRepository sucursalRepository
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
        }


        #region Alimentos
        #endregion

        #region Bebidas
        #endregion

        #region Combo Personal
        #endregion

        #region Complemento
        #endregion

        #region Paquete
        #endregion

        #region Paquete por Comidas
        #endregion

        #region Postres
        #endregion

        #region Promocion
        #endregion

        #region Promocion por Comida
        #endregion

        #region Promocion por Sucursal
        #endregion

        #region Sucursal
        #endregion
    }
}
