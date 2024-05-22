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
        [HttpGet("API/[controller]/MostrarAlimentos/{Paqe_Id}")]
        public IActionResult MostrarAlimentos(int Paqe_Id)
        {
            var list = _restauranteServices.ListAlimentosAgregados(Paqe_Id);
            return Ok(list.Data);
        }
        [HttpGet("API/[controller]/MostrarBebidas/{Paqe_Id}")]
        public IActionResult MostrarBebidas(int Paqe_Id)
        {
            var list = _restauranteServices.ListBebidasAgregados(Paqe_Id);
            return Ok(list.Data);
        }

        [HttpGet("API/[controller]/MostrarPostres/{Paqe_Id}")]
        public IActionResult MostrarPostres(int Paqe_Id)
        {
            var list = _restauranteServices.ListPostresAgregados(Paqe_Id);
            return Ok(list.Data);
        }

        [HttpGet("API/[controller]/MostrarComplementos/{Paqe_Id}")]
        public IActionResult MostrarComplementos(int Paqe_Id)
        {
            var list = _restauranteServices.ListComplementosAgregados(Paqe_Id);
            return Ok(list.Data);
        }
        [HttpPost("API/[controller]/Insert")]
        public IActionResult Create(PaquetePorComidaViewModel json)
        {
            _mapper.Map<tbPaquetesPorComidas>(json);
            var modelo = new tbPaquetesPorComidas()
            {
                Paqe_Id = json.Paqe_Id,
                Prod_Id = json.Prod_Id,
                PaCo_Cantidad = json.PaCo_Cantidad,
                PaCo_Identificador = json.PaCo_Identificador,
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
                Prod_Id = json.Prod_Id,
                PaCo_Cantidad = json.PaCo_Cantidad,
                PaCo_Identificador = json.PaCo_Identificador,
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
