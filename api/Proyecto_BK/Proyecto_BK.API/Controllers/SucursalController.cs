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
    public class SucursalController : Controller
    {
        private readonly RestauranteServices _restauranteServices;
        private readonly IMapper _mapper;

        public SucursalController(RestauranteServices restauranteServices, IMapper mapper)
        {
            _restauranteServices = restauranteServices;
            _mapper = mapper;
        }

        [HttpGet("API/[controller]/List")]
        public IActionResult List()
        {
            var list = _restauranteServices.ListSucursal();
            return Ok(list);
        }

        [HttpGet("API/[controller]/Find")]
        public IActionResult Find(int Sucu_Id)
        {
            var result = _restauranteServices.LlenarSucursal(Sucu_Id);
            return Ok(result);
        }

        [HttpPost("API/[controller]/Insert")]
        public IActionResult Create(SucursalViewModel json)
        {
            _mapper.Map<tbSucursales>(json);
            var modelo = new tbSucursales()
            {
                Sucu_Descripcion = json.Sucu_Descripcion,
                Muni_Codigo = json.Muni_Codigo,
                Empl_Id = json.Empl_Id,
                Sucu_Usua_Creacion = json.Sucu_Usua_Creacion,
                Sucu_Fecha_Creacion = json.Sucu_Fecha_Creacion
            };
            var response = _restauranteServices.CrearSucursal(modelo);
            return Ok(response);
        }

        [HttpPut("API/[controller]/Update")]
        public IActionResult Update(SucursalViewModel json)
        {
            _mapper.Map<tbSucursales>(json);
            var modelo = new tbSucursales()
            {
                Sucu_Id = json.Sucu_Id,
                Sucu_Descripcion = json.Sucu_Descripcion,
                Muni_Codigo = json.Muni_Codigo,
                Empl_Id = json.Empl_Id,
                Sucu_Usua_Modifica = json.Sucu_Usua_Modifica,
                Sucu_Fecha_Modifica = json.Sucu_Fecha_Modifica
            };
            var list = _restauranteServices.EditarSucursal(modelo);
            return Ok(list);
        }

        [HttpDelete("API/[controller]/Delete")]
        public IActionResult Delete(int Sucu_Id)
        {
            var response = _restauranteServices.EliminarSucursal(Sucu_Id);
            return Ok(response);
        }
    }
}
