using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto_BK.Common.Models
{
    public class PostreViewModel
    {

        public int Post_id { get; set; }
        public string Post_Descripcion { get; set; }
        public decimal? Post_Precio { get; set; }
        public string Post_Imagen { get; set; }
        public int? Post_Usua_Creacion { get; set; }
        public DateTime? Post_Fecha_Creacion { get; set; }
        public int? Post_Usua_Modifica { get; set; }
        public DateTime? Post_Fecha_Modifica { get; set; }
        public bool? Post_Estado { get; set; }
        [NotMapped]
        public string CantidadAgregada { get; set; }
        [NotMapped]
        public string Usua_Creacion { get; set; }
        [NotMapped]
        public string Usua_Modifica { get; set; }
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
