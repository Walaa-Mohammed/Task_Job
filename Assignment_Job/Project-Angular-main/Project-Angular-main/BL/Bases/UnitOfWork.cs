using BL.Interfaces;
using BL.Repositories;
using DAL;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Bases
{
    public class UnitOfWork : IUnitOfWork
    {
        #region Common Properties
        private DbContext EC_DbContext { get; set; }
        private UserManager<ApplicationUserIdentity> _userManager;
        private RoleManager<IdentityRole> _roleManager;
  

        #endregion

        #region Constructors
        public UnitOfWork(ApplicationDBContext EC_DbContext, UserManager<ApplicationUserIdentity> userManager, RoleManager<IdentityRole> roleManager)
        {
            this._userManager = userManager;
            this._roleManager = roleManager;
            this.EC_DbContext = EC_DbContext;//
      

            // Avoid load navigation properties
            //EC_DbContext.Configuration.LazyLoadingEnabled = false;
        }
        #endregion

        #region Methods
        public int Commit()
        {
            return EC_DbContext.SaveChanges();
        }

        public void Dispose()
        {
            EC_DbContext.Dispose();
        }
        #endregion


     
        public EmployeeRepository employee;//=> throw new NotImplementedException();
        public EmployeeRepository Employee
        {
            get
            {
                if (employee == null)
                    employee = new EmployeeRepository(EC_DbContext);
                return employee;
            }
        }
      

        public CompanyRepository company;//=> throw new NotImplementedException();
        public CompanyRepository Company
        {
            get
            {
                if (company == null)
                    company = new CompanyRepository(EC_DbContext);
                return company;
            }
        }

       
      

       
        
        public AccountRepository account;//=> throw new NotImplementedException();
        public AccountRepository Account
        {
            get
            {
                if (account == null)
                    account = new AccountRepository(EC_DbContext,_userManager,_roleManager);
                return account;
            }
        }

        public RoleRepository role;//=> throw new NotImplementedException();
        public RoleRepository Role
        {
            get
            {
                if (role == null)
                    role = new RoleRepository(EC_DbContext,_roleManager);
                return role;
            }
        }



      

      
    }
}
