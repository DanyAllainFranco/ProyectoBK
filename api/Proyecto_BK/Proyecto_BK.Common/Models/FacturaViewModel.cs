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
        public string Sucu_Descripcion { get; set; }
        public int? Empl_Id { get; set; }
        public string Empl_Nombre { get; set; }
        public DateTime? Fact_Fecha { get; set; }
        public decimal? Fact_Total { get; set; }
        public int? Fact_Usua_Creacion { get; set; }
        public DateTime? Fact_Fecha_Creacion { get; set; }
        public int? Fact_Usua_Modifica { get; set; }
        public DateTime? Fact_Fecha_Modifica { get; set; }
        public bool? Fact_Estado { get; set; }
        public int Clie_Id { get; set; }
        public string Clie_Identidad { get; set; }
        public string Clie_Nombre { get; set; }
        public string Clie_Apellido { get; set; }
        public string Clie_Sexo { get; set; }
        public string Clie_Correo { get; set; }
        public int? Esta_Id { get; set; }
        public string Muni_Codigo { get; set; }
        public int? Carg_Id { get; set; }
        public int? Clie_Usua_Creacion { get; set; }
        public DateTime? Clie_Fecha_Creacion { get; set; }

        public int? Fact_Id { get; set; }
        public int? FaDe_Cantidad { get; set; }
        public int? FaDe_Subtotal { get; set; }
        public string FaDe_Ident { get; set; }
        public int? FaDe_ProdId { get; set; }
    }
}
