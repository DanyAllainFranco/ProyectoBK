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

        [HttpGet("API/[controller]/Find")]
        public IActionResult Find(int PPSu_Id)
        {
            var result = _restauranteServices.LlenarPromocionPorSucursal(PPSu_Id);
            return Ok(result);
        }

        [HttpPost("API/[controller]/Insert")]
        public IActionResult Create(PromocionPorSucursalViewModel json)
        {
            _mapper.Map<tbPromocionesPorSusursales>(json);
            var modelo = new tbPromocionesPorSusursales()
            {
                Prom_Id = json.Prom_Id,
                Sucu_Id = json.Sucu_Id,
                PPSu_Usua_Creacion = json.PPSu_Usua_Creacion,
                PPSu_Fecha_Creacion = json.PPSu_Fecha_Creacion
            };
            var response = _restauranteServices.CrearPromocionPorSucursal(modelo);
            return Ok(response);
        }

        [HttpPut("API/[controller]/Update")]
        public IActionResult Update(PromocionPorSucursalViewModel json)
        {
            _mapper.Map<tbPromocionesPorSusursales>(json);
            var modelo = new tbPromocionesPorSusursales()
            {
                PPSu_Id = json.PPSu_Id,
                Prom_Id = json.Prom_Id,
                Sucu_Id = json.Sucu_Id,
                PPSu_Usua_Modifica = json.PPSu_Usua_Modifica,
                PPSu_Fecha_Modifica = json.PPSu_Fecha_Modifica
            };
            var list = _restauranteServices.EditarPromocionPorSucursal(modelo);
            return Ok(list);
        }

        [HttpDelete("API/[controller]/Delete")]
        public IActionResult Delete(int PPSu_Id)
        {
            var response = _restauranteServices.EliminarPromocionPorSucursal(PPSu_Id);
            return Ok(response);
        }
    }
}
