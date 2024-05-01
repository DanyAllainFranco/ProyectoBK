using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto_BK.Common.Models
{
    public class PromocionPorComidaViewModel
    {
        public int PrSe_Id { get; set; }
        public int? Prom_Id { get; set; }
        public int? Bebi_Id { get; set; }
        public int? Post_id { get; set; }
        public int? Comp_Id { get; set; }
        public int? Alim_Id { get; set; }
        public int? PrSe_Usua_Creacion { get; set; }
        public DateTime? PrSe_Fecha_Creacion { get; set; }
        public int? PrSe_Usua_Modifica { get; set; }
        public DateTime? PrSe_Fecha_Modifica { get; set; }
        public bool? PrSe_Estado { get; set; }
    }
}
