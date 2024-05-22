using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
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
    public class MunicipioController : Controller
    {
        private readonly GeneralServices _generalServices;
        private readonly IMapper _mapper;

        public MunicipioController(GeneralServices GeneralServices, IMapper mapper)
        {
            _generalServices = GeneralServices;
            _mapper = mapper;
        }

        [HttpGet("API/[controller]/List")]
        public IActionResult List()
        {

            var list = _generalServices.ListMuni();
            return Ok(list.Data);
        }


        [HttpGet("API/[controller]/Fill/{id}")]

        public IActionResult Fill(string id)
        {

            var list = _generalServices.LlenarMuni(id);
            return Json(list.Data);
        }

        [HttpGet("API/[controller]/MunicipioPorDepartamento/{id}")]
        public IActionResult DepaPorMuni(string id)
        {

            var list = _generalServices.ListadoMunicipioDepartamento(id);
            return Ok(list.Data);
        }

        [HttpGet("API/[controller]/Lista/{id}")]
        public IActionResult IndexPorMunicipio(string id)
        {
            var list = _generalServices.ListadoMunicipioDepartamento(id);
            var drop = list.Data as List<tbMunicipios>;
            var rol = drop.Select(x => new SelectListItem
            {
                Text = x.Muni_Descripcion,
                Value = x.Muni_Codigo
            }).ToList();


            rol.Insert(0, new SelectListItem { Text = "-- SELECCIONE --", Value = "0" });
            return Ok(rol.ToList());
        }

        [HttpPost("API/[controller]/Insert")]
        public IActionResult Insert(MunicipioViewModel item)
        {
            var model = _mapper.Map<tbMunicipios>(item);
            var modelo = new tbMunicipios()
            {
                Muni_Codigo = item.Muni_Codigo,
                Muni_Descripcion = item.Muni_Descripcion,
                Dept_Codigo = item.Dept_Codigo,
                Muni_Usua_Creacion = item.Muni_Usua_Creacion,
                Muni_Fecha_Creacion = DateTime.Now
            };
            var list = _generalServices.CrearMuni(modelo);

            if(list.Code == 200)
            {
                return Ok(new { success = true, message = list.Message });
            }
            else
            {
                return BadRequest();
            }
          
        }


        [HttpPut("API/[controller]/Update")]
        public IActionResult Update(MunicipioViewModel item)
         {
            _mapper.Map<tbMunicipios>(item);
            var modelo = new tbMunicipios()
            {
                Muni_Codigo = item.Muni_Codigo,
                Muni_Descripcion = item.Muni_Descripcion,
                Dept_Codigo = item.Dept_Codigo,
                Muni_Usua_Modifica = item.Muni_Usua_Modifica,
                Muni_Fecha_Modifica = DateTime.Now
            };
            var list = _generalServices.EditarMuni(modelo);
            if(list.Code == 200)
            {
                return Ok(new { success = true, message = list.Message });
            }
            else
            {
                return BadRequest();
            }
      
        }


        [HttpDelete("API/[controller]/Delete/{id}")]
        public IActionResult Delete(string id)
        {
            var list = _generalServices.Eliminarmuni(id);
            if(list.Code == 200)
            {
                return Ok(new { success = true, message = list.Message });
            }
            else
            {
                return BadRequest();
            }
        
        }
    }
}