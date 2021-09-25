using System;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;
using System.Collections.Generic;
using backend.Helpers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService userService;
        private readonly JwtService jwtService;
        public UserController(UserService userService, JwtService jwtService)
        {
            this.userService = userService;
            this.jwtService = jwtService;
        }

        [HttpGet]
        // [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<List<User>>> GetUsers()
        {
            List<User> list = await Task.Run(() => userService.GetUsers());
            return list;
        }
        [HttpGet("{id}")]
        public IActionResult getUserById(Guid id)
        {
            User tmpUser = userService.getbyId(id);
            return Ok(tmpUser);
        }

        [HttpPost(template: "register")]
        public IActionResult Create(User user)
        {
            if (ValidateUserCreation(user) is true)
            {
                userService.Create(user);
                return CreatedAtAction(nameof(Create), new { id = user.Id }, user);
            }
            else
            {
                return BadRequest("Values for Email, Firstname, password are invalid");
            }
        }
        
        [HttpPost(template: "login")]
        public IActionResult Login(User user)
        {
            User tmpUser = userService.getbyEmail(user.Email);

            if (tmpUser == null)
            {
                return BadRequest("Invalid credentials");
            }

            if (!BCrypt.Net.BCrypt.Verify(user.Password, tmpUser.Password))
            {
                return BadRequest("Invalid credentials");
            }
            
            var jwt = jwtService.Generate(tmpUser.Id);

            Response.Cookies.Append(key: "jwt", value: jwt, new CookieOptions
            {
                HttpOnly = true
            });

            return Ok(new
            {   
                jwt,
                message = tmpUser.FirstName + " with ID: " + tmpUser.Id + " successfully logged in"
            });
        }

        //gets user from Cookie validates it and searches for user by id
        [HttpGet(template: "oneuser")]
        public IActionResult UserCookie()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                
                //getting correct JWT token but token not being set.
                var token = jwtService.Verify(jwt);

                Guid id = Guid.Parse(token.Issuer);

                var user = userService.getbyId(id);

                // error checking
                //TODO maybe change to a catch from exception thrown getById if no user found?
                if (user == null)
                {
                    return Unauthorized("User with Id: " + id + " could not be found\n" 
                    + "JWT: " + jwt);
                }

                return Ok(user);
            }
            catch (Exception e)
            {
                return Content(e.StackTrace.ToString());
            }
        }

        //  from hard coded array
        // [HttpPut("{email}")]
        // public IActionResult Update(string email, User user)
        // {

        //     if (email != user.Email)
        //     {
        //         return BadRequest();
        //     }

        //     var existingUser = UserService.Get(email);

        //     if (existingUser is null)
        //     {
        //         return NotFound();
        //     }
        //     UserService.Update(user);

        //     return NoContent();
        // }
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            User tmpUser = userService.getbyId(id);
            if (tmpUser is null)
            {
                return BadRequest("User not found :(");
            }
            userService.deleteById(id);
            return Ok(id + "has been Successfully deleted");
        }
        public Boolean ValidateUserCreation(User user)
        {
            //checks for empty values
            if (user.Email.Length < 1 || user.FirstName.Length < 2)
            {
                return false;
            }
            if (!user.Email.Contains("@") & !user.Email.Contains(".com"))
            {
                return false;
            }
            return true;
        }
    }
}