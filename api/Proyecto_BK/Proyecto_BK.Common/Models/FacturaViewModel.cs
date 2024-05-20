using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
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
        [NotMapped]
        public string Alim_Descripcion { get; set; }
        [NotMapped]
        public string Alim_Precio { get; set; }
        [NotMapped]
        public string Alim_Imagen { get; set; }

        [NotMapped]
        public string Bebi_Descripcion { get; set; }
        [NotMapped]
        public string Bebi_Precio { get; set; }
        [NotMapped]
        public string Bebi_Imagen { get; set; }

        [NotMapped]
        public string Comp_Descripcion { get; set; }
        [NotMapped]
        public string Comp_Precio { get; set; }
        [NotMapped]
        public string Comp_Imagen { get; set; }

        [NotMapped]
        public string Post_Descripcion { get; set; }
        [NotMapped]
        public string Post_Precio { get; set; }
        [NotMapped]
        public string Post_Imagen { get; set; }
        [NotMapped]
        public string Sucu_Descripcion { get; set; }
        [NotMapped]
        public string Empleado { get; set; }


        [NotMapped]
        public string CantidadVentas { get; set; }

    }
}

