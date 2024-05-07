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
                //parameter.Add("@Sucu_Id", item.Sucu_Id);
                //parameter.Add("@Empl_Id", item.Empl_Id);
                //parameter.Add("@Fact_Fecha", item.Fact_Fecha);
                //parameter.Add("@Fact_Total", item.Fact_Total);
                //parameter.Add("@Fact_Fecha_Creacion", item.Fact_Fecha_Creacion);
                //parameter.Add("Usua_Fecha_Creacion", item.Fact_Usua_Creacion);
                //parameter.Add("@Fact_Id", item.Fact_Id);
                //parameter.Add("@Prom_Id", item.Prom_Id);
                //parameter.Add("@Comb_Id", item.Comb_Id);
                //parameter.Add("@Paqe_Id", item.Paqe_Id);
                //parameter.Add("@Bebi_Id", item.Bebi_Id);
                //parameter.Add("@Post_id", item.Post_id);
                //parameter.Add("@Comp_Id", item.Comb_Id);
                //parameter.Add("@Alim_Id", item.Alim_Id);
                //parameter.Add("@FaDe_Cantidad", item.FaDe_Cantidad);
                //parameter.Add("@FaDe_Subtotal", item.FaDe_Subtotal);
                //parameter.Add("@FaDe_Usua_Creacion", item.FaDe_Usua_Creacion);
                //parameter.Add("@FaDe_Fecha_Creacion", item.FaDe_Fecha_Creacion);

                Sucu_Id = json.Sucu_Id,
                Empl_Id = json.Empl_Id,
                Fact_Fecha = DateTime.Now,
                Fact_Total = json.Fact_Total,
                Fact_Fecha_Creacion = DateTime.Now,
                Fact_Usua_Creacion = 1,
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
                FaDe_Fecha_Creacion = DateTime.Now
            };
            var response = _restauranteServices.CrearFactuea(modelo);
            return Ok(response);
        }
    }
}
