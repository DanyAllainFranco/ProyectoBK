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
    public class CargoController : Controller
    {
        private readonly AccesoServices _accesoServices;
        private readonly IMapper _mapper;

        public CargoController(AccesoServices AccesoServices, IMapper mapper)
        {
            _accesoServices = AccesoServices;
            _mapper = mapper;
        }

        [HttpGet("API/[controller]/List")]
        public IActionResult List()
        {
            var list = _accesoServices.ListCargo();
            return Ok(list.Data);
        }

        [HttpGet("API/[controller]/Find")]
        public IActionResult Find(int Carg_Id)
        {
            var result = _accesoServices.LlenarCargo(Carg_Id);
            return Ok(result);
        }

        [HttpPost("API/[controller]/Insert")]
        public IActionResult Create(CargoViewModel json)
        {
            _mapper.Map<tbCargos>(json);
            var modelo = new tbCargos()
            {
                Carg_Descripcion = json.Carg_Descripcion,
                Carg_Usua_Creacion = json.Carg_Usua_Creacion,
                Carg_Fecha_Creacion = json.Carg_Fecha_Creacion
            };
            var response = _accesoServices.CrearCargo(modelo);
            return Ok(response);
        }

        [HttpPut("API/[controller]/Update")]
        public IActionResult Update(CargoViewModel json)
        {
            _mapper.Map<tbCargos>(json);
            var modelo = new tbCargos()
            {
                Carg_Id = Convert.ToInt32(json.Carg_Id),
                Carg_Descripcion = json.Carg_Descripcion,
                Carg_Usua_Modifica = json.Carg_Usua_Modifica,
                Carg_Fecha_Modifica = json.Carg_Fecha_Modifica
            };
            var list = _accesoServices.EditarCargo(modelo);
            return Ok(list);
        }

        [HttpDelete("API/[controller]/Delete")]
        public IActionResult Delete(int Carg_Id)
        {
            var response = _accesoServices.EliminarCargo(Carg_Id);
            return Ok(response);
        }
    }
}
