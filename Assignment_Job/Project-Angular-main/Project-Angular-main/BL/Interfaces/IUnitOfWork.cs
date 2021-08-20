using BL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        #region Methode
        int Commit();
        #endregion

        CompanyRepository Company { get; }
        AccountRepository Account { get; }
        RoleRepository Role { get; }
        EmployeeRepository Employee { get; }
       
    }
}
