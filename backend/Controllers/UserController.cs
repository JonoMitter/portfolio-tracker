using System;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;
using System.Collections.Generic;
using backend.Persistence;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly DataContext context;

        public UserController(DataContext dataContext)
        {
            this.context = dataContext;
        }


        //  takes from database
        [HttpGet]
        public async Task<ActionResult<List<User>>> GetUsers()
        {
            return await context.User.ToListAsync();
            // return UserService.GetAll();
        }

        //takes from database
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(Guid id)
        {
            return await context.User.FindAsync(id);
        }


        //  from hard coded array
        // [HttpGet("{email}")]
        // public User GetUser(string email)
        // {
        //     return UserService.Get(email);
        // }


        //  from hard coded array
        [HttpPost]
        public IActionResult Create(User user)
        {
            // if(user.Email != null & user.FirstName != null & user.Password !=null){
            //     if(Get(user.Email) is null){
            //         UserService.Add(user);
            //     }

            //     else{
            //         return BadRequest("Email already in use");
            //     }
            // }

            // else{
            //     return BadRequest("Values for Email, FirstName, or Password missing");
            // }
            if (ValidateUserCreation(user) is true)
            {   
                //adds user to user Service
                UserService.Add(user);
                //returns a created status in postman (doesnt add to User service)
                return CreatedAtAction(nameof(Create), new { id = user.User_Id }, user);
            }
            else
            {
                return BadRequest("Values for Email, Firstname, password are invalid");
            }
        }

        //  from hard coded array
        [HttpPut("{email}")]
        public IActionResult Update(string email, User user)
        {

            if (email != user.Email)
            {
                return BadRequest();
            }

            var existingUser = UserService.Get(email);

            if (existingUser is null)
            {
                return NotFound();
            }
            UserService.Update(user);

            return NoContent();
        }

        //  from hard coded array
        [HttpDelete("{email}")]
        public IActionResult Delete(string email)
        {
            var user = UserService.Get(email);

            if (user is null)
            {
                return NotFound();
            }

            UserService.Delete(email);

            return Ok();
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
            // if (!(GetUser(user.Email) is null))
            // {
            //     return false;
            // }
            // if(user.Password.Length < 4 || user.confirmPassword.Length < 4){
            //     return false;
            // }
            // if(!(user.Password.Equals(user.confirmPassword))){
            //     return false;
            // }
            return true;
        }
    }
}