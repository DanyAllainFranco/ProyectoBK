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
    public class PostreController : Controller
    {
        private readonly RestauranteServices _restauranteServices;
        private readonly IMapper _mapper;

        public PostreController(RestauranteServices restauranteServices, IMapper mapper)
        {
            _restauranteServices = restauranteServices;
            _mapper = mapper;
        }

        [HttpGet("API/[controller]/List")]
        public IActionResult List()
        {
            var list = _restauranteServices.ListPostre();
            return Ok(list.Data);
        }

        [HttpGet("PostreAutoCompletado")]
        public IActionResult AutoCompletado()
        {
            var list = _restauranteServices.PostreAutocompletar();
            var drop = list.Data as List<tbPostres>;
             var rol = drop.Select(x => new SelectListItem
            {
                Text = x.Post_Descripcion,
                Value = x.Post_id.ToString()
            }).ToList();

            return Ok(rol.ToList());
        }



        [HttpGet("API/[controller]/Find")]
        public IActionResult Find(int Post_id)
        {
            var result = _restauranteServices.LlenarPostre(Post_id);
            return Ok(result);
        }

        [HttpPost("API/[controller]/Insert")]
        public IActionResult Create(PostreViewModel json)
        {
            _mapper.Map<tbPostres>(json);
            var modelo = new tbPostres()
            {
                Post_Descripcion = json.Post_Descripcion,
                Post_Precio = json.Post_Precio,
                Post_Imagen = json.Post_Imagen,
                Post_Usua_Creacion = 1,
                Post_Fecha_Creacion = DateTime.Now
            };
            var response = _restauranteServices.CrearPostre(modelo);
            return Ok(response);
        }

        [HttpPut("API/[controller]/Update")]
        public IActionResult Update(PostreViewModel json)
        {
            _mapper.Map<tbPostres>(json);
            var modelo = new tbPostres()
            {
                Post_id = Convert.ToInt32(json.Post_id),
                Post_Descripcion = json.Post_Descripcion,
                Post_Precio = json.Post_Precio,
                Post_Imagen = json.Post_Imagen,
                Post_Usua_Modifica = 1,
                Post_Fecha_Modifica = DateTime.Now
            };
            var list = _restauranteServices.EditarPostre(modelo);
            return Ok(list);
        }

        [HttpDelete("API/[controller]/Delete")]
        public IActionResult Delete(int Post_id)
        {
            var response = _restauranteServices.EliminarPostre(Post_id);
            return Ok(response);
        }
    }
}
