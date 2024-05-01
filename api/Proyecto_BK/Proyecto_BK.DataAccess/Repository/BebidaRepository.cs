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
    public partial class BebidaRepository : IRepository<tbBebidas>
    {
        public RequestStatus Delete(int? id)
        {
            throw new NotImplementedException();
        }

        public tbBebidas Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbBebidas item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbBebidas> List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(tbBebidas item)
        {
            throw new NotImplementedException();
        }
    }
}
