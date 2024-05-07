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
    public class ComplementoController : Controller
    {
        private readonly RestauranteServices _restauranteServices;
        private readonly IMapper _mapper;

        public ComplementoController(RestauranteServices restauranteServices, IMapper mapper)
        {
            _restauranteServices = restauranteServices;
            _mapper = mapper;
        }

        [HttpGet("API/[controller]/List")]
        public IActionResult List()
        {
            var list = _restauranteServices.ListComplemento();
            return Ok(list.Data);
        }

        [HttpGet("API/[controller]/DropDown")]
        public IActionResult ListComplementoDrop()
        {
            var list = _restauranteServices.ListComplemento();
            var drop = list.Data as List<tbComplementos>;
            var rol = drop.Select(x => new SelectListItem
            {
                Text = x.Comp_Descripcion,
                Value = x.Comp_Id.ToString()
            }).ToList();


            rol.Insert(0, new SelectListItem { Text = "-- SELECCIONE --", Value = "0" });
            return Ok(rol.ToList());
        }


        [HttpGet("API/[controller]/Fill/{id}")]
        public IActionResult Fill(string id)
        {
            var list = _restauranteServices.LlenarComplemento(id);
            return Json(list.Data);
        }

        [HttpPost("API/[controller]/Insert")]
        public IActionResult Create(ComplementoViewModel item)
        {
            var model = _mapper.Map<tbComplementos>(item);
            var modelo = new tbComplementos()
            {
                Comp_Descripcion = item.Comp_Descripcion,
                Comp_Precio = item.Comp_Precio,
                Comp_Imagen = item.Comp_Imagen,
                Comp_Usua_Creacion = 1,
                Comp_Fecha_Creacion = DateTime.Now
            };
            var list = _restauranteServices.CrearComplemento(modelo);

            return Ok(new { success = true, message = list.Message });
        }

        [HttpPut("API/[controller]/Update")]
        public IActionResult Update(ComplementoViewModel item)
        {
            {
                var model = _mapper.Map<tbComplementos>(item);
                var modelo = new tbComplementos()
                {
                    Comp_Id = item.Comp_Id,
                    Comp_Descripcion = item.Comp_Descripcion,
                    Comp_Precio = item.Comp_Precio,
                    Comp_Imagen = item.Comp_Imagen,
                    Comp_Usua_Creacion = 1,
                    Comp_Fecha_Creacion = DateTime.Now
                };
                var list = _restauranteServices.EditarComplemento(modelo);

                return Ok(new { success = true, message = list.Message });
            }
        }

            [HttpDelete("API/[controller]/Delete")]
            public IActionResult Delete(int Comp_Id)
            {
                var response = _restauranteServices.EliminarComplemento(Comp_Id);
                return Ok(response);
            }
    }
}
