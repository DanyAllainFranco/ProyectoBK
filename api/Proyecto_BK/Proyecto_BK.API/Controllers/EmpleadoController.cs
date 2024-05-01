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

        [HttpGet("API/[controller]/Find")]
        public IActionResult Find(int Empl_Id)
        {
            var result = _generalServices.LlenarEmpleado(Empl_Id);
            return Ok(result);
        }

        [HttpPost("API/[controller]/Insert")]
        public IActionResult Create(EmpleadoViewModel json)
        {
            _mapper.Map<tbEmpleados>(json);
            var modelo = new tbEmpleados()
            {
                Empl_Identidad = json.Empl_Identidad,
                Empl_Nombre = json.Empl_Nombre,
                Empl_Apellido = json.Empl_Apellido,
                Empl_Sexo = json.Empl_Sexo,
                Empl_Correo = json.Empl_Correo,
                Esta_Id = json.Esta_Id,
                Muni_Codigo = json.Muni_Codigo,
                Carg_Id = json.Carg_Id,
                Empl_Usua_Creacion = json.Empl_Usua_Creacion,
                Empl_Fecha_Creacion = json.Empl_Fecha_Creacion
            };
            var response = _generalServices.CrearEmpleado(modelo);
            return Ok(response);
        }

        [HttpPut("API/[controller]/Update")]
        public IActionResult Update(EmpleadoViewModel json)
        {
            _mapper.Map<tbEmpleados>(json);
            var modelo = new tbEmpleados()
            {
                Empl_Id = Convert.ToInt32(json.Empl_Id),
                Empl_Identidad = json.Empl_Identidad,
                Empl_Nombre = json.Empl_Nombre,
                Empl_Apellido = json.Empl_Apellido,
                Empl_Sexo = json.Empl_Sexo,
                Empl_Correo = json.Empl_Correo,
                Esta_Id = json.Esta_Id,
                Muni_Codigo = json.Muni_Codigo,
                Carg_Id = json.Carg_Id,
                Empl_Usua_Modifica = json.Empl_Usua_Modifica,
                Empl_Fecha_Modifica = json.Empl_Fecha_Modifica
            };
            var list = _generalServices.EditarEmpleado(modelo);
            return Ok(list);
        }

        [HttpDelete("API/[controller]/Delete")]
        public IActionResult Delete(int Empl_Id)
        {
            var response = _generalServices.EliminarEmpleado(Empl_Id);
            return Ok(response);
        }
    }
}
