using System;
using Proyecto_BK.Entities.Entities;
using System;
using System.Collections.Generic;

#nullable disable

namespace Proyecto_BK.Entities
{
    public partial class tbCombosPersonales
    {
        public tbCombosPersonales()
        {
            tbFacturaDetalle = new HashSet<tbFacturaDetalle>();
        }

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



        public virtual tbAlimentos Alim { get; set; }
        public virtual tbBebidas Bebi { get; set; }
        public virtual tbUsuarios Comb_Usua_CreacionNavigation { get; set; }
        public virtual tbUsuarios Comb_Usua_ModificaNavigation { get; set; }
        public virtual tbComplementos Comp { get; set; }
        public virtual tbPostres Post { get; set; }
        public virtual ICollection<tbFacturaDetalle> tbFacturaDetalle { get; set; }
    }
}