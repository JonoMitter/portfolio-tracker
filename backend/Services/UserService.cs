using backend.Models;
using backend.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
namespace backend.Services
{
    public class UserService
    {

        private readonly DataContext context;

        public UserService(DataContext context)
        {
            this.context = context;
        }
        public User Create(User user)
        {
            user.Id = Guid.NewGuid();
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            context.User.Add(user);
            context.SaveChanges();
            return user;
        }
        public User getbyEmail(string email) => context.User.FirstOrDefault(user => user.Email == email);
        public User getbyId(Guid id) => context.User.FirstOrDefault(user => user.Id == id);
        public async Task<List<User>> GetUsers()
        {
            return await context.User.ToListAsync();
        }
        public void deleteById(Guid id)
        {   
            User tmpUser = getbyId(id);
            context.User.Remove(tmpUser);
            context.SaveChanges();
        }

        // public static void Update(User user)
        // {
        //     var index = Users.FindIndex(userIt => userIt.Email == user.Email);
        //     if (index == -1)
        //         return;

        //     user.User_Id = Users[index].User_Id;
        //     Users[index] = user;

        // }
    }
}