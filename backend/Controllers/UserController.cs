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
        public List<User> getUsers()
        {
            return UserService.getAll();
        }

        [HttpGet("{id}")]
        public User getUser(int id)
        {
            return UserService.getUser(id);
        }
    }
}