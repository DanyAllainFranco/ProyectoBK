﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Proyecto_BK.Entities.Entities
{
    public partial class tbRoles
    {
        public tbRoles()
        {
            tbPantallasPorRoles = new HashSet<tbPantallasPorRoles>();
            tbUsuarios = new HashSet<tbUsuarios>();
        }

        public int Rol_Id { get; set; }
        public string Rol_Descripcion { get; set; }
        public int? Rol_Usua_Creacion { get; set; }
        public DateTime? Rol_Fecha_Creacion { get; set; }
        public int? Rol_Usua_Modifica { get; set; }
        public DateTime? Rol_Fecha_Modifica { get; set; }
        public bool? Rol_Estado { get; set; }
        [NotMapped]
        public string Pant_Descripcion { get; set; }
        [NotMapped]
        public string UsuarioCreacion { get; set; }
        [NotMapped]
        public string UsuarioModificacion { get; set; }
   
        public virtual tbUsuarios Rol_Usua_CreacionNavigation { get; set; }
        public virtual tbUsuarios Rol_Usua_ModificaNavigation { get; set; }
        public virtual ICollection<tbPantallasPorRoles> tbPantallasPorRoles { get; set; }
        public virtual ICollection<tbUsuarios> tbUsuarios { get; set; }
    }
}