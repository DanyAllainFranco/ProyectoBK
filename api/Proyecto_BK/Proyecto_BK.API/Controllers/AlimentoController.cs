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
    public class AlimentoController : Controller
    {
        private readonly RestauranteServices _restauranteServices;
        private readonly IMapper _mapper;

        public AlimentoController(RestauranteServices restauranteServices, IMapper mapper)
        {
            _restauranteServices = restauranteServices;
            _mapper = mapper;
        }

        [HttpGet("API/[controller]/List")]
        public IActionResult List()
        {
            var list = _restauranteServices.ListAlimento();
            return Ok(list.Data);
        }

        [HttpGet("API/[controller]/DropDown")]
        public IActionResult ListAlimentosDrop()
        {
            var list = _restauranteServices.ListAlimento();
            var drop = list.Data as List<tbAlimentos>;
            var rol = drop.Select(x => new SelectListItem
            {
                Text = x.Alim_Descripcion,
                Value = x.Alim_Id.ToString()
            }).ToList();


            rol.Insert(0, new SelectListItem { Text = "-- SELECCIONE --", Value = "0" });
            return Ok(rol.ToList());
        }


        [HttpGet("API/[controller]/Find/{Alim_Id}")]
        public IActionResult Find(int Alim_Id)
        {
            var result = _restauranteServices.LlenarAlimento(Alim_Id);
            return Ok(result.Data);
        }

        [HttpPost("API/[controller]/Insert")]
        public IActionResult Create(AlimentoViewModel json)
        {
            _mapper.Map<tbAlimentos>(json);
            var modelo = new tbAlimentos()
            {
                Alim_Descripcion = json.Alim_Descripcion,
                Alim_Precio = json.Alim_Precio,
                Alim_Imagen = json.Alim_Imagen,
                Alim_Usua_Creacion = json.Alim_Usua_Creacion,
                Alim_Fecha_Creacion = DateTime.Now
            };
            var response = _restauranteServices.CrearAlimento(modelo);
            return Ok(response);
        }

        [HttpPut("API/[controller]/Update")]
        public IActionResult Update(AlimentoViewModel json)
        {
            _mapper.Map<tbAlimentos>(json);
            var modelo = new tbAlimentos()
            {
                Alim_Id = Convert.ToInt32(json.Alim_Id),
                Alim_Descripcion = json.Alim_Descripcion,
                Alim_Precio = json.Alim_Precio,
                Alim_Imagen = json.Alim_Imagen,
                Alim_Usua_Modifica = json.Alim_Usua_Modifica,
                Alim_Fecha_Modifica = DateTime.Now
            };
            var list = _restauranteServices.EditarAlimento(modelo);
            return Ok(list);
        }

        [HttpDelete("API/[controller]/Delete/{Alim_Id}")]
        public IActionResult Delete(int Alim_Id)
        {
            var response = _restauranteServices.EliminarAlimento(Alim_Id);
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
                //Directory.CreateDirectory(uploadsFolderPath);
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
