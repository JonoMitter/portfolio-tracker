using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class Super
    {
        public Guid Id { get; set; }
        public string Type { get; set; }
        public float Value { get; set; }

        public Guid UserId { get; set; }
        [JsonIgnore] public User User { get; set; }
    }
}