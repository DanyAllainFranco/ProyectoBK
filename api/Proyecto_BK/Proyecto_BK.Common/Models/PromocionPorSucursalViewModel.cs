using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto_BK.Common.Models
{
    public class PromocionPorSucursalViewModel
    {
        public int PPSu_Id { get; set; }
        public int? Prom_Id { get; set; }
        public int? Sucu_Id { get; set; }
        public int? PPSu_Usua_Creacion { get; set; }
        public DateTime? PPSu_Fecha_Creacion { get; set; }
        public int? PPSu_Usua_Modifica { get; set; }
        public DateTime? PPSu_Fecha_Modifica { get; set; }
        public bool? PPSu_Estado { get; set; }

        public string Prom_Descripcion { get; set; }
        public string Sucu_Descripcion { get; set; }
        public string Muni_Codigo { get; set; }
    }
}
