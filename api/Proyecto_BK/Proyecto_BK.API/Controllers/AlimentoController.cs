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
    public class AlimentoController : Controller
    {
        private readonly RestauranteServices _restauranteServices;
        private readonly IMapper _mapper;

        public AlimentoController(RestauranteServices restauranteServices, IMapper mapper)
        {
            _restauranteServices = restauranteServices;
            _mapper = mapper;
        }

        [HttpGet("API/[controller]/List")]
        public IActionResult List()
        {
            var list = _restauranteServices.ListAlimento();
            return Ok(list.Data);
        }

        [HttpGet("API/[controller]/Find")]
        public IActionResult Find(int Alim_Id)
        {
            var result = _restauranteServices.LlenarAlimento(Alim_Id);
            return Ok(result);
        }

        [HttpPost("API/[controller]/Insert")]
        public IActionResult Create(AlimentoViewModel json)
        {
            _mapper.Map<tbAlimentos>(json);
            var modelo = new tbAlimentos()
            {
                Alim_Descripcion = json.Alim_Descripcion,
                Alim_Precio = json.Alim_Precio,
                Alim_Imagen = json.Alim_Imagen,
                Alim_Usua_Creacion = 1,
                Alim_Fecha_Creacion = DateTime.Now
            };
            var response = _restauranteServices.CrearAlimento(modelo);
            return Ok(response);
        }

        [HttpPut("API/[controller]/Update")]
        public IActionResult Update(AlimentoViewModel json)
        {
            _mapper.Map<tbAlimentos>(json);
            var modelo = new tbAlimentos()
            {
                Alim_Id = Convert.ToInt32(json.Alim_Id),
                Alim_Descripcion = json.Alim_Descripcion,
                Alim_Precio = json.Alim_Precio,
                Alim_Imagen = json.Alim_Imagen,
                Alim_Usua_Modifica = 1,
                Alim_Fecha_Modifica = DateTime.Now
            };
            var list = _restauranteServices.EditarAlimento(modelo);
            return Ok(list);
        }

        [HttpDelete("API/[controller]/Delete")]
        public IActionResult Delete(int Alim_Id)
        {
            var response = _restauranteServices.EliminarAlimento(Alim_Id);
            return Ok(response);
        }
    }
}
