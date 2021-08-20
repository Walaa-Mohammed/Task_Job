using BL.Bases;
using DAL;
using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Repositories
{
   public class CompanyRepository:BaseRepository<Company>
    {

        private DbContext EC_DbContext;

        public CompanyRepository(DbContext EC_DbContext) : base(EC_DbContext)
        {
            this.EC_DbContext = EC_DbContext;
        }
        #region CRUB

        public List<Company> GetAllCompany()
        {
            return GetAll().ToList();
        }

        public bool InsertCompany(Company company)
        {
            return Insert(company);
        }
        public void UpdateCompany(Company company)
        {
            Update(company);
        }
        public void DeleteCompany(int id)
        {
            Delete(id);
        }

      
        public Company GetCompanyById(int id)
        {
            return GetFirstOrDefault(l => l.ID == id);
        }
        #endregion
    }
}

