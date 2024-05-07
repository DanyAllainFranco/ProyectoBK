using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
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
    public class PromocionController : Controller
    {
        private readonly RestauranteServices _restauranteServices;
        private readonly IMapper _mapper;

        public PromocionController(RestauranteServices restauranteServices, IMapper mapper)
        {
            _restauranteServices = restauranteServices;
            _mapper = mapper;
        }

        [HttpGet("API/[controller]/List")]
        public IActionResult List()
        {
            var list = _restauranteServices.ListPromocion();
            return Ok(list.Data);
        }

        [HttpGet("API/[controller]/DropDown")]
        public IActionResult ListPromocionDrop()
        {
            var list = _restauranteServices.ListPromocion();
            var drop = list.Data as List<tbPromociones>;
            var rol = drop.Select(x => new SelectListItem
            {
                Text = x.Prom_Descripcion,
                Value = x.Prom_Id.ToString()
            }).ToList();


            rol.Insert(0, new SelectListItem { Text = "-- SELECCIONE --", Value = "0" });
            return Ok(rol.ToList());
        }

        [HttpGet("API/[controller]/Fill/{id}")]
        public IActionResult Fill(string id)
        {
            var list = _restauranteServices.LlenarPromocion(id);
            return Json(list.Data);
        }


        [HttpPost("API/[controller]/Insert")]
        public IActionResult Create(PromocionViewModel item)
        {
            var model = _mapper.Map<tbPromociones>(item);
            var modelo = new tbPromociones()
            {
                Prom_Descripcion = item.Prom_Descripcion,
                Prom_Precio = item.Prom_Precio,
                Prom_Imagen = item.Prom_Imagen,
                Prom_Dia = item.Prom_Dia,
                Prom_Usua_Creacion = 1,
                Prom_Fecha_Creacion = DateTime.Now
            };
            var list = _restauranteServices.CrearPromocion(modelo);

            return Ok(new { success = true, message = list.Message });
        }

        [HttpPut("API/[controller]/Update")]
        public IActionResult Update(PromocionViewModel item)
        {
            {
                var model = _mapper.Map<tbPromociones>(item);
                var modelo = new tbPromociones()
                {
                    Prom_Id = item.Prom_Id,
                    Prom_Descripcion = item.Prom_Descripcion,
                    Prom_Precio = item.Prom_Precio,
                    Prom_Imagen = item.Prom_Imagen,
                    Prom_Dia = item.Prom_Dia,
                    Prom_Usua_Modifica = 1,
                    Prom_Fecha_Modifica = DateTime.Now
                };
                var list = _restauranteServices.EditarPromocion(modelo);

                return Ok(new { success = true, message = list.Message });
            }
        }

        [HttpDelete("API/[controller]/Delete")]
        public IActionResult Delete(int Prom_Id)
        {
            var response = _restauranteServices.EliminarPromocion(Prom_Id);
            return Ok(response);
        }
    }
}
