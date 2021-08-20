using BL.Bases;
using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Repositories
{
    public class EmployeeRepository: BaseRepository<Employee>
    {

        private DbContext EC_DbContext;

        public EmployeeRepository(DbContext EC_DbContext) : base(EC_DbContext)
        {
            this.EC_DbContext = EC_DbContext;
        }
        #region CRUB

        public IEnumerable<Employee> GetAllEmployee()
        {
            return GetAll().Include(p => p.company).ToList();
        }
       


        public bool InsertEmployee(Employee employee)
        {
            return Insert(employee);
        }
        public void UpdateEmployee(Employee employee)
        {
            Update(employee);
        }
        public void DeleteEmployee(int id)
        {
            Delete(id);
        }

      
        public Employee GetEmployeeById(int id)
        {
            var product = DbSet
                .Include(p => p.company)
                .FirstOrDefault(p => p.ID == id);
            return product;
        }

       
        #endregion

        public override IEnumerable<Employee> GetPageRecords(int pageSize, int pageNumber)
        {
            pageSize = (pageSize <= 0) ? 10 : pageSize;
            pageNumber = (pageNumber < 1) ? 0 : pageNumber - 1;

            var products =  DbSet
                .Skip(pageNumber * pageSize).Take(pageSize)
                .Include(p => p.company)
                .ToList();
            return products;
        }
        public int CountEmployees(int companyId = 0)
        {
            if(companyId != 0)
            {
                return DbSet.Where(p => p.CompanyId == companyId).Count();
            }
           
            return DbSet.Count();
        }
    }
}
