using System;

namespace backend.Models
{
    public class Cash : Holding
    {
        public string Type { get; set; }
        public float Value { get; set; }
    }
}