using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Holding
    {
        [Key]
        public Guid Holding_Id { get; set; } // using int for holding_id for testing
        public Guid User_Id { get; set; }

    }
}