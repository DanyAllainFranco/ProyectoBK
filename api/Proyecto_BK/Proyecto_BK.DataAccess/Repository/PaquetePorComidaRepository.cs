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
    public partial class PaquetePorComidaRepository : IRepository<tbPaquetesPorComidas>
    {
        public RequestStatus Delete(int? id)
        {
            throw new NotImplementedException();
        }

        public tbPaquetesPorComidas Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbPaquetesPorComidas item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbPaquetesPorComidas> List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(tbPaquetesPorComidas item)
        {
            throw new NotImplementedException();
        }
    }
}
