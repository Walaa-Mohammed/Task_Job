using BL.Bases;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BL.Dtos;
using DAL;
using Microsoft.AspNetCore.Identity;
using BL.Interfaces;
using AutoMapper;

namespace BL.AppServices
{
    public class RoleAppService : AppServiceBase
    {
        public RoleAppService(IUnitOfWork theUnitOfWork, IMapper mapper) : base(theUnitOfWork, mapper)
        {

        }
        public async Task CreateRoles()
        {
           await TheUnitOfWork.Role.CreateRoles();
        }
        public RoleViewModel GetRoleById(string id)
        {
            if (id == null || id == "")
                throw new ArgumentNullException();

            return Mapper.Map<RoleViewModel>(TheUnitOfWork.Role.GetRoleByID(id));
        }
        public IdentityResult Create(string rolename)
        {
            return TheUnitOfWork.Role.Create(rolename);
        }
        public async Task <IdentityResult> Update(RoleViewModel roleViewModel)
        {
            if (roleViewModel == null)
                throw new ArgumentNullException();
            if (roleViewModel.Id == null || roleViewModel.Id == string.Empty)
                throw new ArgumentException();

            var role = Mapper.Map<IdentityRole>(roleViewModel);
            return await TheUnitOfWork.Role.UpdateRole(role);
        }
        //public List<RoleViewModel> GetAllRoles()
        //{
        //    return Mapper.Map<List<RoleViewModel>>(TheUnitOfWork.Role.getAllRoles());
        //}
        public bool DeleteRole(string id)
        {
            if (id == null || id == "")
                throw new ArgumentNullException();
            bool result = false;

            TheUnitOfWork.Role.DeleteRole(id);
            result = TheUnitOfWork.Commit() > new int();

            return result;
        }
       
    }
}
