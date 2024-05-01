using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto_BK.Common.Models
{
    public class BebidaViewModel
    {
        public int Bebi_Id { get; set; }
        public string Bebi_Descripcion { get; set; }
        public decimal? Bebi_Precio { get; set; }
        public string Bebi_Imagen { get; set; }
        public int? Bebi_Usua_Creacion { get; set; }
        public DateTime? Bebi_Fecha_Creacion { get; set; }
        public int? Bebi_Usua_Modifica { get; set; }
        public DateTime? Bebi_Fecha_Modifica { get; set; }
        public bool? Bebi_Estado { get; set; }
    }
}
