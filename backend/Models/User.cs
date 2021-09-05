using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class User
    {
        [Key]
        public Guid User_Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string Password { get; set; }
        public string confirmPassword{get; set;}

        //  User has Zero to Many holdings
        public ICollection<Holding> Holdings { get; set; }
        
    }
}