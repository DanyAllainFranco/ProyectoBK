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
    public class ClienteController : Controller
    {
        private readonly GeneralServices _generalServices;
        private readonly IMapper _mapper;

        public ClienteController(GeneralServices GeneralServices, IMapper mapper)
        {
            _generalServices = GeneralServices;
            _mapper = mapper;
        }

        [HttpGet("API/[controller]/List")]
        public IActionResult List()
        {

            var list = _generalServices.ListCliente();
            return Ok(list.Data);
        }

        [HttpGet("API/[controller]/Find")]
        public IActionResult Find(int Clie_Id)
        {
            var result = _generalServices.LlenarCliente(Clie_Id);
            return Ok(result);
        }

        [HttpPost("API/[controller]/Insert")]
        public IActionResult Create(ClienteViewModel json)
        {
            _mapper.Map<tbClientes>(json);
            var modelo = new tbClientes()
            {
                Clie_Identidad = json.Clie_Identidad,
                Clie_Nombre = json.Clie_Nombre,
                Clie_Apellido = json.Clie_Apellido,
                Clie_Sexo = json.Clie_Sexo,
                Clie_Correo = json.Clie_Correo,
                Esta_Id = json.Esta_Id,
                Muni_Codigo = json.Muni_Codigo,
                Carg_Id = json.Carg_Id,
                Clie_Usua_Creacion = json.Clie_Usua_Creacion,
                Clie_Fecha_Creacion = json.Clie_Fecha_Creacion
            };
            var response = _generalServices.CrearCliente(modelo);
            return Ok(response);
        }

        [HttpPut("API/[controller]/Update")]
        public IActionResult Update(ClienteViewModel json)
        {
            _mapper.Map<tbClientes>(json);
            var modelo = new tbClientes()
            {
                Clie_Id = Convert.ToInt32(json.Clie_Id),
                Clie_Identidad = json.Clie_Identidad,
                Clie_Nombre = json.Clie_Nombre,
                Clie_Apellido = json.Clie_Apellido,
                Clie_Sexo = json.Clie_Sexo,
                Clie_Correo = json.Clie_Correo,
                Esta_Id = json.Esta_Id,
                Muni_Codigo = json.Muni_Codigo,
                Carg_Id = json.Carg_Id,
                Clie_Usua_Modifica = json.Clie_Usua_Modifica,
                Clie_Fecha_Modifica = json.Clie_Fecha_Modifica
            };
            var list = _generalServices.EditarCliente(modelo);
            return Ok(list);
        }

        [HttpDelete("API/[controller]/Delete")]
        public IActionResult Delete(int Clie_Id)
        {
            var response = _generalServices.EliminarCliente(Clie_Id);
            return Ok(response);
        }
    }
}