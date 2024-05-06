using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto_BK.Common.Models
{
   public class UsuarioViewModel
    {
        public int Usua_Id { get; set; }
        public string Usua_Usuario { get; set; }
        public string Usua_Contra { get; set; }
        public bool? Usua_Admin { get; set; }
        public int? Empl_Id { get; set; }
        public int? Rol_Id { get; set; }

        [NotMapped]
        public string Rol_Descripcion { get; set; }

        public int? Usua_Usua_Creacion { get; set; }
        public DateTime? Usua_Fecha_Creacion { get; set; }
        public int? Usua_Usua_Modifica { get; set; }
        public DateTime? Usua_Fecha_Modifica { get; set; }
        public bool? Usua_Activo { get; set; }

        [NotMapped]
        public string Empl_Empleado { get; set; }
        [NotMapped]
        public int Pant_Id { get; set; }
        [NotMapped]
        public string Pant_Descripcion { get; set; }

    }
}
