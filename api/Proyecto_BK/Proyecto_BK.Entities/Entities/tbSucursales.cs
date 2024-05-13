﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Proyecto_BK.Entities.Entities
{
    public partial class tbSucursales
    {
        public tbSucursales()
        {
            tbFactura = new HashSet<tbFactura>();
            tbPromocionesPorSusursales = new HashSet<tbPromocionesPorSusursales>();
        }

        public int Sucu_Id { get; set; }
        public string Sucu_Descripcion { get; set; }
        public string Muni_Codigo { get; set; }
        public int? Empl_Id { get; set; }
        public int? Sucu_Usua_Creacion { get; set; }
        public DateTime? Sucu_Fecha_Creacion { get; set; }
        public int? Sucu_Usua_Modifica { get; set; }
        public DateTime? Sucu_Fecha_Modifica { get; set; }
        public bool? Sucu_Estado { get; set; }
        [NotMapped]
        public string Muni_Descripcion { get; set; }
        public virtual tbEmpleados Empl { get; set; }
        public virtual tbMunicipios Muni_CodigoNavigation { get; set; }
        public virtual tbUsuarios Sucu_Usua_CreacionNavigation { get; set; }
        public virtual tbUsuarios Sucu_Usua_ModificaNavigation { get; set; }
        public virtual ICollection<tbFactura> tbFactura { get; set; }
        public virtual ICollection<tbPromocionesPorSusursales> tbPromocionesPorSusursales { get; set; }
    }
}