using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BL.Bases;
using BL.Interfaces;
using BL.Dtos;
using DAL.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace BL.AppServices
{
    public class EmployeeAppService: AppServiceBase
    {
        public EmployeeAppService(IUnitOfWork theUnitOfWork, IMapper mapper) : base(theUnitOfWork, mapper)
        {
        }
        public IEnumerable<EmployeeViewModel> GetAllEmployee()
        {
            IEnumerable<Employee> allEmployees = TheUnitOfWork.Employee.GetAllEmployee();
            return Mapper.Map<IEnumerable<EmployeeViewModel>>(allEmployees);
        }
       
        public List<EmployeeViewModel> GetAllEmployeeWhere(int CompanyId)
        {
            var searchRes = TheUnitOfWork.Employee.GetWhere(p=>p.CompanyId== CompanyId);

            return Mapper.Map<List<EmployeeViewModel>>(searchRes);
        }

    
        public EmployeeViewModel GetEmployee(int id)
        {
            return Mapper.Map<EmployeeViewModel>(TheUnitOfWork.Employee.GetEmployeeById(id));
        }



        public bool SaveNewEmployee(EmployeeViewModel employeeViewModel)
        {
            if (employeeViewModel == null)
                throw new ArgumentNullException();
            bool result = false;
            var employee = Mapper.Map<Employee>(employeeViewModel);
         
            if (TheUnitOfWork.Employee.Insert(employee))
            {
                result = TheUnitOfWork.Commit() > new int();
            }
            return result;
        }


        public bool UpdateEmployee(EmployeeViewModel employeeViewModel)
        {
            var employeeFromDb= TheUnitOfWork.Employee.GetById(employeeViewModel.ID);
            if(employeeViewModel.Image == null)
                employeeViewModel.Image = employeeFromDb.Image;
            Mapper.Map(employeeViewModel, employeeFromDb);
            TheUnitOfWork.Employee.Update(employeeFromDb);
            TheUnitOfWork.Commit();

            return true;
        }
       
        public bool DeleteEmployee(int id)
        {
            bool result = false;

            TheUnitOfWork.Employee.Delete(id);
            result = TheUnitOfWork.Commit() > new int();

            return result;
        }
     

        #region pagination
        public int CountEntity(int companyId = 0)
        {
            return TheUnitOfWork.Employee.CountEmployees(companyId);
        }
        public IEnumerable<EmployeeViewModel> GetPageRecords(int pageSize, int pageNumber)
        {
            var products = Mapper.Map<List<EmployeeViewModel>>(TheUnitOfWork.Employee.GetPageRecords(pageSize, pageNumber));
            return products;
        }
        #endregion

    }
}
