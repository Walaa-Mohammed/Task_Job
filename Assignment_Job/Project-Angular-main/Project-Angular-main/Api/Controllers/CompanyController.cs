using BL.AppServices;
using BL.StaticClasses;
using BL.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class CompanyController : ControllerBase
    {
        CompanyAppService _companyAppService;

        public CompanyController(CompanyAppService companyAppService)
        {
            this._companyAppService = companyAppService;
        }

        [HttpGet]
        public IActionResult GetAllCompaines()
        {
            return Ok(_companyAppService.GetAllCompines());
        }
        [HttpGet("{id}")]
        public IActionResult GetCompanyById(int id)
        {
            return Ok(_companyAppService.GetCompany(id));
        }

        [HttpPost]
        public IActionResult Create(CompanyViewModel companyViewModel)
        {

            if (ModelState.IsValid == false)
            {
                return BadRequest(ModelState);
            }
            try
            {
                _companyAppService.SaveNewCompany(companyViewModel);
                
              
                return Created("CreateCompany" , companyViewModel);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }
        }

        [HttpPut("{id}")]
        public IActionResult Edit(int id, CompanyViewModel companyViewModel)
        {

            if (ModelState.IsValid == false)
            {
                return BadRequest(ModelState);
            }
            try
            {
                _companyAppService.UpdateCompany(companyViewModel);
                return Ok(companyViewModel);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _companyAppService.DeleteCompany(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    
        [HttpGet("count")]
        public IActionResult CompinessCount()
        {
            return Ok(_companyAppService.CountEntity());
        }
        [HttpGet("{pageSize}/{pageNumber}")]
        public IActionResult GetCompineesByPage(int pageSize, int pageNumber)
        {
            return Ok(_companyAppService.GetPageRecords(pageSize, pageNumber));
        }
    }
}
