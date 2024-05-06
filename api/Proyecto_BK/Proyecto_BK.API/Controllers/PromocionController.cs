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

        [HttpGet("API/[controller]/Find")]
        public IActionResult Find(int Prom_Id)
        {
            var result = _restauranteServices.LlenarPromocion(Prom_Id);
            return Ok(result);
        }

        [HttpPost("API/[controller]/Insert")]
        public IActionResult Create(PromocionViewModel json)
        {
            _mapper.Map<tbPromociones>(json);
            var modelo = new tbPromociones()
            {
                Prom_Descripcion = json.Prom_Descripcion,
                Prom_Precio = json.Prom_Precio,
                Prom_Imagen = json.Prom_Imagen,
                Prom_Dia = json.Prom_Dia,
                Prom_Usua_Creacion = 1,
                Prom_Fecha_Creacion = DateTime.Now
            };
            var response = _restauranteServices.CrearPromocion(modelo);
            return Ok(response);
        }

        [HttpPut("API/[controller]/Update")]
        public IActionResult Update(PromocionViewModel json)
        {
            _mapper.Map<tbPromociones>(json);
            var modelo = new tbPromociones()
            {
                Prom_Id = Convert.ToInt32(json.Prom_Id),
                Prom_Descripcion = json.Prom_Descripcion,
                Prom_Precio = json.Prom_Precio,
                Prom_Imagen = json.Prom_Imagen,
                Prom_Dia = json.Prom_Dia,
                Prom_Usua_Modifica = 1,
                Prom_Fecha_Modifica = DateTime.Now
            };
            var list = _restauranteServices.EditarPromocion(modelo);
            return Ok(list);
        }

        [HttpDelete("API/[controller]/Delete")]
        public IActionResult Delete(int Prom_Id)
        {
            var response = _restauranteServices.EliminarPromocion(Prom_Id);
            return Ok(response);
        }
    }
}
