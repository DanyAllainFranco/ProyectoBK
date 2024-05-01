using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto_BK.Common.Models
{
    public class EstadoCivilViewModel
    {
        public int Esta_Id { get; set; }
        public string Esta_Descripcion { get; set; }
        public int Esta_Usua_Creacion { get; set; }
        public DateTime Esta_Fecha_Creacion { get; set; }
        public int? Esta_Usua_Modifica { get; set; }
        public DateTime? Esta_Fecha_Modifica { get; set; }
    }
}
