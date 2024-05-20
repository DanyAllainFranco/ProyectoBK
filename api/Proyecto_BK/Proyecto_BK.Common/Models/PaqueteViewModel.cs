using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto_BK.Common.Models
{
    public class PaqueteViewModel
    {
        public int Paqe_Id { get; set; }
        public string Paqe_Descripcion { get; set; }
        public decimal? Paqe_Precio { get; set; }
        public string Paqe_Imagen { get; set; }
        public int? Paqe_Usua_Creacion { get; set; }
        public DateTime? Paqe_Fecha_Creacion { get; set; }
        public int? Paqe_Usua_Modifica { get; set; }
        public DateTime? Paqe_Fecha_Modifica { get; set; }
        public bool? Paqe_Estado { get; set; }
        [NotMapped]

        public string text { get; set; }
        [NotMapped]
        public int value { get; set; }
        [NotMapped]

        public string image { get; set; }
        [NotMapped]
        public decimal precio { get; set; }

    }
}
