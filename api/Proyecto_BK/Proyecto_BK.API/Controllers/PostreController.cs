using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Proyecto_BK.BusinessLogic.Services;
using Proyecto_BK.Common.Models;
using Proyecto_BK.Entities;
//using Proyecto_BK.Entities.Entities;
using System;
using System.Collections.Generic;
using System.IO;
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
            return Ok(list.Data);
        }

        [HttpGet("API/[controller]/DropDown")]
        public IActionResult ListPostreDrop()
        {
            var list = _restauranteServices.ListPostre();
            var drop = list.Data as List<tbPostres>;
            var rol = drop.Select(x => new SelectListItem
            {
                Text = x.Post_Descripcion,
                Value = x.Post_id.ToString()
            }).ToList();


            rol.Insert(0, new SelectListItem { Text = "-- SELECCIONE --", Value = "0" });
            return Ok(rol.ToList());
        }

        [HttpGet("API/[controller]/Fill/{id}")]
        public IActionResult Fill(int id)
        {
            var list = _restauranteServices.LlenarPostre(id);
            return Json(list.Data);
        }

        [HttpPost("API/[controller]/Insert")]
        public IActionResult Create(PostreViewModel item)
        {
            var model = _mapper.Map<tbPostres>(item);
            var modelo = new tbPostres()
            {
                Post_Descripcion = item.Post_Descripcion,
                Post_Precio = item.Post_Precio,
                Post_Imagen = item.Post_Imagen,
                Post_Usua_Creacion = item.Post_Usua_Creacion,
                Post_Fecha_Creacion = DateTime.Now
            };
            var list = _restauranteServices.CrearPostre(modelo);

            return Ok(new { success = true, message = list.Message });
        }

        [HttpPut("API/[controller]/Update")]
        public IActionResult Update(PostreViewModel item)
        {
            {
                var model = _mapper.Map<tbPostres>(item);
                var modelo = new tbPostres()
                {
                    Post_id = item.Post_id,
                    Post_Descripcion = item.Post_Descripcion,
                    Post_Precio = item.Post_Precio,
                    Post_Imagen = item.Post_Imagen,
                    Post_Usua_Modifica = item.Post_Usua_Modifica,
                    Post_Fecha_Modifica = DateTime.Now
                };
                var list = _restauranteServices.EditarPostre(modelo);

                return Ok(new { success = true, message = list.Message });
            }
        }

        [HttpDelete("API/[controller]/Delete/{Post_id}")]
        public IActionResult Delete(int Post_id)
        {
            var response = _restauranteServices.EliminarPostre(Post_id);
            return Ok(response);
        }
        [HttpPost("API/[controller]/Subir")]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {

            var allowedExtensions = new HashSet<string> { ".png", ".jpeg", ".svg", ".jpg", ".gif" };
            var fileExtension = Path.GetExtension(file.FileName).ToLower();
            if (!allowedExtensions.Contains(fileExtension))
            {
                return Ok(new { message = "Error", detail = "Extensión de archivo no permitida." });
            }


            var uploadsFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");


            if (!Directory.Exists(uploadsFolderPath))
            {
                Directory.CreateDirectory(uploadsFolderPath);
            }
            var filePath = Path.Combine(uploadsFolderPath, file.FileName);

            try
            {

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                return Ok(new { message = "Exito" });
            }
            catch (Exception e)
            {

                return StatusCode(500, $"General error: {e.ToString()}");
            }
        }

    }
}
