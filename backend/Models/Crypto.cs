using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Crypto
    {
        public Guid Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public float Units { get; set; }
        public float Purchase_Price { get; set; }

        public Guid UserId { get; set; }
        public User User { get; set; }
    }
}