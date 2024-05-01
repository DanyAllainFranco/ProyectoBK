using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto_BK.Common.Models
{
    public class PaqueteViewModel
    {
        public int Paqe_Id { get; set; }
        public string Paqe_Descripcion { get; set; }
        public decimal? Paqe_Precio { get; set; }
        public string Paqe_Imagen { get; set; }
        public int? Paqe_Usua_Creacion { get; set; }
        public DateTime? Paqe_Fecha_Creacion { get; set; }
        public int? Paqe_Usua_Modifica { get; set; }
        public DateTime? Paqe_Fecha_Modifica { get; set; }
        public bool? Paqe_Estado { get; set; }
    }
}
