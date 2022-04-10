using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs
{
    public class StockDTO
    {
        public Guid id { get; set; }
        public string code { get; set; }
        public string name { get; set; }
        public int units { get; set; }
        public float purchase_price { get; set; }
        public string date_purchased { get; set; }
    }
}