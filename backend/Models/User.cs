using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string Password { get; set; }

        //  User has Zero to Many of each of asset class
        public IList<Cash> Cash { get; set; }
        public IList<Crypto> Crypto { get; set; }
        public IList<Stock> Stock { get; set; }
        public IList<Super> Super { get; set; }
    
    }
}