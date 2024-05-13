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
    [Route("API/[controller]")]
    public class FacturaController : Controller
    {
        private readonly RestauranteServices _restauranteServices;

        private readonly IMapper _mapper;
        public FacturaController(RestauranteServices restauranteServices, IMapper mapper)
        {
            _restauranteServices = restauranteServices;
            _mapper = mapper;
        }
        [HttpGet("List")]
        public IActionResult Index()
        {
            var list = _restauranteServices.ListadoFactura();
            return Ok(list.Data);
        }

        [HttpGet("ListadaEncabezado")]
        public IActionResult ListaEncabezado()
        {
            var list = _restauranteServices.ListadoFactura();
            return Ok(list.Data);
        }

        [HttpGet("ListaDetalles/{Fact_Id}")]
        public IActionResult ListaDetalles(int Fact_Id)
        {
            var list = _restauranteServices.ListadoFacturaDetalles(Fact_Id);
            return Ok(list.Data);
        }

        [HttpPost("Create")]

        public IActionResult Insert(FacturaViewModel item)
            {
            if (item.Fact_Id == 0)
            {
                var modele = _mapper.Map<tbFactura>(item);
                var modeloFactura = new FacturaViewModel()
                {
                    Fact_Id = item.Fact_Id,
                    Fact_Total = item.Fact_Total,
                    Clie_Identidad = item.Clie_Identidad,
                    Clie_Nombre = item.Clie_Nombre

                };
                var IdFactura = _restauranteServices.CrearFactura(modeloFactura, out int id);
                IdFactura.Message = id.ToString();

                var model = _mapper.Map<tbFacturaDetalle>(item);
                var modelo = new FacturaDetalleViewModel()
                {
                    FaDe_Ident = item.FaDe_Ident,
                    FaDe_ProdId = item.FaDe_ProdId,
                    FaDe_Cantidad = item.FaDe_Cantidad,
                    Fact_Id = Convert.ToInt32(IdFactura.Message),
                };
                var list = _restauranteServices.InsertarDetalle(modelo);
                return Ok(new { success = true, message = list.Message, id = IdFactura.Message });
            }
            else
            {
                var model = _mapper.Map<tbFacturaDetalle>(item);
                var modelo = new FacturaDetalleViewModel()
                {
                    FaDe_Ident = item.FaDe_Ident,
                    FaDe_ProdId = item.FaDe_ProdId,
                    FaDe_Cantidad = item.FaDe_Cantidad,
                    Fact_Id = item.Fact_Id
                };
                var list = _restauranteServices.InsertarDetalle(modelo);
                return Ok(new { success = true, message = list.Message, id = item.Fact_Id });
            }
        }

    }
}