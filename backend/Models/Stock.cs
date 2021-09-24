using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Stock
    {
        public Guid Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public int Units { get; set; }
        public float Purchase_Price { get; set; }

        public Guid User_Id { get; set; }
        public User User { get; set; }
    }
}