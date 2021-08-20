using AutoMapper;
using BL.Dtos;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Configurations
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Employee, EmployeeViewModel>()
       
                .ReverseMap()
                .ForMember(m => m.company, m => m.Ignore());

           

            CreateMap<IdentityRole, RoleViewModel>().ReverseMap();
            CreateMap<IdentityRole, UserRolesViewModel>().ReverseMap();
           
      


           CreateMap<Company, CompanyViewModel>().ReverseMap();


           

           CreateMap<ApplicationUserIdentity, LoginViewModel>().ReverseMap();
           CreateMap<ApplicationUserIdentity, RegisterViewodel>().ReverseMap();

        }
    }
}
