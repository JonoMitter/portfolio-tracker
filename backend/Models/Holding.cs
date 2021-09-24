using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace backend.Models
{
    public class Holding
    {
        [Key]
        public Guid Holding_Id { get; set; }

        public User User { get; set; }

        //zero to many stocks
        public List<Stock> stocks {get; set;}

    }
}