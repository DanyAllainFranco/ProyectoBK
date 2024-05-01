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
    public class RolController : Controller
    {
        private readonly AccesoServices _accesoServices;
        private readonly IMapper _mapper;

        public RolController(AccesoServices accesoServices, IMapper mapper)
        {
            _accesoServices = accesoServices;
            _mapper = mapper;
        }

        [HttpGet("API/[controller]/List")]
        public IActionResult List()
        {
            var list = _accesoServices.ListRoles();
            return Ok(list);
        }

        [HttpGet("API/[controller]/Find")]
        public IActionResult Find(int Rol_Id)
        {
            var result = _accesoServices.LlenarRol(Rol_Id);
            return Ok(result);
        }

        [HttpPost("API/[controller]/Insert")]
        public IActionResult Create(RolViewModel json)
        {
            _mapper.Map<tbRoles>(json);
            var modelo = new tbRoles()
            {
                Rol_Descripcion = json.Rol_Descripcion,
                Rol_Usua_Creacion = json.Rol_Usua_Creacion,
                Rol_Fecha_Creacion = json.Rol_Fecha_Creacion
            };
            var response = _accesoServices.CrearRol(modelo);
            return Ok(response);
        }

        [HttpPut("API/[controller]/Update")]
        public IActionResult Update(RolViewModel json)
        {
            _mapper.Map<tbRoles>(json);
            var modelo = new tbRoles()
            {
                Rol_Id = Convert.ToInt32(json.Rol_Id),
                Rol_Descripcion = json.Rol_Descripcion,
                Rol_Usua_Modifica = json.Rol_Usua_Modifica,
                Rol_Fecha_Modifica = json.Rol_Fecha_Modifica
            };
            var list = _accesoServices.EditarRol(modelo);
            return Ok(list);
        }

        [HttpDelete("API/[controller]/Delete")]
        public IActionResult Delete(int Rol_Id)
        {
            var response = _accesoServices.EliminarRol(Rol_Id);
            return Ok(response);
        }
    }
}
