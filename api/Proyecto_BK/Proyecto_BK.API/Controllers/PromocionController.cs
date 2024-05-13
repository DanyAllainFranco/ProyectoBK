using AutoMapper;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Data.SqlClient;
using Proyecto_BK.BusinessLogic.Services;
using Proyecto_BK.Common.Models;
using Proyecto_BK.DataAccess;
using Proyecto_BK.DataAccess.Repository;
using Proyecto_BK.Entities;
using Proyecto_BK.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Proyecto_BK.API.Controllers
{
    [ApiController]
    public class PromocionController : Controller
    {
        private readonly RestauranteServices _restauranteServices;
        private readonly IMapper _mapper;

        public PromocionController(RestauranteServices restauranteServices, IMapper mapper)
        {
            _restauranteServices = restauranteServices;
            _mapper = mapper;
        }

        [HttpGet("API/[controller]/List")]
        public IActionResult List()
        {
            var list = _restauranteServices.ListPromocion();
            return Ok(list.Data);
        }

        [HttpGet("API/[controller]/ListDias")]
        public IActionResult ListDia()
        {
            var list = _restauranteServices.ListDias();
            return Ok(list.Data);
        }

        [HttpGet("API/[controller]/DropDown")]
        public IActionResult ListPromocionDrop()
        {
            var list = _restauranteServices.ListPromocion();
            var drop = list.Data as List<tbPromociones>;
            var rol = drop.Select(x => new SelectListItem
            {
                Text = x.Prom_Descripcion,
                Value = x.Prom_Id.ToString()
            }).ToList();


            rol.Insert(0, new SelectListItem { Text = "-- SELECCIONE --", Value = "0" });
            return Ok(rol.ToList());
        }

        [HttpGet("API/[controller]/Fill/{id}")]
        public IActionResult Fill(string id)
        {
            var list = _restauranteServices.LlenarPromocion(id);
            return Json(list.Data);
        }


        [HttpPost("API/[controller]/Insert")]
        public IActionResult Create(PromocionViewModel item)
        {
            var model = _mapper.Map<tbPromociones>(item);
            var modelo = new tbPromociones()
            {
                Prom_Descripcion = item.Prom_Descripcion,
                Prom_Precio = item.Prom_Precio,
                Prom_Imagen = item.Prom_Imagen,
                Dias_Id = item.Dias_Id,
                Prom_Usua_Creacion = 1,
                Prom_Fecha_Creacion = DateTime.Now
            };
            int rolId;
            var prueba = _restauranteServices.InsertarPromo(modelo, out rolId);
            prueba.Message = rolId.ToString();
            return Ok(prueba);
        }

        [HttpPut("API/[controller]/Update")]
        public IActionResult Update(PromocionViewModel item)
        {
            {
                var model = _mapper.Map<tbPromociones>(item);
                var modelo = new tbPromociones()
                {
                    Prom_Id = item.Prom_Id,
                    Prom_Descripcion = item.Prom_Descripcion,
                    Prom_Precio = item.Prom_Precio,
                    Prom_Imagen = item.Prom_Imagen,
                    Dias_Id = item.Dias_Id,
                    Prom_Usua_Modifica = 1,
                    Prom_Fecha_Modifica = DateTime.Now
                };
                var list = _restauranteServices.EditarPromocion(modelo);

                return Ok(new { success = true, message = list.Message });
            }
        }

        [HttpDelete("API/[controller]/Delete")]
        public IActionResult Delete(int Prom_Id)
        {
            var response = _restauranteServices.EliminarPromocion(Prom_Id);
            return Ok(response);
        }

        #region Alimentos

            [HttpPost("API/[controller]/AgregarAlimentos")]
            public IActionResult AgregarAlim([FromBody] AgregarAlimentosViewModel request)
            {
                var result = _restauranteServices.InsertarAlimentos(request.AlimIds, request.PromId);
                return Ok(result);
            }


        [HttpDelete("API/[controller]/EliminarAlimentos/{Prom_Id}")]
        public IActionResult EliminarAlime(int Prom_Id)
        {
            var response = _restauranteServices.EliminarAlimentos(Prom_Id);

            return Ok(response);

        }

        [HttpGet("API/[controller]/ListAlimentos/{PromId}")]
        public IActionResult ListAlimen(int PromId)
        {
            var list = _restauranteServices.ListAlimentos(PromId);
            return Ok(list.Data);
        }


        [HttpGet("API/[controller]/AlimentosAgregados/{PromId}")]
        public IActionResult AlimentAgregadas(int PromId)
        {
            var listado = _restauranteServices.ListaAlimentosAgregados(PromId);
            if (listado.Success == true)
            {
                return Ok(listado.Data);
            }
            else
            {
                return Problem();
            }
        }
        #endregion

        #region Bebidas

        [HttpPost("API/[controller]/AgregarBebidas")]
        public IActionResult AgregarBebi([FromBody] AgregarBebidaViewModel request)
        {
            var result = _restauranteServices.InsertarBebidas(request.BebiIds, request.PromId);
            return Ok(result);
        }


        [HttpDelete("API/[controller]/EliminarBebidas/{Prom_Id}")]
        public IActionResult EliminarBebi(int Prom_Id)
        {
            var response = _restauranteServices.EliminarBebidas(Prom_Id);

            return Ok(response);

        }

        [HttpGet("API/[controller]/ListBebidas/{PromId}")]
        public IActionResult ListBebi(int PromId)
        {
            var list = _restauranteServices.ListBebidas(PromId);
            return Ok(list.Data);
        }


        [HttpGet("API/[controller]/BebidasAgregadas/{PromId}")]
        public IActionResult BebiAgregadas(int PromId)
        {
            var listado = _restauranteServices.ListaBebidasAgregados(PromId);
            if (listado.Success == true)
            {
                return Ok(listado.Data);
            }
            else
            {
                return Problem();
            }
        }
        #endregion

        #region Postres

        [HttpPost("API/[controller]/AgregarPostres")]
        public IActionResult AgregarPost([FromBody] AgregarPostreViewModel request)
        {
            var result = _restauranteServices.InsertarPostres(request.PostIds, request.PromId);
            return Ok(result);
        }


        [HttpDelete("API/[controller]/EliminarPostres/{Prom_Id}")]
        public IActionResult EliminarPost(int Prom_Id)
        {
            var response = _restauranteServices.EliminarPostres(Prom_Id);

            return Ok(response);

        }

        [HttpGet("API/[controller]/ListPostres/{PromId}")]
        public IActionResult ListPost(int PromId)
        {
            var list = _restauranteServices.ListPostres(PromId);
            return Ok(list.Data);
        }


        [HttpGet("API/[controller]/PostresAgregados/{PromId}")]
        public IActionResult PostAgregadas(int PromId)
        {
            var listado = _restauranteServices.ListaPostresAgregados(PromId);
            if (listado.Success == true)
            {
                return Ok(listado.Data);
            }
            else
            {
                return Problem();
            }
        }
        #endregion

        #region Complementos

        [HttpPost("API/[controller]/AgregarComplementos")]
        public IActionResult AgregarComple([FromBody] AgregarComplementoViewModel request)
        {
            var result = _restauranteServices.InsertarComplementos(request.CompIds, request.PromId);
            return Ok(result);
        }


        [HttpDelete("API/[controller]/EliminarComplementos/{Prom_Id}")]
        public IActionResult EliminarComp(int Prom_Id)
        {
            var response = _restauranteServices.EliminarComplementos(Prom_Id);

            return Ok(response);

        }

        [HttpGet("API/[controller]/ListComplementos/{PromId}")]
        public IActionResult ListComple(int PromId)
        {
            var list = _restauranteServices.ListComplementos(PromId);
            return Ok(list.Data);
        }


        [HttpGet("API/[controller]/ComplementosAgregados/{PromId}")]
        public IActionResult ComplAgregadas(int PromId)
        {
            var listado = _restauranteServices.ListaComplementosAgregados(PromId);
            if (listado.Success == true)
            {
                return Ok(listado.Data);
            }
            else
            {
                return Problem();
            }
        }
        #endregion
    }
}
