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
            return Ok(list.Data);
        }

        [HttpGet("API/[controller]/Find/{Usua_Id}")]
        public IActionResult Find(int Usua_Id)
        {
            var result = _accesoServices.LlenarUsuario(Usua_Id);
            return Ok(result.Data);
        }

        [HttpGet("API/[controller]/Login")]
        public IActionResult Login(string Usua_Usuario, string Usua_Contra)
        {

                
             
            var list = _accesoServices.UsuarioLogin(Usua_Usuario, Usua_Contra);


            var prueba = list.Data as List<tbUsuarios>;
            if (prueba.Count > 0)
            {
                return Ok(list.Data);
            }
            else
            {
                list.Message = "Error";
                return Ok(list.Message);
            }
            //var result = _accesoServices.UsuarioLogin(Usua_Usuario, Usua_Contra);
            //return Ok(result);
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
                Usua_Usua_Creacion = 1,
                Usua_Fecha_Creacion = DateTime.Now,
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
                Usua_Admin = json.Usua_Admin,
                Empl_Id = json.Empl_Id,
                Rol_Id = json.Rol_Id,
                Usua_Usua_Modifica = 1,
                Usua_Fecha_Modifica = DateTime.Now,
            };
            var list = _accesoServices.EditarUsuario(modelo);
            return Ok(list);
        }

        [HttpDelete("API/[controller]/Delete/{Usua_Id}")]
        public IActionResult Delete(int Usua_Id)
        {
            var response = _accesoServices.EliminarUsuario(Usua_Id);
            return Ok(response);
        }
    }
}
