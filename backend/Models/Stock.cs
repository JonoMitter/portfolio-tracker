using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Stock
    {
        [Key]
        public Guid Stock_Id {get; set;}
        public Guid Holding_Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public int Units { get; set; }
        public float Purchase_Price { get; set; }
    }
}