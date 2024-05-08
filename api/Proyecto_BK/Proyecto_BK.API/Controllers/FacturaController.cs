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
    public class FacturaContoller : Controller
    {
        private readonly RestauranteServices _restauranteServices;
        private readonly IMapper _mapper;

        public FacturaContoller(RestauranteServices restauranteServices, IMapper mapper)
        {
            _restauranteServices = restauranteServices;
            _mapper = mapper;
        }

        [HttpGet("API/[controller]/List")]
        public IActionResult List()
        {
            var list = _restauranteServices.ListFactura();
            return Ok(list.Data);
        }

        [HttpGet("API/[controller]/Find")]
        public IActionResult Find(int Fact_Id)
        {
            var result = _restauranteServices.LlenarFactura(Fact_Id);
            return Ok(result);
        }
  
        [HttpPost("API/[controller]/Insert")]
        public IActionResult Create(FacturaViewModel json)
        {
            _mapper.Map<FacturaViewModel>(json);
            var modelo = new FacturaViewModel()
            {
               Sucu_Id = json.Sucu_Id,
                Empl_Id = json.Empl_Id,
                Fact_Fecha = DateTime.Now,
                Fact_Total = json.Fact_Total,
                Fact_Fecha_Creacion = DateTime.Now,
                Fact_Usua_Creacion = 1,
                Clie_Id = json.Clie_Id,
                Fact_Id = json.Fact_Id,
                Prom_Id = json.Prom_Id,
                Comb_Id = json.Comb_Id,
                Paqe_Id = json.Paqe_Id,
                Bebi_Id = json.Bebi_Id,
                Post_id = json.Post_id,
                Comp_Id = json.Comp_Id,
                Alim_Id = json.Alim_Id,
                FaDe_Cantidad = json.FaDe_Cantidad,
                FaDe_Subtotal = json.FaDe_Subtotal,
                FaDe_Usua_Creacion = 1,
                FaDe_Fecha_Creacion = DateTime.Now,
                Clie_Identidad = json.Clie_Identidad,
                Clie_Nombre = json.Clie_Nombre,
                Clie_Apellido = "N/D",
                Clie_Sexo = "N",
                Clie_Correo = "N/D",
                Esta_Id = 1,
                Muni_Codigo = "0501",
                Carg_Id = 6,
                Clie_Usua_Creacion = 1,
                Clie_Fecha_Creacion = DateTime.Now
            };
            var response = _restauranteServices.CrearFactuea(modelo);
            return Ok(response);
        }
    }
}
