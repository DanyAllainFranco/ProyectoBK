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
            return Ok(list.Data);
        }


        [HttpGet("API/[controller]/Fill/{id}")]

        public IActionResult Fill(string id)
        {

            var list = _restauranteServices.LlenarComboPersonal(id);
            return Json(list.Data);
        }

        [HttpGet("API/[controller]/GrafiCombos")]
        public IActionResult GrafiCombos(string Usua_Usuario)
        {
            var result = _restauranteServices.GrafiCombos(Usua_Usuario);
            return Json(result.Data);
        }

        [HttpGet("API/[controller]/GrafiPostres")]
        public IActionResult GrafiPostres(string Usua_Usuario)
        {
            var result = _restauranteServices.GrafiPostres(Usua_Usuario);
            return Json(result.Data);
        }

        [HttpGet("API/[controller]/GrafiPaquetes")]
        public IActionResult GrafiPaquetes(string Usua_Usuario)
        {
            var result = _restauranteServices.GrafiPaquetes(Usua_Usuario);
            return Json(result.Data);
        }

        [HttpGet("API/[controller]/GrafiAlimentos")]
        public IActionResult GrafiAlimentos(string Usua_Usuario)
        {
            var result = _restauranteServices.GrafiAlimentos(Usua_Usuario);
            return Json(result.Data);
        }

        [HttpPost("API/[controller]/Insert")]
        public IActionResult Create(ComboPersonalViewModel item)
        {
            var model = _mapper.Map<tbCombosPersonales>(item);
            var modelo = new tbCombosPersonales()
            {
                Comb_Descripcion = item.Comb_Descripcion,
                Comb_Precio = item.Comb_Precio,
                Comb_Imagen = item.Comb_Imagen,
                Bebi_Id = item.Bebi_Id,
                Post_id = item.Post_id,
                Comp_Id = item.Comp_Id,
                Alim_Id = item.Alim_Id,
                Comb_Usua_Creacion = 1,
                Comb_Fecha_Creacion = DateTime.Now
            };
            var list = _restauranteServices.CrearComboPersonal(modelo);

            return Ok(new { success = true, message = list.Message });
        }

        [HttpPut("API/[controller]/Update")]
        public IActionResult Update(ComboPersonalViewModel item)
        {
            var model = _mapper.Map<tbCombosPersonales>(item);
            var modelo = new tbCombosPersonales()
            {
                Comb_Id = item.Comb_Id,
                Comb_Descripcion = item.Comb_Descripcion,
                Comb_Precio = item.Comb_Precio,
                Comb_Imagen = item.Comb_Imagen,
                Bebi_Id = item.Bebi_Id,
                Post_id = item.Post_id,
                Comp_Id = item.Comp_Id,
                Alim_Id = item.Alim_Id,
                Comb_Usua_Modifica = 1,
                Comb_Fecha_Modifica = DateTime.Now
            };
            var list = _restauranteServices.EditarComboPersonal(modelo);

            return Ok(new { success = true, message = list.Message });
        }


        [HttpDelete("API/[controller]/Delete")]
        public IActionResult Delete(int Comb_Id)
        {
            var response = _restauranteServices.EliminarComboPersonal(Comb_Id);
            return Ok(response);
        }

      
    }
}
