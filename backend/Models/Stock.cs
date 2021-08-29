using System;

namespace backend.Models
{
    public class Stock : Holding
    {
        // public Guid Holding_Id { get; set; }
        // public string User_Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public int Units { get; set; }
        public float Purchase_Price { get; set; }
    }
}