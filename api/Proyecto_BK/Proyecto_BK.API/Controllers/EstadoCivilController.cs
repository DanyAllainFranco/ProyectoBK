using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
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
    public class EstadoCivilController : Controller
    {
        private readonly GeneralServices _generalServices;
        private readonly IMapper _mapper;

        public EstadoCivilController(GeneralServices GeneralServices, IMapper mapper)
        {
            _generalServices = GeneralServices;
            _mapper = mapper;
        }

        [HttpGet("API/[controller]/List")]
        public IActionResult List() //EstadoCivilDDL
        {

            var list = _generalServices.ListEstado();
            return Ok(list.Data);
        }

        [HttpGet("API/[controller]/EstadoCivilDDL")]
        public IActionResult EstadoCivilDDL() //EstadoCivilDDL
        {

            var list = _generalServices.EstadoCivilDDL();
            return Ok(list.Data);
        }
        [HttpGet("API/[controller]/Fill")]

        [HttpGet("API/[controller]/DropDown")]
        public IActionResult ListEstadosDrop()
        {
            var list = _generalServices.ListEstado();
            var drop = list.Data as List<tbEstadosCiviles>;
            var rol = drop.Select(x => new SelectListItem
            {
                Text = x.Esta_Descripcion,
                Value = x.Esta_Id.ToString()
            }).ToList();


            rol.Insert(0, new SelectListItem { Text = "-- SELECCIONE --", Value = "0" });
            return Ok(rol.ToList());
        }
        [HttpGet("API/[controller]/Fill/{id}")]

        public IActionResult Fill(int id)
        {

            var list = _generalServices.LlenarEstado(id);
            return Json(list.Data);
        }


        [HttpPost("API/[controller]/Create")]
        public IActionResult Insert(EstadoCivilViewModel item)
        {
            var model = _mapper.Map<tbEstadosCiviles>(item);
            var modelo = new tbEstadosCiviles()
            {
                Esta_Descripcion = item.Esta_Descripcion
,
                Esta_Usua_Creacion = 1,
                Esta_Fecha_Creacion = DateTime.Now,
            };
            var list = _generalServices.CrearEstado(modelo);
            return Ok(new { success = true, message = list.Message });

        }


        [HttpPut("API/[controller]/Update")]
        public IActionResult Update(EstadoCivilViewModel item)
        {
            _mapper.Map<tbEstadosCiviles>(item);
            var modelo = new tbEstadosCiviles()
            {
                Esta_Id = item.Esta_Id,
                Esta_Descripcion = item.Esta_Descripcion,
                Esta_Usua_Modifica = 1,
                Esta_Fecha_Modifica = DateTime.Now
            };
            var list = _generalServices.EditarEstado(modelo);
            return Ok(new { success = true, message = list.Message });
        }

        [HttpDelete("API/[controller]/Delete/{id}")]
        public IActionResult Delete(string id)
        {
            var list = _generalServices.EliminarEstado(id);
            return Ok(new { success = true, message = list.Message });
        }
    }
}