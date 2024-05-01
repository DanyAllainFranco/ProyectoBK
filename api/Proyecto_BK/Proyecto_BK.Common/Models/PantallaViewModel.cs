using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto_BK.Common.Models
{
   public class PantallaViewModel
    {
        public int Pant_Id { get; set; }
        public string Pant_Descripcion { get; set; }
        public int? Pant_Usua_Creacion { get; set; }
        public DateTime? Pant_Fecha_Creacion { get; set; }
        public int? Pant_Usua_Modifica { get; set; }
        public DateTime? Pant_Fecha_Modifica { get; set; }
        public bool? Pant_Estado { get; set; }
    }
}
