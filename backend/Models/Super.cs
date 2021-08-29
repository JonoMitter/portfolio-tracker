using System;

namespace backend.Models
{
    public class Super : Holding
    {
        // public Guid Holding_Id { get; set; }
        // public string User_Id { get; set; }
        public string Type { get; set; }
        public float Value { get; set; }
    }
}