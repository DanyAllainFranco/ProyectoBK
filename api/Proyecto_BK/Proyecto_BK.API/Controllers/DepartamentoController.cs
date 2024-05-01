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
        [HttpGet("API/[controller]/Fill")]

        public IActionResult Fill(string Dept_Codigo)
        {

            var list = _generalServices.LlenarDepto(Dept_Codigo);
            return Ok(list);
        }

        [HttpPost("API/[controller]/Insert")]
        public IActionResult Create(DepartamentoViewModel json)
        {
            _mapper.Map<tbDepartamentos>(json);
            var modelo = new tbDepartamentos()
            {
                Dept_Codigo = json.Dept_Codigo,
                Dept_Descripcion = json.Dept_Descripcion,
                Dept_Usua_Creacion = json.Dept_Usua_Creacion,
                Dept_Fecha_Creacion = json.Dept_Fecha_Creacion
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
                Dept_Usua_Modifica = json.Dept_Usua_Modifica,
                Dept_Fecha_Modifica = json.Dept_Fecha_Modifica
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