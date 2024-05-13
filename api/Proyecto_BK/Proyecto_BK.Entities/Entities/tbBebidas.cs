﻿using System;
using System.Collections.Generic;

#nullable disable

namespace Proyecto_BK.Entities.Entities
{
    public partial class tbBebidas
    {
        public tbBebidas()
        {
            tbCombo = new HashSet<tbCombo>();
            tbPaquetesPorComidas = new HashSet<tbPaquetesPorComidas>();
            tbPromocionesPorBebidas = new HashSet<tbPromocionesPorBebidas>();
            tbPromocionesPorComidas = new HashSet<tbPromocionesPorComidas>();
        }

        public int Bebi_Id { get; set; }
        public string Bebi_Descripcion { get; set; }
        public decimal? Bebi_Precio { get; set; }
        public string Bebi_Imagen { get; set; }
        public int? Bebi_Usua_Creacion { get; set; }
        public DateTime? Bebi_Fecha_Creacion { get; set; }
        public int? Bebi_Usua_Modifica { get; set; }
        public DateTime? Bebi_Fecha_Modifica { get; set; }
        public bool? Bebi_Estado { get; set; }

        public virtual tbUsuarios Bebi_Usua_CreacionNavigation { get; set; }
        public virtual tbUsuarios Bebi_Usua_ModificaNavigation { get; set; }
        public virtual ICollection<tbCombo> tbCombo { get; set; }
        public virtual ICollection<tbPaquetesPorComidas> tbPaquetesPorComidas { get; set; }
        public virtual ICollection<tbPromocionesPorBebidas> tbPromocionesPorBebidas { get; set; }
        public virtual ICollection<tbPromocionesPorComidas> tbPromocionesPorComidas { get; set; }
    }
}