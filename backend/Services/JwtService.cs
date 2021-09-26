using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System;
using backend.Models;
using System.Security.Claims;
namespace backend.Helpers
{
    public class JwtService
    {

        private string secureKey = "this is my custom Secret key for authentication";

        /*Generates new JWT token string */
        public string Generate(Guid id)
        {
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secureKey));
            // var jwtTokenHandler = new JwtSecurityTokenHandler();
            var credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);
            var header = new JwtHeader(credentials);

            // var tokenDescriptor = new SecurityTokenDescriptor
            // {
            //     Subject = new ClaimsIdentity(new []{
            //         new Claim("Id", user.User_Id.ToString()),
            //         new Claim(JwtRegisteredClaimNames.Email, user.Email),
            //         new Claim(JwtRegisteredClaimNames.Sub, user.Email),
            //         new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()) 
            //     }),
            //     Expires = DateTime.UtcNow.AddHours(3), 
            //     SigningCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature)
            // };
            // var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            // var jwtToken = jwtTokenHandler.WriteToken(token);

            // return jwtToken; 
            // token lives for 1 day(expires tmr)
            var payload = new JwtPayload(id.ToString(), null, null, null, DateTime.Today.AddDays(1));
            var securityToken = new JwtSecurityToken(header, payload);

            return new JwtSecurityTokenHandler().WriteToken(securityToken);

        }

        public JwtSecurityToken Verify(string jwt)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secureKey);

            tokenHandler.ValidateToken(jwt, new TokenValidationParameters
            {
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuerSigningKey = true,
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.FromMinutes(2),
            }, out SecurityToken validatedToken);

            // Console.Write(validatedToken);
            
            return (JwtSecurityToken) validatedToken;
        }

    }
}