using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Cash
    {
        [Key]
        public Guid Holding_Id { get; set; }
        public Guid User_Id { get; set; }
        public string Type { get; set; }
        public float Value { get; set; }

        // public User User { get; set; }
    }
}