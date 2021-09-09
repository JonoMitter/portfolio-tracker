using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Stock
    {
        [Key]
        public Guid Holding_Id { get; set; }
        public Guid User_Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public int Units { get; set; }
        public float Purchase_Price { get; set; }

        // public User User { get; set; }
    }
}