using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        [JsonIgnore] public string Password { get; set; }

        //  User has Zero to Many of each of asset class
        [JsonIgnore] public IList<Cash> Cash { get; set; }
        [JsonIgnore] public IList<Crypto> Crypto { get; set; }
        [JsonIgnore] public IList<Stock> Stock { get; set; }
        [JsonIgnore] public IList<Super> Super { get; set; }
    
    }
}