using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Proyecto_BK.Entities.Entities
{
    public partial class tbPromociones
    {
        public tbPromociones()
        {
            tbPromocionesPorAlimentos = new HashSet<tbPromocionesPorAlimentos>();
            tbPromocionesPorBebidas = new HashSet<tbPromocionesPorBebidas>();
            tbPromocionesPorComidas = new HashSet<tbPromocionesPorComidas>();
            tbPromocionesPorComplementos = new HashSet<tbPromocionesPorComplementos>();
            tbPromocionesPorPostres = new HashSet<tbPromocionesPorPostres>();
            tbPromocionesPorSusursales = new HashSet<tbPromocionesPorSusursales>();
        }

        public int Prom_Id { get; set; }
        public string Prom_Descripcion { get; set; }
        public decimal? Prom_Precio { get; set; }
        public string Prom_Imagen { get; set; }
        public int? Dias_Id { get; set; }
        public int? Prom_Usua_Creacion { get; set; }
        public DateTime? Prom_Fecha_Creacion { get; set; }
        public int? Prom_Usua_Modifica { get; set; }
        public DateTime? Prom_Fecha_Modifica { get; set; }
        public bool? Prom_Estado { get; set; }
        [NotMapped]
        public string Dias_Descripcion { get; set; }
        public virtual tbDias Dias { get; set; }
        public virtual tbUsuarios Prom_Usua_CreacionNavigation { get; set; }
        public virtual tbUsuarios Prom_Usua_ModificaNavigation { get; set; }
        public virtual ICollection<tbPromocionesPorAlimentos> tbPromocionesPorAlimentos { get; set; }
        public virtual ICollection<tbPromocionesPorBebidas> tbPromocionesPorBebidas { get; set; }
        public virtual ICollection<tbPromocionesPorComidas> tbPromocionesPorComidas { get; set; }
        public virtual ICollection<tbPromocionesPorComplementos> tbPromocionesPorComplementos { get; set; }
        public virtual ICollection<tbPromocionesPorPostres> tbPromocionesPorPostres { get; set; }
        public virtual ICollection<tbPromocionesPorSusursales> tbPromocionesPorSusursales { get; set; }
    }
}