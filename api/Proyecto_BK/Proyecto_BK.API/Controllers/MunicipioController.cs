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

        [HttpPost("API/[controller]/Insert")]
        public IActionResult Create(MunicipioViewModel json)
        {
            _mapper.Map<tbMunicipios>(json);
            var modelo = new tbMunicipios()
            {
                Muni_Codigo = json.Muni_Codigo,
                Muni_Descripcion = json.Muni_Descripcion,
                Dept_Codigo = json.Dept_Codigo,
                Muni_Usua_Creacion = json.Muni_Usua_Creacion,
                Muni_Fecha_Creacion = json.Muni_Fecha_Creacion
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
                Muni_Usua_Modifica = json.Muni_Usua_Modifica,
                Muni_Fecha_Modifica = json.Muni_Fecha_Modifica
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