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
    public class PantallaController : Controller
    {
        private readonly AccesoServices _accesoServices;
        private readonly IMapper _mapper;

        public PantallaController(AccesoServices accesoServices, IMapper mapper)
        {
            _accesoServices = accesoServices;
            _mapper = mapper;
        }

        [HttpGet("API/[controller]/List")]
        public IActionResult List()
        {
            var list = _accesoServices.ListPantalla();
            return Ok(list);
        }

        [HttpGet("API/[controller]/Find")]
        public IActionResult Find(int Pant_Id)
        {
            var result = _accesoServices.LlenarPantalla(Pant_Id);
            return Ok(result);
        }

        [HttpPost("API/[controller]/Insert")]
        public IActionResult Create(PantallaViewModel json)
        {
            _mapper.Map<tbPantallas>(json);
            var modelo = new tbPantallas()
            {
                Pant_Descripcion = json.Pant_Descripcion,
                Pant_Usua_Creacion = json.Pant_Usua_Creacion,
                Pant_Fecha_Creacion = json.Pant_Fecha_Creacion
            };
            var response = _accesoServices.CrearPantalla(modelo);
            return Ok(response);
        }

        [HttpPut("API/[controller]/Update")]
        public IActionResult Update(PantallaViewModel json)
        {
            _mapper.Map<tbPantallas>(json);
            var modelo = new tbPantallas()
            {
                Pant_Id = Convert.ToInt32(json.Pant_Id),
                Pant_Descripcion = json.Pant_Descripcion,
                Pant_Usua_Modifica = json.Pant_Usua_Modifica,
                Pant_Fecha_Modifica = json.Pant_Fecha_Modifica
            };
            var list = _accesoServices.EditarPantalla(modelo);
            return Ok(list);
        }

        [HttpDelete("API/[controller]/Delete")]
        public IActionResult Delete(int Pant_Id)
        {
            var response = _accesoServices.EliminarPantalla(Pant_Id);
            return Ok(response);
        }
    }
}
