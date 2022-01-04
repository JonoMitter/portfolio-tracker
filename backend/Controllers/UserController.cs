using System;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using backend.DTOs;
using backend.Exceptions;
using System.IdentityModel.Tokens.Jwt;

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

        //ONLY FOR TESTING
        [HttpGet("all")]
        public async Task<ActionResult<List<User>>> GetUsers()
        {
            List<User> list = await Task.Run(() => userService.GetUsers());
            return list;
        }

        //ONLY FOR TESTING
        [HttpGet("{id}")]
        public IActionResult getUserById(Guid id)
        {
            User tmpUser = userService.getbyId(id);
            return Ok(tmpUser);
        }

        [HttpPost("register")]
        public IActionResult Create(CreateUserDTO userDTO)
        {
            ValidationErrors errors = CreateUserErrors(userDTO);
            if (errors.Size() == 0)
            {
                // copy POST body values to new user object
                User user = new User();
                user.FirstName = userDTO.FirstName;
                user.Email = userDTO.Email;
                user.Password = userDTO.Password;
                userService.Create(user);

                return CreatedAtAction(nameof(Create), new { id = user.Id }, user);
            }
            else
            {
                return BadRequest(errors);
            }
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDTO loginDTO)
        {
            User user = userService.getbyEmail(loginDTO.Email.ToLower());

            ValidationErrors errors = new ValidationErrors();

            if (user == null)
            {
                errors.Add(new ValidationError("Email", "Cannot find a user with this email"));
            }

            else if (!BCrypt.Net.BCrypt.Verify(loginDTO.Password, user.Password))
            {
                errors.Add(new ValidationError("Password", "Incorrect password"));
            }

            if (errors.Size() == 0)
            {
                var jwt = jwtService.Generate(user.Id);

                Response.Cookies.Append(key: "jwt", value: jwt, new CookieOptions
                {
                    HttpOnly = true
                });

                return Ok(new
                {
                    jwt,
                    message = "User: " + user.FirstName + " with ID: " + user.Id + " successfully logged in"
                });
            }
            else
            {
                return BadRequest(errors);
            }
        }

        //gets user from Cookie validates it and searches for user by id
        [HttpGet]
        public IActionResult UserCookie()
        {
            try
            {
                User user = GetUserFromJWT();
                return Ok(user);
            }
            catch (Exception e)
            {
                return BadRequest("[" + e.GetType() + "] " + e.Message);
            }
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");

            return Ok(new
            {
                message = "Logout success (deleted JWT)"
            });
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

        public ValidationErrors CreateUserErrors(CreateUserDTO user)
        {
            ValidationErrors errors = new ValidationErrors();
            user.Email = user.Email.ToLower();

            if (ExistingUser(user.Email))
            {
                errors.Add(new ValidationError("Email", "User with email '" + user.Email + "' already exists"));
            }

            //check that email meets minimum size requirements "a@a.com"
            if (user.Email.Length < 7)
            {
                errors.Add(new ValidationError("Email", "Email must be at least 7 characters"));
            }

            if (!user.Email.Contains("@"))
            {
                errors.Add(new ValidationError("Email", "Email must contain '@'"));
            }

            if (!user.Email.Contains(".com"))
            {
                errors.Add(new ValidationError("Email", "Email must contain '.com'"));
            }

            if (user.FirstName.Length < 2)
            {
                errors.Add(new ValidationError("FirstName", "FirstName must be at least 2 characters"));
            }

            //check that password are equal
            if (!user.Password.Equals(user.PasswordConfirm))
            {
                errors.Add(new ValidationError("Password", "Passwords must match"));
            }

            //[TESTING]
            //print all errors to console
            foreach (ValidationError error in errors.errors)
            {
                Console.WriteLine("Field: " + error.Field);
                Console.WriteLine("Message: " + error.Message);
            }

            return errors;
        }

        public Boolean ExistingUser(string email)
        {
            Boolean userExists = false;

            var existingUser = userService.getbyEmail(email);

            if (existingUser != null)
            {
                userExists = true;
            }

            return userExists;
        }

        public User GetUserFromJWT()
        {
            try
            {
                //search for jwt in user's cookies
                String jwt = Request.Cookies["jwt"];
                JwtSecurityToken token = jwtService.Verify(jwt);

                Guid id = Guid.Parse(token.Issuer);
                User user = userService.getbyId(id);

                // check whether valid userId
                if (user == null)
                {
                    throw new UserNotFoundException("User stored in cookies with Id: " + id + " could not be found in database");
                }
                return user;
            }
            catch (ArgumentNullException)
            {
                throw new JwtNotFoundException("Cannot find JWT in Cookies");
            }
        }
    }
}