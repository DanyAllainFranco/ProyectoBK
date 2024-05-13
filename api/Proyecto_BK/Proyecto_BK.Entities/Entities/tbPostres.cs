﻿using System;
using System.Collections.Generic;

#nullable disable

namespace Proyecto_BK.Entities.Entities
{
    public partial class tbPostres
    {
        public tbPostres()
        {
            tbCombo = new HashSet<tbCombo>();
            tbPaquetesPorComidas = new HashSet<tbPaquetesPorComidas>();
            tbPromocionesPorComidas = new HashSet<tbPromocionesPorComidas>();
            tbPromocionesPorPostres = new HashSet<tbPromocionesPorPostres>();
        }

        public int Post_id { get; set; }
        public string Post_Descripcion { get; set; }
        public decimal? Post_Precio { get; set; }
        public string Post_Imagen { get; set; }
        public int? Post_Usua_Creacion { get; set; }
        public DateTime? Post_Fecha_Creacion { get; set; }
        public int? Post_Usua_Modifica { get; set; }
        public DateTime? Post_Fecha_Modifica { get; set; }
        public bool? Post_Estado { get; set; }

        public virtual tbUsuarios Post_Usua_CreacionNavigation { get; set; }
        public virtual tbUsuarios Post_Usua_ModificaNavigation { get; set; }
        public virtual ICollection<tbCombo> tbCombo { get; set; }
        public virtual ICollection<tbPaquetesPorComidas> tbPaquetesPorComidas { get; set; }
        public virtual ICollection<tbPromocionesPorComidas> tbPromocionesPorComidas { get; set; }
        public virtual ICollection<tbPromocionesPorPostres> tbPromocionesPorPostres { get; set; }
    }
}