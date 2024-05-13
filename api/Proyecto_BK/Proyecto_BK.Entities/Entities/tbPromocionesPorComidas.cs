using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Proyecto_BK.Entities.Entities
{
    public partial class tbPromocionesPorComidas
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
        [NotMapped]
        public string Bebi_Descripcion { get; set; }
        [NotMapped]
        public string Post_Descripcion { get; set; }
        [NotMapped]
        public string Comp_Descripcion { get; set; }
        [NotMapped]
        public string Alim_Descripcion { get; set; }
        [NotMapped]
        public string Prom_Descripcion { get; set; }
        public virtual tbAlimentos Alim { get; set; }
        public virtual tbBebidas Bebi { get; set; }
        public virtual tbComplementos Comp { get; set; }
        public virtual tbPostres Post { get; set; }
        public virtual tbUsuarios PrSe_Usua_CreacionNavigation { get; set; }
        public virtual tbUsuarios PrSe_Usua_ModificaNavigation { get; set; }
        public virtual tbPromociones Prom { get; set; }
    }
}