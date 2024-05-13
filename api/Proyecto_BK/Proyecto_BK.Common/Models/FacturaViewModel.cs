using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto_BK.Common.Models
{
    public class FacturaViewModel
    {
        public DateTime? Fact_Fecha { get; set; }
        public decimal? Fact_Total { get; set; }
        public string Clie_Identidad { get; set; }
        public string Clie_Nombre { get; set; }
        public int? Fact_Id { get; set; }
        public int? FaDe_Cantidad { get; set; }
        public int? FaDe_Subtotal { get; set; }
        public string FaDe_Ident { get; set; }
        public int? FaDe_ProdId { get; set; }
        public string Producto { get; set; }
        public string Precio { get; set; }
        public string Cantidad { get; set; }
        public string Categoria { get; set; } 
        public string Total { get; set; }

    }
}

