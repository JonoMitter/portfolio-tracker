using System;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;
using System.Collections.Generic;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        [HttpGet]
        public List<User> GetAll()
        {
            return UserService.GetAll();
        }

        [HttpGet("{email}")]
        public User Get(string email)
        {
            return UserService.Get(email);
        }

        [HttpPost]
        public IActionResult Create(User user)
        {
            UserService.Add(user);
            return CreatedAtAction(nameof(Create), new { id = user.User_Id }, user);
        }

        [HttpPut("{email}")]
        public IActionResult Update(string email, User user)
        {   
            if( email != user.Email){
                return BadRequest();
            }

            var existingUser = UserService.Get(email);

            if(existingUser is null){
                return NotFound();
            }

            UserService.Update(user);

            return NoContent();
        }

        [HttpDelete("{email}")]
        public IActionResult Delete(string email)
        {   
            var user = UserService.Get(email);

            if(user is null){
                return NotFound();
            }

            UserService.Delete(email);

            return NoContent();
        }
    }
}