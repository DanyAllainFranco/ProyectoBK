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
    public class ComboPersonalController : Controller
    {
        private readonly RestauranteServices _restauranteServices;
        private readonly IMapper _mapper;

        public ComboPersonalController(RestauranteServices restauranteServices, IMapper mapper)
        {
            _restauranteServices = restauranteServices;
            _mapper = mapper;
        }

        [HttpGet("API/[controller]/List")]
        public IActionResult List()
        {
            var list = _restauranteServices.ListComboPersonal();
            return Ok(list);
        }

        [HttpGet("API/[controller]/Find")]
        public IActionResult Find(int Comb_Id)
        {
            var result = _restauranteServices.LlenarComboPersonal(Comb_Id);
            return Ok(result);
        }

        [HttpPost("API/[controller]/Insert")]
        public IActionResult Create(ComboPersonalViewModel json)
        {
            _mapper.Map<tbCombosPersonales>(json);
            var modelo = new tbCombosPersonales()
            {
                Comb_Descripcion = json.Comb_Descripcion,
                Comb_Precio = json.Comb_Precio,
                Comb_Imagen = json.Comb_Imagen,
                Bebi_Id = json.Bebi_Id,
                Post_id = json.Post_id,
                Comp_Id = json.Comp_Id,
                Alim_Id = json.Alim_Id,
                Comb_Usua_Creacion = json.Comb_Usua_Creacion,
                Comb_Fecha_Creacion = json.Comb_Fecha_Creacion
            };
            var response = _restauranteServices.CrearComboPersonal(modelo);
            return Ok(response);
        }

        [HttpPut("API/[controller]/Update")]
        public IActionResult Update(ComboPersonalViewModel json)
        {
            _mapper.Map<tbCombosPersonales>(json);
            var modelo = new tbCombosPersonales()
            {
                Comb_Id = Convert.ToInt32(json.Comb_Id),
                Comb_Descripcion = json.Comb_Descripcion,
                Comb_Precio = json.Comb_Precio,
                Comb_Imagen = json.Comb_Imagen,
                Bebi_Id = json.Bebi_Id,
                Post_id = json.Post_id,
                Comp_Id = json.Comp_Id,
                Alim_Id = json.Alim_Id,
                Comb_Usua_Modifica = json.Comb_Usua_Modifica,
                Comb_Fecha_Modifica = json.Comb_Fecha_Modifica
            };
            var list = _restauranteServices.EditarComboPersonal(modelo);
            return Ok(list);
        }

        [HttpDelete("API/[controller]/Delete")]
        public IActionResult Delete(int Comb_Id)
        {
            var response = _restauranteServices.EliminarComboPersonal(Comb_Id);
            return Ok(response);
        }
    }
}
