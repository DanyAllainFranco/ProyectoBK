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
    public partial class PromocionRepository : IRepository<tbPromociones>
    {
        public RequestStatus Delete(int? id)
        {
            throw new NotImplementedException();
        }

        public tbPromociones Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbPromociones item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbPromociones> List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(tbPromociones item)
        {
            throw new NotImplementedException();
        }
    }
}
