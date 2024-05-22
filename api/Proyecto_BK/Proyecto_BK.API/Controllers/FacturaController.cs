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

        [HttpDelete("DeleteFactura/{FaDe_Id}")]
        public IActionResult DeleteFactura(int FaDe_Id)
        {
            var list = _restauranteServices.ElimnarFacturaDetalle(FaDe_Id);
            return Ok(list);
        }

        [HttpGet("List")]
        public IActionResult Index()
        {
            var list = _restauranteServices.ListadoFactura();
            return Ok(list.Data);
        }
        [HttpGet("ReporteEmpleados/{Empl_Id}/{FechaInicio}/{FechaFin}")]
        public IActionResult ReporEmpleado(int Empl_Id, string FechaInicio, string FechaFin)
        {
            var result = _restauranteServices.ReporteEmpleados(Empl_Id, FechaInicio, FechaFin);
            return Ok(result.Data);
        }

        [HttpGet("ReporteSucursalesTodos/{FechaInicio}/{FechaFin}")]
        public IActionResult ReporSucursalTodos(string FechaInicio, string FechaFin)
        {
            var result = _restauranteServices.ReporteSucursalesTodos(FechaInicio, FechaFin);
            return Ok(result.Data);
        }

        [HttpGet("ReporteEmpleadosTodos/{FechaInicio}/{FechaFin}")]
        public IActionResult ReporEmpleadoTodos(string FechaInicio, string FechaFin)
        {
            var result = _restauranteServices.ReporteEmpleadosTodos(FechaInicio, FechaFin);
            return Ok(result.Data);
        }

        [HttpGet("ReporteProductos/{FechaInicio}/{FechaFin}")]
        public IActionResult ReporProdu(string FechaInicio, string FechaFin)
        {
            var result = _restauranteServices.ReporteProductos(FechaInicio, FechaFin);
            return Ok(result.Data);
        }

        [HttpGet("ReporteIdentificador/{Sucu_Id}/{FechaInicio}/{FechaFin}")]
        public IActionResult ReporIdentificador(string Sucu_Id, string FechaInicio, string FechaFin)
        {
            var result = _restauranteServices.ReporteIdentificador(Sucu_Id, FechaInicio, FechaFin);
            return Ok(result.Data);
        }
        [HttpGet("ReporteSucursal/{Sucu_Id}/{FechaInicio}/{FechaFin}")]
        public IActionResult ReporSucursal(int Sucu_Id,string FechaInicio, string FechaFin)
        {
            var result = _restauranteServices.ReporteSucursal(Sucu_Id,FechaInicio, FechaFin);
            return Ok(result.Data);
        }

        [HttpGet("ReporteCompleto/{FechaInicio}/{FechaFin}")]
        public IActionResult ReporCompleto( string FechaInicio, string FechaFin)
        {
            var result = _restauranteServices.ReporteCompleto( FechaInicio, FechaFin);
            return Ok(result.Data);
        }

        [HttpGet("AlimentoMasVendido/{Usua_Usuario}/{FechaInicio}/{FechaFin}")]
        public IActionResult AlimentoVendido(string Usua_Usuario, string FechaInicio, string FechaFin)
        {
            var result = _restauranteServices.ListAlimentosMasVenidos(Usua_Usuario, FechaInicio, FechaFin);
            return Ok(result.Data);
        }
        [HttpGet("BebidaMasVendido/{Usua_Usuario}/{FechaInicio}/{FechaFin}")]
        public IActionResult BebidaVendido(string Usua_Usuario, string FechaInicio, string FechaFin)
        {
            var result = _restauranteServices.ListBebidasMasVenidos(Usua_Usuario, FechaInicio, FechaFin);
            return Ok(result.Data);
        }

        [HttpGet("PostreMasVendido/{Usua_Usuario}/{FechaInicio}/{FechaFin}")]
        public IActionResult PostreVendido(string Usua_Usuario, string FechaInicio, string FechaFin)
        {
            var result = _restauranteServices.ListPostreMasVenidos(Usua_Usuario, FechaInicio, FechaFin);
            return Ok(result.Data);
        }

        [HttpGet("SucursalesTop5/{Usua_Usuario}/{FechaInicio}/{FechaFin}")]
        public IActionResult SucuTop5(string Usua_Usuario, string FechaInicio, string FechaFin)
        {
            var result = _restauranteServices.ListSucursalesTop5(Usua_Usuario, FechaInicio, FechaFin);
            return Ok(result.Data);
        }

        [HttpGet("EmpleadosTop5/{Usua_Usuario}/{FechaInicio}/{FechaFin}")]
        public IActionResult EmplTop5(string Usua_Usuario, string FechaInicio, string FechaFin)
        {
            var result = _restauranteServices.ListEmpleadosTop5(Usua_Usuario, FechaInicio, FechaFin);
            return Ok(result.Data);
        }
        [HttpGet("ComplementosMasVendido/{Usua_Usuario}/{FechaInicio}/{FechaFin}")]
        public IActionResult ComplementosVendido(string Usua_Usuario, string FechaInicio, string FechaFin)
        {
            var result = _restauranteServices.ListComplementoMasVenidos(Usua_Usuario, FechaInicio, FechaFin);
            return Ok(result.Data);
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

        [HttpPost("Create/{Usua_Id}/{Sucu_Id}/{Empl_Id}")]

        public IActionResult Insert(int Usua_Id,int Sucu_Id, int Empl_Id, FacturaViewModel item)
            {
            if (item.Fact_Id == 0)
            {
                var modele = _mapper.Map<tbFactura>(item);
                var modeloFactura = new FacturaViewModel()
                {
                    Fact_Id = item.Fact_Id,
                    Fact_Total = item.Fact_Total,
                    Sucu_Id = Sucu_Id,
                    Empl_Id = Empl_Id,
                    Fact_Usua_Creacion = Usua_Id
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