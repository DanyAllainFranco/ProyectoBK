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
                Comp_Usua_Creacion = json.Comp_Usua_Creacion,
                Comp_Fecha_Creacion = json.Comp_Fecha_Creacion
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
                Comp_Usua_Modifica = json.Comp_Usua_Modifica,
                Comp_Fecha_Modifica = json.Comp_Fecha_Modifica
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
