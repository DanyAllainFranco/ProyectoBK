using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto_BK.Common.Models
{
   public class CargoViewModel
    {
        public int Carg_Id { get; set; }
        public string Carg_Descripcion { get; set; }
        public int? Carg_Usua_Creacion { get; set; }
        public DateTime? Carg_Fecha_Creacion { get; set; }
        public int? Carg_Usua_Modifica { get; set; }
        public DateTime? Carg_Fecha_Modifica { get; set; }
        public bool? Carg_Estado { get; set; }
        [NotMapped]
        public string Usua_Creacion { get; set; }
        [NotMapped]
        public string Usua_Modifica { get; set; }
    }
}
