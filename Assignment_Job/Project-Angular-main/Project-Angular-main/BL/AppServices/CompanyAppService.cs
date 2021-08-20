using BL.Bases;
using BL.Interfaces;
using BL.Dtos;
using DAL;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;

namespace BL.AppServices
{
   public class CompanyAppService:AppServiceBase
    {
        public CompanyAppService(IUnitOfWork theUnitOfWork, IMapper mapper) : base(theUnitOfWork, mapper)
        {

        }
        #region CURD

        public List<CompanyViewModel> GetAllCompines()
        {

            return Mapper.Map<List<CompanyViewModel>>(TheUnitOfWork.Company.GetAllCompany());
        }
        public CompanyViewModel GetCompany(int id)
        {
            return Mapper.Map<CompanyViewModel>(TheUnitOfWork.Company.GetById(id));
        }



        public bool SaveNewCompany(CompanyViewModel companyViewModel)
        {
              if (companyViewModel == null)
              
  throw new ArgumentNullException();

            bool result = false;
            var company = Mapper.Map<Company>(companyViewModel);
            if (TheUnitOfWork.Company.Insert(company))
            {
                result = TheUnitOfWork.Commit() > new int();
            }
            return result;
        }


        public bool UpdateCompany(CompanyViewModel companyViewModel)
        {
            var company = Mapper.Map<Company>(companyViewModel);
            TheUnitOfWork.Company.Update(company);
            TheUnitOfWork.Commit();

            return true;
        }


        public bool DeleteCompany(int id)
        {
            bool result = false;

            TheUnitOfWork.Company.Delete(id);
            result = TheUnitOfWork.Commit() > new int();

            return result;
        }

       
        #endregion

        #region pagination
        public int CountEntity()
        {
            return TheUnitOfWork.Company.CountEntity();
        }
        public IEnumerable<CompanyViewModel> GetPageRecords(int pageSize, int pageNumber)
        {
            return Mapper.Map<List<CompanyViewModel>>(TheUnitOfWork.Company.GetPageRecords(pageSize, pageNumber));
        }
        #endregion
    }
}
