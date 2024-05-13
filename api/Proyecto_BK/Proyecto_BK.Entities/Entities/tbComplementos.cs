﻿using System;
using System.Collections.Generic;

#nullable disable

namespace Proyecto_BK.Entities.Entities
{
    public partial class tbComplementos
    {
        public tbComplementos()
        {
            tbCombo = new HashSet<tbCombo>();
            tbPaquetesPorComidas = new HashSet<tbPaquetesPorComidas>();
            tbPromocionesPorComidas = new HashSet<tbPromocionesPorComidas>();
            tbPromocionesPorComplementos = new HashSet<tbPromocionesPorComplementos>();
        }

        public int Comp_Id { get; set; }
        public string Comp_Descripcion { get; set; }
        public decimal? Comp_Precio { get; set; }
        public string Comp_Imagen { get; set; }
        public int? Comp_Usua_Creacion { get; set; }
        public DateTime? Comp_Fecha_Creacion { get; set; }
        public int? Comp_Usua_Modifica { get; set; }
        public DateTime? Comp_Fecha_Modifica { get; set; }
        public bool? Comp_Estado { get; set; }

        public virtual tbUsuarios Comp_Usua_CreacionNavigation { get; set; }
        public virtual tbUsuarios Comp_Usua_ModificaNavigation { get; set; }
        public virtual ICollection<tbCombo> tbCombo { get; set; }
        public virtual ICollection<tbPaquetesPorComidas> tbPaquetesPorComidas { get; set; }
        public virtual ICollection<tbPromocionesPorComidas> tbPromocionesPorComidas { get; set; }
        public virtual ICollection<tbPromocionesPorComplementos> tbPromocionesPorComplementos { get; set; }
    }
}