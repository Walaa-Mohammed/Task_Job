using DAL.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Console;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class ApplicationUserIdentity : IdentityUser
    {
        // public string Id{ get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [NotMapped]
        public string FullName
        {
            get
            {
                return $"{FirstName} {LastName}";
            }
        }
        public DateTime? BirthDate { get; set; }
        public string Address { get; set; }
        public string Country { get; set; }
        public string Gender { get; set; }
        [Required]
        public bool isDeleted { get; set; }
    }
    public class ApplicationUserStore : UserStore<ApplicationUserIdentity>
    {
       
        public ApplicationUserStore() : base(new ApplicationDBContext())
        {

        }
        public ApplicationUserStore(DbContext db) : base(db)
        {

        }
    }

    public class ApplicationDBContext : IdentityDbContext<ApplicationUserIdentity>
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
             optionsBuilder
                .UseSqlServer("Data Source=.;Initial Catalog=AssignmentJob;Integrated Security=True"
                , options => options.EnableRetryOnFailure());
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
        public ApplicationDBContext()
        {

        }
        public ApplicationDBContext(DbContextOptions options) : base(options)
        {

        }
        public  DbSet<Company> Companies { get; set; }
      
        public DbSet<Employee> Employees { get; set; }
       
        }

    
}
