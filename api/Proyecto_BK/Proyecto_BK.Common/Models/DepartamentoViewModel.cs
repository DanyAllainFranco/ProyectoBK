using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto_BK.Common.Models
{
    public class DepartamentoViewModel
    {
        public string Dept_Codigo { get; set; }
        public string Dept_Descripcion { get; set; }
        public int Dept_Usua_Creacion { get; set; }
        public DateTime Dept_Fecha_Creacion { get; set; }
        public int? Dept_Usua_Modifica { get; set; }
        public DateTime? Dept_Fecha_Modifica { get; set; }
    }
}
