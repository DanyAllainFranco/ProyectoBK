using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto_BK.Common.Models
{
   public class FacturaViewModel
    {
        public int? Sucu_Id { get; set; }
        public int? Empl_Id { get; set; }
        public DateTime? Fact_Fecha { get; set; }
        public decimal? Fact_Total { get; set; }
        public int? Fact_Usua_Creacion { get; set; }
        public DateTime? Fact_Fecha_Creacion { get; set; }
        public int? Fact_Usua_Modifica { get; set; }
        public DateTime? Fact_Fecha_Modifica { get; set; }
        public bool? Fact_Estado { get; set; }
        public int FaDe_Id { get; set; }
        public int? Fact_Id { get; set; }
        public int? Prom_Id { get; set; }
        public int? Comb_Id { get; set; }
        public int? Paqe_Id { get; set; }

        public int? Bebi_Id { get; set; }

        public int? FaDe_Subtotal { get; set; }
        public int? Post_id { get; set; }
        public int? Comp_Id { get; set; }
        public int? Alim_Id { get; set; }
        public int? FaDe_Cantidad { get; set; }
        public int? FaDe_Usua_Creacion { get; set; }
        public DateTime? FaDe_Fecha_Creacion { get; set; }


    }
}
