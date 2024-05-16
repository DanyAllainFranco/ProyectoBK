using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto_BK.Common.Models
{
    public class PaquetePorComidaViewModel
    {
        public int PaCo_Id { get; set; }
        public int? Paqe_Id { get; set; }
        public int? Prod_Id { get; set; }
        public int? PaCo_Cantidad { get; set; }
        public string PaCo_Identificador { get; set; }
        public int? PaCo_Usua_Creacion { get; set; }
        public DateTime? PaCo_Fecha_Creacion { get; set; }
        public int? PaCo_Usua_Modifica { get; set; }
        public DateTime? PaCo_Fecha_Modifica { get; set; }
        public bool? PaCo_Estado { get; set; }
    }
}
