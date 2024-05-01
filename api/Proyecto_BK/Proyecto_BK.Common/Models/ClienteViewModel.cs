using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto_BK.Common.Models
{
    public class ClienteViewModel
    {
        public int Clie_Id { get; set; }
        public string Clie_Identidad { get; set; }
        public string Clie_Nombre { get; set; }
        public string Clie_Apellido { get; set; }
        public string Clie_Sexo { get; set; }
        public string Clie_Correo { get; set; }
        public int? Esta_Id { get; set; }
        public string Muni_Codigo { get; set; }
        public int? Carg_Id { get; set; }
        public int? Clie_Usua_Creacion { get; set; }
        public DateTime? Clie_Fecha_Creacion { get; set; }
        public int? Clie_Usua_Modifica { get; set; }
        public DateTime? Clie_Fecha_Modifica { get; set; }
        public bool? Clie_Estado { get; set; }
    }
}
