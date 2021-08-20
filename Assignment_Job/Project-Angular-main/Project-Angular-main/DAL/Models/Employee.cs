using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    [Table("Employee")]
    public class Employee
    {
       
        public int ID { get; set; }
        [Required]
        [MinLength(3)]
        public string FirstName { get; set; }

        [Required]
        [MinLength(3)]
        public string LastName { get; set; }
        [NotMapped]
        public string FullName
        {
            get
            {
                return $"{FirstName} {LastName}";
            }
        }
        public string Image { get; set; }

        public string Address { get; set; }
        public string Country { get; set; }
        public string Gender { get; set; }
        [Required]
        public bool isDeleted { get; set; }

        [ForeignKey("company")]
        public  int CompanyId { get; set; }
        public Company company { get; set; }
    
        
        


    }
}
