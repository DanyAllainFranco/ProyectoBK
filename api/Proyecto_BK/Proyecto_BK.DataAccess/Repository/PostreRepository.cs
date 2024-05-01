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
    public partial class PostreRepository : IRepository<tbPostres>
    {
        public RequestStatus Delete(int? id)
        {
            throw new NotImplementedException();
        }

        public tbPostres Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbPostres item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbPostres> List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(tbPostres item)
        {
            throw new NotImplementedException();
        }
    }
}
