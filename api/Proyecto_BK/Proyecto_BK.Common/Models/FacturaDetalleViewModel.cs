using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
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
        [NotMapped]
        public string Sucursal { get; set; }
        [NotMapped]
        public string Empleado { get; set; }
        [NotMapped]
        public string Producto { get; set; }
        [NotMapped]
        public string Tipo { get; set; }

        [NotMapped]
        public string Cantidad { get; set; }
        [NotMapped]
        public string Subtotal { get; set; }

    }
}
