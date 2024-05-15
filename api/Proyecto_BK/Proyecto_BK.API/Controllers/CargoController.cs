using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
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
    public class CargoController : Controller
    {
        private readonly AccesoServices _accesoServices;
        private readonly IMapper _mapper;

        public CargoController(AccesoServices AccesoServices, IMapper mapper)
        {
            _accesoServices = AccesoServices;
            _mapper = mapper;
        }

        [HttpGet("API/[controller]/DropDown")]
        public IActionResult ListCargoDrop()
        {
            var list = _accesoServices.ListCargo();
            var drop = list.Data as List<tbCargos>;
            var rol = drop.Select(x => new SelectListItem
            {
                Text = x.Carg_Descripcion,
                Value = x.Carg_Id.ToString()
            }).ToList();


            rol.Insert(0, new SelectListItem { Text = "-- SELECCIONE --", Value = "0" });
            return Ok(rol.ToList());
        }

        [HttpGet("API/[controller]/List")]
        public IActionResult List()
        {
            var list = _accesoServices.ListCargo();
            return Ok(list.Data);
        }

        [HttpGet("API/[controller]/Find/{Carg_Id}")]
        public IActionResult Find(int Carg_Id)
        {
            var result = _accesoServices.LlenarCargo(Carg_Id);
            return Ok(result.Data);
        }

        [HttpPost("API/[controller]/Insert")]
        public IActionResult Create(CargoViewModel json)
        {
            _mapper.Map<tbCargos>(json);
            var modelo = new tbCargos()
            {
                Carg_Descripcion = json.Carg_Descripcion,
                Carg_Usua_Creacion = 1,
                Carg_Fecha_Creacion = DateTime.Now
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
                Carg_Usua_Modifica = 1,
                Carg_Fecha_Modifica = DateTime.Now
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
