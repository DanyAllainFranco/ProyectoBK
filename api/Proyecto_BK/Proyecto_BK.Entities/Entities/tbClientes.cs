﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Proyecto_BK.Entities
{
    public partial class tbClientes
    {
        public int Clie_Id { get; set; }
        public string Clie_Identidad { get; set; }
        public string Clie_Nombre { get; set; }
        public string Clie_Apellido { get; set; }
        public string Clie_Sexo { get; set; }
        public string Clie_Correo { get; set; }
        public int? Esta_Id { get; set; }
        public string Muni_Codigo { get; set; }
        public int? Carg_Id { get; set; }
        public int? Clie_Usua_Creacion { get; set; }
        public DateTime? Clie_Fecha_Creacion { get; set; }
        public int? Clie_Usua_Modifica { get; set; }
        public DateTime? Clie_Fecha_Modifica { get; set; }
        public bool? Clie_Estado { get; set; }

        public virtual tbCargos Carg { get; set; }
        public virtual tbUsuarios Clie_Usua_CreacionNavigation { get; set; }
        public virtual tbUsuarios Clie_Usua_ModificaNavigation { get; set; }
        public virtual tbEstadosCiviles Esta { get; set; }
        public virtual tbMunicipios Muni_CodigoNavigation { get; set; }
    }
}