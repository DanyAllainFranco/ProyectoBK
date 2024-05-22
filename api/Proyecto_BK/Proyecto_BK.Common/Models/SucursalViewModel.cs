using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto_BK.Common.Models
{
    public class SucursalViewModel
    {

        public int Sucu_Id { get; set; }
        public string Sucu_Descripcion { get; set; }
        public string Muni_Codigo { get; set; }
        [NotMapped]
        public string Usua_Creacion { get; set; }
        [NotMapped]
        public string Usua_Modifica { get; set; }
        [NotMapped]

        public string Muni_Descripcion { get; set; }
        [NotMapped]
        public string Dept_Descripcion { get; set; }
        public int? Empl_Id { get; set; }
        public int? Sucu_Usua_Creacion { get; set; }
        public DateTime? Sucu_Fecha_Creacion { get; set; }
        public int? Sucu_Usua_Modifica { get; set; }
        public DateTime? Sucu_Fecha_Modifica { get; set; }
        public bool? Sucu_Estado { get; set; }
    }
}
