using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Proyecto_BK.BusinessLogic.Services;
using Proyecto_BK.Common.Models;
using Proyecto_BK.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Proyecto_BK.API.Controllers
{
    [ApiController]
    public class PromocionPorSucursalController : Controller
    {
        private readonly RestauranteServices _restauranteServices;
        private readonly IMapper _mapper;

        public PromocionPorSucursalController(RestauranteServices restauranteServices, IMapper mapper)
        {
            _restauranteServices = restauranteServices;
            _mapper = mapper;
        }

        [HttpGet("API/[controller]/List")]
        public IActionResult List()
        {
            var list = _restauranteServices.ListPromocionPorSucursal();
            return Ok(list.Data);
        }

        [HttpGet("API/[controller]/Fill/{id}")]
        public IActionResult Fill(string id)
        {
            var list = _restauranteServices.LlenarPromocionPorSucursal(id);
            return Json(list.Data);
        }


        [HttpPost("API/[controller]/Insert")]
        public IActionResult Create(PromocionPorSucursalViewModel item)
        {
            var model = _mapper.Map<tbPromocionesPorSusursales>(item);
            var modelo = new tbPromocionesPorSusursales()
            {
                Prom_Id = item.Prom_Id,
                Sucu_Id = item.Sucu_Id,
                PPSu_Usua_Creacion = 1,
                PPSu_Fecha_Creacion = DateTime.Now
            };
            var list = _restauranteServices.CrearPromocionPorSucursal(modelo);

            return Ok(new { success = true, message = list.Message });
        }

        [HttpPut("API/[controller]/Update")]
        public IActionResult Update(PromocionPorSucursalViewModel item)
        {
            {
                var model = _mapper.Map<tbPromocionesPorSusursales>(item);
                var modelo = new tbPromocionesPorSusursales()
                {
                    PPSu_Id = item.PPSu_Id,
                    Prom_Id = item.Prom_Id,
                    Sucu_Id = item.Sucu_Id,
                    PPSu_Usua_Modifica = 1,
                    PPSu_Fecha_Modifica = DateTime.Now
                };
                var list = _restauranteServices.EditarPromocionPorSucursal(modelo);

                return Ok(new { success = true, message = list.Message });
            }
        }

        [HttpDelete("API/[controller]/Delete")]
        public IActionResult Delete(int PPSu_Id)
        {
            var response = _restauranteServices.EliminarPromocionPorSucursal(PPSu_Id);
            return Ok(response);
        }
    }
}
