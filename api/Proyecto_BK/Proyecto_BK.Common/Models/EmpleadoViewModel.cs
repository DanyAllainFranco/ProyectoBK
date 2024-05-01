using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto_BK.Common.Models
{
    public class EmpleadoViewModel
    {

        public int Empl_Id { get; set; }
        public string Empl_Identidad { get; set; }
        public string Empl_Nombre { get; set; }
        public string Empl_Apellido { get; set; }
        public string Empl_Sexo { get; set; }
        public string Empl_Correo { get; set; }
        public int? Esta_Id { get; set; }
        public string Muni_Codigo { get; set; }
        public int? Carg_Id { get; set; }
        public int? Empl_Usua_Creacion { get; set; }
        public DateTime? Empl_Fecha_Creacion { get; set; }
        public int? Empl_Usua_Modifica { get; set; }
        public DateTime? Empl_Fecha_Modifica { get; set; }
        public bool? Empl_Estado { get; set; }
    }
}
