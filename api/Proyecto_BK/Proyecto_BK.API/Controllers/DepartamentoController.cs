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
    public class DepartamentoController : Controller
    {
        private readonly GeneralServices _generalServices;
        private readonly IMapper _mapper;

        public DepartamentoController(GeneralServices GeneralServices, IMapper mapper)
        {
            _generalServices = GeneralServices;
            _mapper = mapper;
        }

        [HttpGet("API/[controller]/List")]
        public IActionResult List()
        {

            var list = _generalServices.ListDepto();
            return Ok(list.Data);
        }


        [HttpGet("API/[controller]/MunicipioDDL")]
        public IActionResult MunicipioDDL()
        {

            var list = _generalServices.MuniDDL();
            return Ok(list.Data);
        }

        [HttpGet("API/[controller]/Fill")]

        public IActionResult Fill(string Dept_Codigo)
        {

            var list = _generalServices.LlenarDepto(Dept_Codigo);
            return Ok(list);
        }
        [HttpGet("API/[controller]/DropDown")]
        public IActionResult ListDepaDrop()
        {
            var list = _generalServices.ListDepto();
            var drop = list.Data as List<tbDepartamentos>;
            var rol = drop.Select(x => new SelectListItem
            {
                Text = x.Dept_Descripcion,
                Value = x.Dept_Codigo
            }).ToList();


            rol.Insert(0, new SelectListItem { Text = "-- SELECCIONE --", Value = "0" });
            return Ok(rol.ToList());
        }

        [HttpPost("API/[controller]/Insert")]
        public IActionResult Create(DepartamentoViewModel json)
        {
            _mapper.Map<tbDepartamentos>(json);
            var modelo = new tbDepartamentos()
            {
                Dept_Codigo = json.Dept_Codigo,
                Dept_Descripcion = json.Dept_Descripcion,
                Dept_Usua_Creacion = 1,
                Dept_Fecha_Creacion = DateTime.Now
            };
            var response = _generalServices.CrearDepto(modelo);
            return Ok(response);
        }
        [HttpPut("API/[controller]/Update")]
        public IActionResult Update(DepartamentoViewModel json)
        {
            _mapper.Map<tbDepartamentos>(json);
            var modelo = new tbDepartamentos()
            {
                Dept_Codigo = json.Dept_Codigo,
                Dept_Descripcion = json.Dept_Descripcion,
                Dept_Usua_Modifica = 1,
                Dept_Fecha_Modifica = DateTime.Now
            };
            var list = _generalServices.EditarDepto(modelo);
            return Ok(list);
        }
        [HttpDelete("API/[controller]/Delete")]
        public IActionResult Delete(string Dept_Codigo)
        {
            var list = _generalServices.EliminarDepto(Dept_Codigo);
            return Ok(list);
        }
    }
}