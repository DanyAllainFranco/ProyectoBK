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
    public class BebidaController : Controller
    {
        private readonly RestauranteServices _restauranteServices;
        private readonly IMapper _mapper;

        public BebidaController(RestauranteServices restauranteServices, IMapper mapper)
        {
            _restauranteServices = restauranteServices;
            _mapper = mapper;
        }

        [HttpGet("API/[controller]/List")]
        public IActionResult List()
        {
            var list = _restauranteServices.ListBebida();
            return Ok(list);
        }

        [HttpGet("API/[controller]/Find")]
        public IActionResult Find(int Bebi_Id)
        {
            var result = _restauranteServices.LlenarBebida(Bebi_Id);
            return Ok(result);
        }

        [HttpPost("API/[controller]/Insert")]
        public IActionResult Create(BebidaViewModel json)
        {
            _mapper.Map<tbBebidas>(json);
            var modelo = new tbBebidas()
            {
                Bebi_Descripcion = json.Bebi_Descripcion,
                Bebi_Precio = json.Bebi_Precio,
                Bebi_Imagen = json.Bebi_Imagen,
                Bebi_Usua_Creacion = json.Bebi_Usua_Creacion,
                Bebi_Fecha_Creacion = json.Bebi_Fecha_Creacion
            };
            var response = _restauranteServices.CrearBebida(modelo);
            return Ok(response);
        }

        [HttpPut("API/[controller]/Update")]
        public IActionResult Update(BebidaViewModel json)
        {
            _mapper.Map<tbBebidas>(json);
            var modelo = new tbBebidas()
            {
                Bebi_Id = Convert.ToInt32(json.Bebi_Id),
                Bebi_Descripcion = json.Bebi_Descripcion,
                Bebi_Precio = json.Bebi_Precio,
                Bebi_Imagen = json.Bebi_Imagen,
                Bebi_Usua_Modifica = json.Bebi_Usua_Modifica,
                Bebi_Fecha_Modifica = json.Bebi_Fecha_Modifica
            };
            var list = _restauranteServices.EditarBebida(modelo);
            return Ok(list);
        }

        [HttpDelete("API/[controller]/Delete")]
        public IActionResult Delete(int Bebi_Id)
        {
            var response = _restauranteServices.EliminarBebida(Bebi_Id);
            return Ok(response);
        }
    }
}
