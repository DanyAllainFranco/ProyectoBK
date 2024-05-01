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
    public partial class AlimentoRepository : IRepository<tbAlimentos>
    {
        public RequestStatus Delete(int? id)
        {
            throw new NotImplementedException();
        }

        public tbAlimentos Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbAlimentos item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbAlimentos> List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(tbAlimentos item)
        {
            throw new NotImplementedException();
        }
    }
}
