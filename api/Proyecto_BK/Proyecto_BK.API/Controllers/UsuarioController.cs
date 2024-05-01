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
    public class UsuarioController : Controller
    {
        private readonly AccesoServices _accesoServices;
        private readonly IMapper _mapper;

        public UsuarioController(AccesoServices accesoServices, IMapper mapper)
        {
            _accesoServices = accesoServices;
            _mapper = mapper;
        }

        [HttpGet("API/[controller]/List")]
        public IActionResult List()
        {
            var list = _accesoServices.ListUsuarios();
            return Ok(list);
        }

        [HttpGet("API/[controller]/Find")]
        public IActionResult Find(int Usua_Id)
        {
            var result = _accesoServices.LlenarUsuario(Usua_Id);
            return Ok(result);
        }

        [HttpPost("API/[controller]/Insert")]
        public IActionResult Create(UsuarioViewModel json)
        {
            _mapper.Map<tbUsuarios>(json);
            var modelo = new tbUsuarios()
            {
                Usua_Usuario = json.Usua_Usuario,
                Usua_Contra = json.Usua_Contra,
                Usua_Admin = json.Usua_Admin,
                Empl_Id = json.Empl_Id,
                Rol_Id = json.Rol_Id,
                Usua_Usua_Creacion = json.Usua_Usua_Creacion,
                Usua_Fecha_Creacion = json.Usua_Fecha_Creacion,
                Usua_Activo = json.Usua_Activo
            };
            var response = _accesoServices.CrearUsuario(modelo);
            return Ok(response);
        }

        [HttpPut("API/[controller]/Update")]
        public IActionResult Update(UsuarioViewModel json)
        {
            _mapper.Map<tbUsuarios>(json);
            var modelo = new tbUsuarios()
            {
                Usua_Id = Convert.ToInt32(json.Usua_Id),
                Usua_Usuario = json.Usua_Usuario,
                Usua_Contra = json.Usua_Contra,
                Usua_Admin = json.Usua_Admin,
                Empl_Id = json.Empl_Id,
                Rol_Id = json.Rol_Id,
                Usua_Usua_Modifica = json.Usua_Usua_Modifica,
                Usua_Fecha_Modifica = json.Usua_Fecha_Modifica,
                Usua_Activo = json.Usua_Activo
            };
            var list = _accesoServices.EditarUsuario(modelo);
            return Ok(list);
        }

        [HttpDelete("API/[controller]/Delete")]
        public IActionResult Delete(int Usua_Id)
        {
            var response = _accesoServices.EliminarUsuario(Usua_Id);
            return Ok(response);
        }
    }
}
