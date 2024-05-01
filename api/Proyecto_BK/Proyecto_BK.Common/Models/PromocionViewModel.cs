using System;
using System.Collections.Generic;
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
        public string Prom_Dia { get; set; }
        public int? Prom_Usua_Creacion { get; set; }
        public DateTime? Prom_Fecha_Creacion { get; set; }
        public int? Prom_Usua_Modifica { get; set; }
        public DateTime? Prom_Fecha_Modifica { get; set; }
        public bool? Prom_Estado { get; set; }
    }
}
