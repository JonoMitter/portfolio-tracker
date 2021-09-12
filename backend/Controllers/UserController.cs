using System;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService userService;
        public UserController(UserService userService)
        {
            this.userService = userService;
        }

        [HttpGet]
        public async Task<ActionResult<List<User>>> GetUsers()
        {
            List<User> list = await Task.Run(() => userService.GetUsers());
            return list;
        }
        [HttpGet("{id}")]
        public IActionResult getUserById(Guid id){
            User tmpUser = userService.getbyId(id);
            return Ok(tmpUser);
        }
        [HttpPost(template: "register")]
        public IActionResult Create(User user)
        {
            if (ValidateUserCreation(user) is true)
            {
                userService.Create(user);
                return CreatedAtAction(nameof(Create), new { id = user.User_Id }, user);
            }
            else
            {
                return BadRequest("Values for Email, Firstname, password are invalid");
            }
        }
        [HttpPost(template:"login")]
        public IActionResult Login(User user){
            User tmpUser = userService.getbyEmail(user.Email);
            if(tmpUser == null){
                return BadRequest("Invalid credentials");
            }
            if(!BCrypt.Net.BCrypt.Verify(user.Password, tmpUser.Password)){
                return BadRequest("Invalid credentials");
            }
            return Ok(tmpUser);
            
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
            if(tmpUser is null){
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