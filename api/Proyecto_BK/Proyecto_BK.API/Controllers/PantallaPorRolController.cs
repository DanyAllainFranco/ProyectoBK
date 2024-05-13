using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Proyecto_BK.BusinessLogic.Services;
using Proyecto_BK.Common.Models;
using Proyecto_BK.Entities;
using Proyecto_BK.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Proyecto_BK.API.Controllers
{
    [ApiController]
    public class PantallaPorRolController : Controller
    {
        private readonly AccesoServices _accesoServices;
        private readonly IMapper _mapper;

        public PantallaPorRolController(AccesoServices accesoServices, IMapper mapper)
        {
            _accesoServices = accesoServices;
            _mapper = mapper;
        }

        [HttpGet("API/[controller]/List")]
        public IActionResult List()
        {
            var list = _accesoServices.ListPantallasPorRoles();
            return Ok(list);
        }

        [HttpGet("API/[controller]/Find")]
        public IActionResult Find(int Paro_Id)
        {
            var result = _accesoServices.LlenarPantallaPorRol(Paro_Id);
            return Ok(result);
        }

        [HttpPost("API/[controller]/Insert")]
        public IActionResult Create(PantallaPorRolViewModel json)
        {
            _mapper.Map<tbPantallasPorRoles>(json);
            var modelo = new tbPantallasPorRoles()
            {
                Rol_Id = json.Rol_Id,
                Pant_Id = json.Pant_Id,
                Paro_Usua_Creacion = 1,
                Paro_Fecha_Creacion = DateTime.Now
            };
            var response = _accesoServices.CrearPantallaPorRol(modelo);
            return Ok(response);
        }

        [HttpPut("API/[controller]/Update")]
        public IActionResult Update(PantallaPorRolViewModel json)
        {
            _mapper.Map<tbPantallasPorRoles>(json);
            var modelo = new tbPantallasPorRoles()
            {
                Paro_Id = Convert.ToInt32(json.Paro_Id),
                Rol_Id = json.Rol_Id,
                Pant_Id = json.Pant_Id,
                Paro_Usua_Modifica = 1,
                Paro_Fecha_Modifica = DateTime.Now
            };
            var list = _accesoServices.EditarPantallaPorRol(modelo);
            return Ok(list);
        }

        [HttpDelete("API/[controller]/Delete")]
        public IActionResult Delete(int Paro_Id)
        {
            var response = _accesoServices.EliminarPantallaPorRol(Paro_Id);
            return Ok(response);
        }
    }
}
