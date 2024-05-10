using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
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
    public class EmpleadoController : Controller
    {
        private readonly GeneralServices _generalServices;
        private readonly IMapper _mapper;

        public EmpleadoController(GeneralServices GeneralServices, IMapper mapper)
        {
            _generalServices = GeneralServices;
            _mapper = mapper;
        }

        [HttpGet("API/[controller]/List")]
        public IActionResult List()
        {

            var list = _generalServices.ListEmpleado();
            return Ok(list.Data);
        }

        //[HttpGet("API/[controller]/DropDown")]
        //public IActionResult ListDropdown()
        [HttpGet("API/[controller]/EmpleadoDDL")]
        public IActionResult EmpleadoDDL()
        {

            var list = _generalServices.EmpleadoDDL();
            return Ok(list.Data);
        }

        [HttpGet("API/[controller]/Find")]
        public IActionResult Find(int Empl_Id)
        {
            var list = _generalServices.ListEmpleado();
            var drop = list.Data as List<tbEmpleados>;
            var rol = drop.Select(x => new SelectListItem
            {
                Text = x.Empl_Nombre + " " + x.Empl_Apellido,
                Value = x.Empl_Id.ToString()
            }).ToList();


            rol.Insert(0, new SelectListItem { Text = "-- SELECCIONE --", Value = "0" });
            return Ok(rol.ToList());
        }


        [HttpGet("API/[controller]/Fill/{id}")]
        public IActionResult Fill(int id)
        {
            var list = _generalServices.LlenarEmpleado(id);
            return Json(list.Data);
        }

        [HttpPost("API/[controller]/Insert")]
        public IActionResult Insert(EmpleadoViewModel item)
        {
            var model = _mapper.Map<tbEmpleados>(item);
            var modelo = new tbEmpleados()
            {
                Empl_Identidad = item.Empl_Identidad,
                Empl_Nombre = item.Empl_Nombre,
                Empl_Apellido = item.Empl_Apellido,
                Empl_Sexo = item.Empl_Sexo,
                Empl_Correo = item.Empl_Correo,
                Esta_Id = item.Esta_Id,
                Muni_Codigo = item.Muni_Codigo,
                Carg_Id = item.Carg_Id,
                Empl_Usua_Creacion = 1,
                Empl_Fecha_Creacion = DateTime.Now

            };
            var list = _generalServices.CrearEmpleado(modelo);
            return Ok(new { success = true, message = list.Message });
        }

        [HttpPut("API/[controller]/Update")]
        public IActionResult Update(EmpleadoViewModel item)
        {
            _mapper.Map<tbEmpleados>(item);
            var modelo = new tbEmpleados()
            {
                Empl_Id = Convert.ToInt32(item.Empl_Id),
                Empl_Identidad = item.Empl_Identidad,
                Empl_Nombre = item.Empl_Nombre,
                Empl_Apellido = item.Empl_Apellido,
                Empl_Sexo = item.Empl_Sexo,
                Empl_Correo = item.Empl_Correo,
                Esta_Id = item.Esta_Id,
                Muni_Codigo = item.Muni_Codigo,
                Carg_Id = item.Carg_Id,
                Empl_Usua_Modifica = 1,
                Empl_Fecha_Modifica = DateTime.Now
            };
            var list = _generalServices.EditarEmpleado(modelo);
            return Ok(new { success = true, message = list.Message });
        }

        [HttpDelete("API/[controller]/Delete")]
        public IActionResult Delete(int Empl_Id)
        {
            var response = _generalServices.EliminarEmpleado(Empl_Id);
            return Ok(response);
        }
    }
}
