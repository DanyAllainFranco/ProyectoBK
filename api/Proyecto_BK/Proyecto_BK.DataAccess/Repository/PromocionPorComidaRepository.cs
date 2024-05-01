using System;
using Dapper;
using Microsoft.Data.SqlClient;
using Proyecto_BK.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto_BK.DataAccess.Repository
{
    public partial class PromocionPorComidaRepository : IRepository<tbPromocionesPorComidas>
    {
        public RequestStatus Delete(int? id)
        {
            throw new NotImplementedException();
        }

        public tbPromocionesPorComidas Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbPromocionesPorComidas item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbPromocionesPorComidas> List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(tbPromocionesPorComidas item)
        {
            throw new NotImplementedException();
        }
    }
}
