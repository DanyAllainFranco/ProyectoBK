using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto_BK.Common.Models
{
    public class AlimentoViewModel
    {
        public int Alim_Id { get; set; }
        public string Alim_Descripcion { get; set; }
        public decimal? Alim_Precio { get; set; }
        public string Alim_Imagen { get; set; }
        public int? Alim_Usua_Creacion { get; set; }
        public DateTime? Alim_Fecha_Creacion { get; set; }
        public int? Alim_Usua_Modifica { get; set; }
        public DateTime? Alim_Fecha_Modifica { get; set; }
        public bool? Alim_Estado { get; set; }
    }
}
