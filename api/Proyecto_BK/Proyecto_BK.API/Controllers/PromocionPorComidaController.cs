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
    public class PromocionPorComidaController : Controller
    {
        private readonly RestauranteServices _restauranteServices;
        private readonly IMapper _mapper;

        public PromocionPorComidaController(RestauranteServices restauranteServices, IMapper mapper)
        {
            _restauranteServices = restauranteServices;
            _mapper = mapper;
        }

        [HttpGet("API/[controller]/List")]
        public IActionResult List()
        {
            var list = _restauranteServices.ListPromocionPorComida();
            return Ok(list.Data);
        }

        [HttpGet("API/[controller]/Find")]
        public IActionResult Find(int PrSe_Id)
        {
            var result = _restauranteServices.LlenarPromocionPorComida(PrSe_Id);
            return Ok(result);
        }

        [HttpPost("API/[controller]/Insert")]
        public IActionResult Create(PromocionPorComidaViewModel json)
        {
            _mapper.Map<tbPromocionesPorComidas>(json);
            var modelo = new tbPromocionesPorComidas()
            {
                Prom_Id = json.Prom_Id,
                Bebi_Id = json.Bebi_Id,
                Post_id = json.Post_id,
                Comp_Id = json.Comp_Id,
                Alim_Id = json.Alim_Id,
                PrSe_Usua_Creacion = 1,
                PrSe_Fecha_Creacion = DateTime.Now
            };
            var response = _restauranteServices.CrearPromocionPorComida(modelo);
            return Ok(response);
        }

        [HttpPut("API/[controller]/Update")]
        public IActionResult Update(PromocionPorComidaViewModel json)
        {
            _mapper.Map<tbPromocionesPorComidas>(json);
            var modelo = new tbPromocionesPorComidas()
            {
                PrSe_Id = json.PrSe_Id,
                Prom_Id = json.Prom_Id,
                Bebi_Id = json.Bebi_Id,
                Post_id = json.Post_id,
                Comp_Id = json.Comp_Id,
                Alim_Id = json.Alim_Id,
                PrSe_Usua_Modifica = 1,
                PrSe_Fecha_Modifica = DateTime.Now
            };
            var list = _restauranteServices.EditarPromocionPorComida(modelo);
            return Ok(list);
        }

        [HttpDelete("API/[controller]/Delete")]
        public IActionResult Delete(int PrSe_Id)
        {
            var response = _restauranteServices.EliminarPromocionPorComida(PrSe_Id);
            return Ok(response);
        }
    }
}
