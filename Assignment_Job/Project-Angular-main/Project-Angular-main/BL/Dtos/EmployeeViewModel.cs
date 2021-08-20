using DAL.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Dtos
{
    public class EmployeeViewModel
    {
        public int ID { get; set; }


        public string FirstName { get; set; }

        [Required]
        [MinLength(3)]
        public string LastName { get; set; }
        [NotMapped]
      
        public string Image { get; set; }

        public string Address { get; set; }
        public string Country { get; set; }
        public string Gender { get; set; }
        [Required]

        public int CompanyId { get; set; }
        public string CompanyName { get; set; }
    }
}
