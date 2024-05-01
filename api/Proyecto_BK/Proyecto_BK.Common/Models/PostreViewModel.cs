using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto_BK.Common.Models
{
    public class PostreViewModel
    {

        public int Post_id { get; set; }
        public string Post_Descripcion { get; set; }
        public decimal? Post_Precio { get; set; }
        public string Post_Imagen { get; set; }
        public int? Post_Usua_Creacion { get; set; }
        public DateTime? Post_Fecha_Creacion { get; set; }
        public int? Post_Usua_Modifica { get; set; }
        public DateTime? Post_Fecha_Modifica { get; set; }
        public bool? Post_Estado { get; set; }
    }
}
