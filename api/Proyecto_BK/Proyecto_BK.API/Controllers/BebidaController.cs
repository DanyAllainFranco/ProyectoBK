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
    public class BebidaController : Controller
    {
        private readonly RestauranteServices _restauranteServices;
        private readonly IMapper _mapper;

        public BebidaController(RestauranteServices restauranteServices, IMapper mapper)
        {
            _restauranteServices = restauranteServices;
            _mapper = mapper;
        }

        [HttpGet("API/[controller]/List")]
        public IActionResult List()
        {
            var list = _restauranteServices.ListBebida();
            return Ok(list.Data);
        }

        [HttpGet("AutoCompletado")]
        public IActionResult AutoCompletado()
        {
            var list = _restauranteServices.BebidasAutocompletado();
            return Ok(list.Data);
        }
         
        [HttpGet("API/[controller]/DropDown")]
        public IActionResult ListBebidaDrop()
        {
            var list = _restauranteServices.ListBebida();
            var drop = list.Data as List<tbBebidas>;
            var rol = drop.Select(x => new SelectListItem
            {
                Text = x.Bebi_Descripcion,
                Value = x.Bebi_Id.ToString()
            }).ToList();
            rol.Insert(0, new SelectListItem { Text = "-- SELECCIONE --", Value = "0" });
            return Ok(rol.ToList());
        }

        [HttpGet("API/[controller]/Find/{Bebi_Id}")]
        public IActionResult Find(int Bebi_Id)
        {
            var result = _restauranteServices.LlenarBebida(Bebi_Id);
            return Ok(result.Data);
        }

        [HttpPost("API/[controller]/Insert")]
        public IActionResult Create(BebidaViewModel json)
        {
            _mapper.Map<tbBebidas>(json);
            var modelo = new tbBebidas()
            {
                Bebi_Descripcion = json.Bebi_Descripcion,
                Bebi_Precio = json.Bebi_Precio,
                Bebi_Imagen = json.Bebi_Imagen,
                Bebi_Usua_Creacion = json.Bebi_Usua_Creacion,
                Bebi_Fecha_Creacion = DateTime.Now
            };
            var response = _restauranteServices.CrearBebida(modelo);
            return Ok(response);
        }

        [HttpPut("API/[controller]/Update")]
        public IActionResult Update(BebidaViewModel json)
        {
            _mapper.Map<tbBebidas>(json);
            var modelo = new tbBebidas()
            {
                Bebi_Id = Convert.ToInt32(json.Bebi_Id),
                Bebi_Descripcion = json.Bebi_Descripcion,
                Bebi_Precio = json.Bebi_Precio,
                Bebi_Imagen = json.Bebi_Imagen,
                Bebi_Usua_Modifica = json.Bebi_Usua_Modifica,
                Bebi_Fecha_Modifica = DateTime.Now
            };
            var list = _restauranteServices.EditarBebida(modelo);
            return Ok(list);
        }

        [HttpDelete("API/[controller]/Delete/{Bebi_Id}")]
        public IActionResult Delete(int Bebi_Id)
        {
            var response = _restauranteServices.EliminarBebida(Bebi_Id);
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
