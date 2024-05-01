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
    public partial class ComplementoRepository : IRepository<tbComplementos>
    {
        public RequestStatus Delete(int? id)
        {
            throw new NotImplementedException();
        }

        public tbComplementos Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbComplementos item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbComplementos> List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(tbComplementos item)
        {
            throw new NotImplementedException();
        }
    }
}
