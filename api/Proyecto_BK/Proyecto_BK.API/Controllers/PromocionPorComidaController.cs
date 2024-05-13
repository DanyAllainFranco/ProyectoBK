using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Proyecto_BK.BusinessLogic.Services;
using Proyecto_BK.Common.Models;
using Proyecto_BK.Entities;
//using Proyecto_BK.Entities.Entities;
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

        [HttpGet("API/[controller]/Fill/{id}")]
        public IActionResult Fill(string id)
        {
            var list = _restauranteServices.LlenarPromocionPorComida(id);
            return Json(list.Data);
        }

   

        [HttpPost("API/[controller]/Insert")]
        public IActionResult Create(PromocionPorComidaViewModel item)
        {
            var model = _mapper.Map<tbPromocionesPorComidas>(item);
            var modelo = new tbPromocionesPorComidas()
            {
                Prom_Id = item.Prom_Id,
                Bebi_Id = item.Bebi_Id,
                Post_id = item.Post_id,
                Comp_Id = item.Comp_Id,
                Alim_Id = item.Alim_Id,
                PrSe_Usua_Creacion = 1,
                PrSe_Fecha_Creacion = DateTime.Now
            };
            var list = _restauranteServices.CrearPromocionPorComida(modelo);

            return Ok(new { success = true, message = list.Message });
        }

        [HttpPut("API/[controller]/Update")]
        public IActionResult Update(PromocionPorComidaViewModel item)
        {
            {
                var model = _mapper.Map<tbPromocionesPorComidas>(item);
                var modelo = new tbPromocionesPorComidas()
                {
                    PrSe_Id = item.PrSe_Id,
                    Prom_Id = item.Prom_Id,
                    Bebi_Id = item.Bebi_Id,
                    Post_id = item.Post_id,
                    Comp_Id = item.Comp_Id,
                    Alim_Id = item.Alim_Id,
                    PrSe_Usua_Modifica = 1,
                    PrSe_Fecha_Modifica = DateTime.Now
                };
                var list = _restauranteServices.EditarPromocionPorComida(modelo);

                return Ok(new { success = true, message = list.Message });
            }
        }

        [HttpDelete("API/[controller]/Delete")]
        public IActionResult Delete(int PrSe_Id)
        {
            var response = _restauranteServices.EliminarPromocionPorComida(PrSe_Id);
            return Ok(response);
        }
    }
}
