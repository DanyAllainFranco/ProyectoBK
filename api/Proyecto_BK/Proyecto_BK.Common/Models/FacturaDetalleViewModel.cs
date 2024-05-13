using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto_BK.Common.Models
{
    public class FacturaDetalleViewModel
    {
        public int FaDe_Id { get; set; }
        public int? Fact_Id { get; set; }
        public int? FaDe_Cantidad { get; set; }
        public int? FaDe_Subtotal { get; set; }
        public string FaDe_Ident { get; set; }
        public int? FaDe_ProdId { get; set; }
    }
}
