using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto_BK.Common.Models
{
    public class RolViewModel
    {
        public int Rol_Id { get; set; }
        public string Rol_Descripcion { get; set; }
        public int? Rol_Usua_Creacion { get; set; }
        public DateTime? Rol_Fecha_Creacion { get; set; }
        public int? Rol_Usua_Modifica { get; set; }
        public DateTime? Rol_Fecha_Modifica { get; set; }
        public bool? Rol_Estado { get; set; }
        [NotMapped]
        public string Pant_Descripcion { get; set; }
        [NotMapped]
        public string UsuarioCreacion { get; set; }
        [NotMapped]
        public string UsuarioModificacion { get; set; }
    }
}
