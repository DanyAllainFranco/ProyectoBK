using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto_BK.Common.Models
{
    public class ComboPersonalViewModel
    {
        public int Comb_Id { get; set; }
        public string Comb_Descripcion { get; set; }
        public decimal? Comb_Precio { get; set; }
        public string Comb_Imagen { get; set; }
        public int? Bebi_Id { get; set; }
        public int? Post_id { get; set; }
        public int? Comp_Id { get; set; }
        public int? Alim_Id { get; set; }
        public int? Comb_Usua_Creacion { get; set; }
        public DateTime? Comb_Fecha_Creacion { get; set; }
        public int? Comb_Usua_Modifica { get; set; }
        public DateTime? Comb_Fecha_Modifica { get; set; }
        public bool? Comb_Estado { get; set; }

        public string Bebi_Descripcion { get; set; }
        public string Post_Descripcion { get; set; }
        public string Comp_Descripcion { get; set; }
        public string Alim_Descripcion { get; set; }


        public string Usua_Usuario { get; set; }
        public int TotalPedidosCombos { get; set; }
        public int Paqe_Id { get; set; }
        public string Paqe_Descripcion { get; set; }
        public int TotalPedidosPaquetes { get; set; }
        public int TotalPedidosAlimentos { get; set; }
        public int TotalPedidosPostres { get; set; }
    }
}
