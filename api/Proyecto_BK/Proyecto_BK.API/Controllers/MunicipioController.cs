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
        [HttpGet("API/[controller]/Fill")]

        public IActionResult Fill(string Muni_Codigo)
        {

            var list = _generalServices.LlenarMuni(Muni_Codigo);
            return Ok(list);
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
        public IActionResult Create(MunicipioViewModel json)
        {
            _mapper.Map<tbMunicipios>(json);
            var modelo = new tbMunicipios()
            {
                Muni_Codigo = json.Muni_Codigo,
                Muni_Descripcion = json.Muni_Descripcion,
                Dept_Codigo = json.Dept_Codigo,
                Muni_Usua_Creacion = 1,
                Muni_Fecha_Creacion = DateTime.Now
            };
            var response = _generalServices.CrearMuni(modelo);
            return Ok(response);
        }
        [HttpPut("API/[controller]/Update")]
        public IActionResult Update(MunicipioViewModel json)
        {
            _mapper.Map<tbMunicipios>(json);
            var modelo = new tbMunicipios()
            {
                Muni_Codigo = json.Muni_Codigo,
                Muni_Descripcion = json.Muni_Descripcion,
                Dept_Codigo = json.Dept_Codigo,
                Muni_Usua_Modifica = 1,
                Muni_Fecha_Modifica = DateTime.Now
            };
            var list = _generalServices.EditarMuni(modelo);
            return Ok(list);
        }
        [HttpDelete("API/[controller]/Delete")]
        public IActionResult Delete(string Muni_Codigo)
        {
            var list = _generalServices.Eliminarmuni(Muni_Codigo);
            return Ok(list);
        }
    }
}