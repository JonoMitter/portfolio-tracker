using System;

namespace backend.Models
{
    public class Crypto : Holding
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public float Units { get; set; }
        public float Purchase_Price { get; set; }
    }
}