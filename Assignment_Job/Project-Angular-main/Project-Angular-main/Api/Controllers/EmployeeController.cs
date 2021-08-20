using BL.AppServices;
using BL.Dtos;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : Controller
    {
        EmployeeAppService _employeeAppService;

        public EmployeeController(EmployeeAppService employeeAppService)
        {
            this._employeeAppService = employeeAppService;
        }

        [HttpGet]
        public IActionResult GetAllEmployees()
        {
            return Ok(_employeeAppService.GetAllEmployee());
        }
        [HttpGet("{id}")]
        public IActionResult GetEmployeeById(int id)
        {
           
          
            var res = _employeeAppService.GetEmployee(id);
            return Ok(_employeeAppService.GetEmployee(id));
        }
      
        [HttpPost]
        public IActionResult Create(EmployeeViewModel employeeViewModel)
        {

            if (ModelState.IsValid == false)
            {
                return BadRequest(ModelState);
            }
            try
            {
                _employeeAppService.SaveNewEmployee(employeeViewModel);
                
                return Created("CreateEmployee", employeeViewModel);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }
        }

        [HttpPut("{id}")]
        public IActionResult Edit(int id, EmployeeViewModel employeeViewModel)
        {

            if (ModelState.IsValid == false)
            {
                return BadRequest(ModelState);
            }
            try
            {
                _employeeAppService.UpdateEmployee(employeeViewModel);
                return Ok(employeeViewModel);
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
                _employeeAppService.DeleteEmployee(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("count")]
        public IActionResult EmployeesCount(int companyId = 0)
        {
            return Ok(_employeeAppService.CountEntity(companyId));
        }
        [HttpGet("{pageSize}/{pageNumber}")]
        public IActionResult GetProductsByPage(int pageSize, int pageNumber)
        {
            return Ok(_employeeAppService.GetPageRecords(pageSize, pageNumber));
        }

     

    }
}
