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
    public class PaqueteController : Controller
    {
        private readonly RestauranteServices _restauranteServices;
        private readonly IMapper _mapper;

        public PaqueteController(RestauranteServices restauranteServices, IMapper mapper)
        {
            _restauranteServices = restauranteServices;
            _mapper = mapper;
        }

        [HttpGet("API/[controller]/List")]
        public IActionResult List()
        {
            var list = _restauranteServices.ListPaquete();
            return Ok(list);
        }

        [HttpGet("API/[controller]/Find")]
        public IActionResult Find(int Paqe_Id)
        {
            var result = _restauranteServices.LlenarPaquete(Paqe_Id);
            return Ok(result);
        }

        [HttpPost("API/[controller]/Insert")]
        public IActionResult Create(PaqueteViewModel json)
        {
            _mapper.Map<tbPaquetes>(json);
            var modelo = new tbPaquetes()
            {
                Paqe_Descripcion = json.Paqe_Descripcion,
                Paqe_Precio = json.Paqe_Precio,
                Paqe_Imagen = json.Paqe_Imagen,
                Paqe_Usua_Creacion = 1,
                Paqe_Fecha_Creacion = DateTime.Now
            };
            var response = _restauranteServices.CrearPaquete(modelo);
            return Ok(response);
        }

        [HttpPut("API/[controller]/Update")]
        public IActionResult Update(PaqueteViewModel json)
        {
            _mapper.Map<tbPaquetes>(json);
            var modelo = new tbPaquetes()
            {
                Paqe_Id = Convert.ToInt32(json.Paqe_Id),
                Paqe_Descripcion = json.Paqe_Descripcion,
                Paqe_Precio = json.Paqe_Precio,
                Paqe_Imagen = json.Paqe_Imagen,
                Paqe_Usua_Modifica = 1,
                Paqe_Fecha_Modifica = DateTime.Now
            };
            var list = _restauranteServices.EditarPaquete(modelo);
            return Ok(list);
        }

        [HttpDelete("API/[controller]/Delete")]
        public IActionResult Delete(int Paqe_Id)
        {
            var response = _restauranteServices.EliminarPaquete(Paqe_Id);
            return Ok(response);
        }
    }
}
