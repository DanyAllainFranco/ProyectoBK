using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto_BK.Common.Models
{
    public class PantallaPorRolViewModel
    {
        public int Paro_Id { get; set; }
        public int? Rol_Id { get; set; }
        public int? Pant_Id { get; set; }
        public int? Paro_Usua_Creacion { get; set; }
        public DateTime? Paro_Fecha_Creacion { get; set; }
        public int? Paro_Usua_Modifica { get; set; }
        public DateTime? Paro_Fecha_Modifica { get; set; }
        public bool? Paro_Estado { get; set; }
    }
}
