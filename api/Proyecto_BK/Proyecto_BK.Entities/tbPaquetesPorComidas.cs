﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Proyecto_BK.Entities
{
    public partial class tbPaquetesPorComidas
    {
        public int PaCo_Id { get; set; }
        public int? Paqe_Id { get; set; }
        public int? Prod_Id { get; set; }
        public int? PaCo_Cantidad { get; set; }
        public string PaCo_Identificador { get; set; }
        public int? PaCo_Usua_Creacion { get; set; }
        public DateTime? PaCo_Fecha_Creacion { get; set; }
        public int? PaCo_Usua_Modifica { get; set; }
        public DateTime? PaCo_Fecha_Modifica { get; set; }
        public bool? PaCo_Estado { get; set; }

        [NotMapped]
        public string Alim_Id { get; set; }
        [NotMapped]
        public string Alim_Descripcion { get; set; }
        [NotMapped]
        public string Alim_Precio { get; set; }

        [NotMapped]
        public string Bebi_Id { get; set; }
        [NotMapped]
        public string Bebi_Descripcion { get; set; }
        [NotMapped]
        public string Bebi_Precio { get; set; }


        [NotMapped]
        public string Post_id { get; set; }
        [NotMapped]
        public string Post_Descripcion { get; set; }
        [NotMapped]
        public string Post_Precio { get; set; }


        [NotMapped]
        public string Comp_Id { get; set; }
        [NotMapped]
        public string Comp_Descripcion { get; set; }
        [NotMapped]
        public string Comp_Precio { get; set; }

        public virtual tbAlimentos Alim { get; set; }
        public virtual tbBebidas Bebi { get; set; }
        public virtual tbComplementos Comp { get; set; }
        public virtual tbUsuarios PaCo_Usua_CreacionNavigation { get; set; }
        public virtual tbUsuarios PaCo_Usua_ModificaNavigation { get; set; }
        public virtual tbPaquetes Paqe { get; set; }
        public virtual tbPostres Post { get; set; }
    }
}