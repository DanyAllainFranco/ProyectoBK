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
    public partial class PaqueteRepository : IRepository<tbPaquetes>
    {
        public RequestStatus Delete(int? id)
        {
            throw new NotImplementedException();
        }

        public tbPaquetes Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbPaquetes item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbPaquetes> List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(tbPaquetes item)
        {
            throw new NotImplementedException();
        }
    }
}
