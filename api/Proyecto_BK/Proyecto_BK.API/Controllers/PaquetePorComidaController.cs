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
    public class PaquetePorComidaController : Controller
    {
        private readonly RestauranteServices _restauranteServices;
        private readonly IMapper _mapper;

        public PaquetePorComidaController(RestauranteServices restauranteServices, IMapper mapper)
        {
            _restauranteServices = restauranteServices;
            _mapper = mapper;
        }

        [HttpGet("API/[controller]/List")]
        public IActionResult List()
        {
            var list = _restauranteServices.ListPaquetePorComida();
            return Ok(list);
        }

        [HttpGet("API/[controller]/Find")]
        public IActionResult Find(int PaCo_Id)
        {
            var result = _restauranteServices.LlenarPaquetePorComida(PaCo_Id);
            return Ok(result);
        }

        [HttpPost("API/[controller]/Insert")]
        public IActionResult Create(PaquetePorComidaViewModel json)
        {
            _mapper.Map<tbPaquetesPorComidas>(json);
            var modelo = new tbPaquetesPorComidas()
            {
                Paqe_Id = json.Paqe_Id,
                Bebi_Id = json.Bebi_Id,
                Post_id = json.Post_id,
                Comp_Id = json.Comp_Id,
                Alim_Id = json.Alim_Id,
                PaCo_Usua_Creacion = 1,
                PaCo_Fecha_Creacion = DateTime.Now
            };
            var response = _restauranteServices.CrearPaquetePorComida(modelo);
            return Ok(response);
        }

        [HttpPut("API/[controller]/Update")]
        public IActionResult Update(PaquetePorComidaViewModel json)
        {
            _mapper.Map<tbPaquetesPorComidas>(json);
            var modelo = new tbPaquetesPorComidas()
            {
                PaCo_Id = Convert.ToInt32(json.PaCo_Id),
                Paqe_Id = json.Paqe_Id,
                Bebi_Id = json.Bebi_Id,
                Post_id = json.Post_id,
                Comp_Id = json.Comp_Id,
                Alim_Id = json.Alim_Id,
                PaCo_Usua_Modifica = 1,
                PaCo_Fecha_Modifica = DateTime.Now
            };
            var list = _restauranteServices.EditarPaquetePorComida(modelo);
            return Ok(list);
        }

        [HttpDelete("API/[controller]/Delete")]
        public IActionResult Delete(int PaCo_Id)
        {
            var response = _restauranteServices.EliminarPaquetePorComida(PaCo_Id);
            return Ok(response);
        }
    }
}
