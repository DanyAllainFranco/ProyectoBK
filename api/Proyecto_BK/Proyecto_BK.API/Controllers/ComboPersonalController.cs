using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
            return Ok(list.Data);
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

        [HttpGet("API/[controller]/GrafiAlimentosFiltro/{Usua_Usuario}/{FechaInicio}/{FechaFin}")]
        public IActionResult GrafiAlimentoFiltro(string Usua_Usuario, string FechaInicio, string FechaFin)
        {
            var result = _restauranteServices.GrafiAlimentosFiltro(Usua_Usuario, FechaInicio, FechaFin);
            return Json(result.Data);
        }


        [HttpGet("API/[controller]/GrafiPostresFiltro/{Usua_Usuario}/{FechaInicio}/{FechaFin}")]
        public IActionResult GrafiPostresFiltro(string Usua_Usuario, string FechaInicio, string FechaFin)
        {
            var result = _restauranteServices.GrafiPostreFiltro(Usua_Usuario, FechaInicio, FechaFin);
            return Json(result.Data);
        }

        [HttpGet("API/[controller]/GrafiCombosFiltro/{Usua_Usuario}/{FechaInicio}/{FechaFin}")]
        public IActionResult GrafiCombosFiltro(string Usua_Usuario, string FechaInicio, string FechaFin)
        {
            var result = _restauranteServices.GrafiComboFiltro(Usua_Usuario, FechaInicio, FechaFin);
            return Json(result.Data);
        }

        [HttpGet("API/[controller]/GrafiPaquetesFiltro/{Usua_Usuario}/{FechaInicio}/{FechaFin}")]
        public IActionResult GrafiPaquetesFiltro(string Usua_Usuario, string FechaInicio, string FechaFin)
        {
            var result = _restauranteServices.GrafiPaqueteFiltro(Usua_Usuario, FechaInicio, FechaFin);
            return Json(result.Data);
        }

        [HttpPost("API/[controller]/Insert")]
        public IActionResult Create(ComboPersonalViewModel item)
        {
            var model = _mapper.Map<tbCombo>(item);
            var modelo = new tbCombo()
            {
                Comb_Descripcion = item.Comb_Descripcion,
                Comb_Precio = item.Comb_Precio,
                Comb_Imagen = item.Comb_Imagen,
                Bebi_Id = item.Bebi_Id,
                Post_Id = item.Post_id,
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
            var model = _mapper.Map<tbCombo>(item);
            var modelo = new tbCombo()
            {
                Comb_Id = item.Comb_Id,
                Comb_Descripcion = item.Comb_Descripcion,
                Comb_Precio = item.Comb_Precio,
                Comb_Imagen = item.Comb_Imagen,
                Bebi_Id = item.Bebi_Id,
                Post_Id = item.Post_id,
                Comp_Id = item.Comp_Id,
                Alim_Id = item.Alim_Id,
                Comb_Usua_Modifica = 1,
                Comb_Fecha_Modificacion = DateTime.Now
            };
            var list = _restauranteServices.EditarComboPersonal(modelo);

            return Ok(new { success = true, message = list.Message });
        }


        [HttpDelete("API/[controller]/Delete/{Comb_Id}")]
        public IActionResult Delete(int Comb_Id)
        {
            var response = _restauranteServices.EliminarComboPersonal(Comb_Id);
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
