using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class Stock
    {
        public Guid id { get; set; }
        public string code { get; set; }
        public string name { get; set; }
        public int units { get; set; }
        public float purchase_price { get; set; }

        [JsonIgnore] public Guid UserId { get; set; }
        [JsonIgnore] public User User { get; set; }
    }
}