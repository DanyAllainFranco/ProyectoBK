using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Proyecto_BK.BusinessLogic;
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
            return Ok(list.Data);
        }

        [HttpGet("API/[controller]/ListPantallas")]
        public IActionResult ListPanta()
        {
            var list = _accesoServices.ListPantallas();
            return Ok(list.Data);
        }

        [HttpGet("API/[controller]/ListPantallas2/{RolId}")]
        public IActionResult ListPanta2(int RolId)
        {
            var list = _accesoServices.ListPantallas2(RolId);
            return Ok(list.Data);
        }
        [HttpGet("API/[controller]/PantallasAgregadas/{RolId}")]
        public IActionResult PantallasAgregadas(int RolId)
        {
            var listado = _accesoServices.ListaPantallasPorRoles(RolId);
            if (listado.Success == true)
            {
                return Ok(listado.Data);
            }
            else
            {
                return Problem();
            }
        }
        [HttpGet("API/[controller]/RolesDDL")]
        public IActionResult RolesDDL()
        {
            var list = _accesoServices.RolesDDL();
            return Ok(list.Data);
        }

        [HttpGet("API/[controller]/Find")]
        public IActionResult Find(int Rol_Id)
        {
            var result = _accesoServices.LlenarRol(Rol_Id);
            return Ok(result.Data);
        }

        [HttpGet("API/[controller]/Detalles/{Rol_Id}")]
        public IActionResult Detalles(int Rol_Id)
        {
            var result = _accesoServices.DetallasRol(Rol_Id);
            return Ok(result.Data);
        }



        [HttpPost("API/[controller]/Insert")]
        public IActionResult Create(RolViewModel item)
        {
            //var model = _mapper.Map<tbRoles>(item);
            var modelo = new tbRoles()
            {
                Rol_Descripcion = item.Rol_Descripcion,
                Rol_Usua_Creacion = item.Rol_Usua_Creacion,

            };

            int rolId;
            var prueba = _accesoServices.InsertarRol(modelo, out rolId);
            prueba.Message = rolId.ToString();
            return Ok(prueba);
        }

        [HttpPut("API/[controller]/Update")]
        public IActionResult Update(RolViewModel item)
        {
            //_mapper.Map<tbRoles>(json);
            var modelo = new tbRoles()
            {
                Rol_Id = Convert.ToInt32(item.Rol_Id),
                Rol_Descripcion = item.Rol_Descripcion,
                Rol_Usua_Modifica = 1,
                Rol_Fecha_Modifica = DateTime.Now
            };
            var list = _accesoServices.EditarRol(modelo);
            return Ok(list);
        }

        [HttpDelete("API/[controller]/Delete/{Rol_Id}")]
        public IActionResult Delete(int Rol_Id)
        {
            var response = _accesoServices.EliminarRol(Rol_Id);
            return Ok(response);
        }


        [HttpPost("API/[controller]/Agregarpant")]
        public IActionResult Agregarpant([FromBody] AgregarPantallasViewModel request)
        {
            var result = _accesoServices.InsertarPAntxROle(request.PantIds, request.RolId, request.Usua_Id);
            return Ok(result);
        }


        [HttpDelete("API/[controller]/EliminarPantallas/{Rol_Id}")]
        public IActionResult EliminarPantallasDeRol(int Rol_Id)
        {
            var response = _accesoServices.EliminarPantallaPorRol(Rol_Id);
            
                return Ok(response);
           
        }

    }
}
