using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto_BK.Common.Models
{
    public class MunicipioViewModel
    {

        public string Muni_Codigo { get; set; }
        public string Muni_Descripcion { get; set; }
        public string Dept_Codigo { get; set; }
        public int Muni_Usua_Creacion { get; set; }
        public DateTime Muni_Fecha_Creacion { get; set; }
        public int? Muni_Usua_Modifica { get; set; }
        public DateTime? Muni_Fecha_Modifica { get; set; }

        [NotMapped]
        public string Dept_Descripcion { get; set; }
        [NotMapped]
        public string Usua_Creacion { get; set; }
        [NotMapped]
        public string Usua_Modifica { get; set; }
  
    }
}
