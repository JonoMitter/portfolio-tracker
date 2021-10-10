using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Exceptions
{
    public class JwtNotFoundException : Exception
    {
        public JwtNotFoundException()
        {
        }

        public JwtNotFoundException(string message)
            : base(message)
        {
        }

    }
}