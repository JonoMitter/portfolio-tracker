using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class ValidationErrors
    {
        public String message { get; }
        public List<ValidationError> errors { get; }

        public ValidationErrors()
        {
            errors = new List<ValidationError>();
            message = "Validation Failed";
        }

        public void Add(ValidationError error)
        {
            errors.Add(error);
        }

        public int Size()
        {
            return errors.Count;
        }
    }
}