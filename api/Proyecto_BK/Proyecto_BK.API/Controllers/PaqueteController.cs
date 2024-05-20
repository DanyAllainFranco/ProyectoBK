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
    public class PaqueteController : Controller
    {
        private readonly RestauranteServices _restauranteServices;
        private readonly IMapper _mapper;

        public PaqueteController(RestauranteServices restauranteServices, IMapper mapper)
        {
            _restauranteServices = restauranteServices;
            _mapper = mapper;
        }

        [HttpGet("API/[controller]/List")]
        public IActionResult List()
        {
            var list = _restauranteServices.ListPaquete();
            return Ok(list.Data);
        }

        [HttpGet("PaqueteAutoCompletado")]
        public IActionResult AutoCompletado()
        {
            var list = _restauranteServices.PaqueteAucompletado();
            var drop = list.Data as List<tbPaquetes>;
            var rol = drop.Select(x => new SelectListItem
            {
                Text = x.Paqe_Descripcion,
                Value = x.Paqe_Id.ToString()
            }).ToList();

            return Ok(rol.ToList());
        }

        [HttpGet("API/[controller]/ListAlimentos3/{Paqe_Id}")]
        public IActionResult ListAlimentos(int Paqe_Id)
        {
            var list = _restauranteServices.ListAlimentos3(Paqe_Id);
            return Ok(list.Data);
        }
        [HttpGet("API/[controller]/ListBebidas3/{Paqe_Id}")]
        public IActionResult ListBebidas(int Paqe_Id)
        {
            var list = _restauranteServices.ListBebidas3(Paqe_Id);
            return Ok(list.Data);
        }
        [HttpGet("API/[controller]/ListComplementos3/{Paqe_Id}")]
        public IActionResult ListComplementos(int Paqe_Id)
        { 
            var list = _restauranteServices.ListComplementos3(Paqe_Id);
            return Ok(list.Data);
        }
        [HttpGet("API/[controller]/Find/{Paqe_Id}")]
        public IActionResult Find(int Paqe_Id)
        {
            var result = _restauranteServices.LlenarPaquete(Paqe_Id);
            return Ok(result.Data);
        }
        [HttpGet("API/[controller]/ListPostres3/{Paqe_Id}")]
        public IActionResult ListPostres(int Paqe_Id)
        {       
            var list = _restauranteServices.ListPostres3(Paqe_Id);
            return Ok(list.Data);
        }

        [HttpPost("API/[controller]/Insert")]
        public IActionResult Create(PaqueteViewModel json)
        {
            _mapper.Map<tbPaquetes>(json);
            var modelo = new tbPaquetes()
            {
                Paqe_Descripcion = json.Paqe_Descripcion,
                Paqe_Precio = json.Paqe_Precio,
                Paqe_Imagen = json.Paqe_Imagen,
                Paqe_Usua_Creacion = 1,
                Paqe_Fecha_Creacion = DateTime.Now
            };
            int rolId;
            var prueba = _restauranteServices.InsertarPaquete(modelo, out rolId);
            prueba.Message = rolId.ToString();
            return Ok(prueba);
        }

        [HttpPut("API/[controller]/Update")]
        public IActionResult Update(PaqueteViewModel json)
        {
            _mapper.Map<tbPaquetes>(json);
            var modelo = new tbPaquetes()
            {
                Paqe_Id = Convert.ToInt32(json.Paqe_Id),
                Paqe_Descripcion = json.Paqe_Descripcion,
                Paqe_Precio = json.Paqe_Precio,
                Paqe_Imagen = json.Paqe_Imagen,
                Paqe_Usua_Modifica = 1,
                Paqe_Fecha_Modifica = DateTime.Now
            };
            var list = _restauranteServices.EditarPaquete(modelo);
            return Ok(list);
        }

        [HttpDelete("API/[controller]/Delete")]
        public IActionResult Delete(int Paqe_Id)
        {
            var response = _restauranteServices.EliminarPaquete(Paqe_Id);
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
