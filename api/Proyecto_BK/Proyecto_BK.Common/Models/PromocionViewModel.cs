using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto_BK.Common.Models
{
    public class PromocionViewModel
    {
        public int Prom_Id { get; set; }
        public string Prom_Descripcion { get; set; }
        public decimal? Prom_Precio { get; set; }
        public string Prom_Imagen { get; set; }
        public int Dias_Id { get; set; }
        public int? Prom_Usua_Creacion { get; set; }
        public DateTime? Prom_Fecha_Creacion { get; set; }
        public int? Prom_Usua_Modifica { get; set; }
        public DateTime? Prom_Fecha_Modifica { get; set; }
        public bool? Prom_Estado { get; set; }
        [NotMapped]
        public string Bebi_Descripcion { get; set; }
        [NotMapped]
        public string Alim_Descripcion { get; set; }
        [NotMapped]
        public string Dias_Descripcion { get; set; }
        [NotMapped]
        public string Post_Descripcion { get; set; }
        [NotMapped]
        public string Comp_Descripcion { get; set; }
        [NotMapped]
        public string Usua_Creacion { get; set; }
        [NotMapped]
        public string Usua_Modifica { get; set; }
    }
}
