using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto_BK.Common.Models
{
    public class ComplementoViewModel
    {
        public int Comp_Id { get; set; }
        public string Comp_Descripcion { get; set; }
        public decimal? Comp_Precio { get; set; }
        public string Comp_Imagen { get; set; }
        public int? Comp_Usua_Creacion { get; set; }
        public DateTime? Comp_Fecha_Creacion { get; set; }
        public int? Comp_Usua_Modifica { get; set; }
        public DateTime? Comp_Fecha_Modifica { get; set; }
        public bool? Comp_Estado { get; set; }
    }
}
