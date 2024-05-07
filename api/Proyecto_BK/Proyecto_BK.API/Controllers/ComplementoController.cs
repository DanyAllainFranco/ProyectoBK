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


        [HttpGet("API/[controller]/Find")]
        public IActionResult Find(int Comp_Id)
        {
            var result = _restauranteServices.LlenarComplemento(Comp_Id);
            return Ok(result);
        }

        [HttpPost("API/[controller]/Insert")]
        public IActionResult Create(ComplementoViewModel json)
        {
            _mapper.Map<tbComplementos>(json);
            var modelo = new tbComplementos()
            {
                Comp_Descripcion = json.Comp_Descripcion,
                Comp_Precio = json.Comp_Precio,
                Comp_Imagen = json.Comp_Imagen,
                Comp_Usua_Creacion = 1,
                Comp_Fecha_Creacion = DateTime.Now
            };
            var response = _restauranteServices.CrearComplemento(modelo);
            return Ok(response);
        }

        [HttpPut("API/[controller]/Update")]
        public IActionResult Update(ComplementoViewModel json)
        {
            _mapper.Map<tbComplementos>(json);
            var modelo = new tbComplementos()
            {
                Comp_Id = Convert.ToInt32(json.Comp_Id),
                Comp_Descripcion = json.Comp_Descripcion,
                Comp_Precio = json.Comp_Precio,
                Comp_Imagen = json.Comp_Imagen,
                Comp_Usua_Modifica = 1,
                Comp_Fecha_Modifica = DateTime.Now
            };
            var list = _restauranteServices.EditarComplemento(modelo);
            return Ok(list);
        }

        [HttpDelete("API/[controller]/Delete")]
        public IActionResult Delete(int Comp_Id)
        {
            var response = _restauranteServices.EliminarComplemento(Comp_Id);
            return Ok(response);
        }
    }
}
