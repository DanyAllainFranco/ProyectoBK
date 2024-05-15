using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto_BK.Common.Models
{
    public class AgregarPantallasViewModel
    {
        public List<int> PantIds { get; set; }
        public int RolId { get; set; }
        public int Usua_Id { get; set; }
    }

    public class AgregarAlimentosViewModel
    {
        public List<int> AlimIds { get; set; }
        public int PromId { get; set; }
    }

    public class AgregarBebidaViewModel
    {
        public List<int> BebiIds { get; set; }
        public int PromId { get; set; }
    }

    public class AgregarPostreViewModel
    {
        public List<int> PostIds { get; set; }
        public int PromId { get; set; }
    }

    public class AgregarComplementoViewModel
    {
        public List<int> CompIds { get; set; }
        public int PromId { get; set; }
    }

    public class AgregarSucursalViewModel
    {
        public List<int> SucuIds { get; set; }
        public int PromId { get; set; }

        public int Usua_Id { get; set; }
    }
}
