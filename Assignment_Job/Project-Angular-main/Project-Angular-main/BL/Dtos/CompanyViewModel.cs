﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Dtos
{
    public class CompanyViewModel
    {
        public int ID { get; set; }
        [Required]
      
        public string Name { get; set; }
    }
}
