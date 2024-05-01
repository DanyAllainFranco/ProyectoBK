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
    public partial class ComboPersonalRepository : IRepository<tbCombosPersonales>
    {
        public RequestStatus Delete(int? id)
        {
            throw new NotImplementedException();
        }

        public tbCombosPersonales Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbCombosPersonales item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbCombosPersonales> List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(tbCombosPersonales item)
        {
            throw new NotImplementedException();
        }
    }
}
