using backend.Models;
using backend.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;

namespace backend.Services
{
    public class UserService
    {

        static List<User> Users { get; }
        static UserService()
        {
            Users = new List<User>
            {
                new User { User_Id = new Guid("5C60F693-BEF5-E011-A485-80EE7300C695"), FirstName = "Thomas", Password = "tomisfogg123", confirmPassword="tomisfogg123", Email = "tomfogg@gmail.com" },
                new User { User_Id = new Guid("05c1487e-bac5-4855-8875-78ff81daa720"), FirstName = "Luke", Password = "ollyisround123", confirmPassword= "ollyisround123", Email = "lukesapwell@gmail.com" }
            };
        }

        public static List<User> GetAll() => Users;

        public static User Get(string Email) => Users.FirstOrDefault(user => user.Email == Email);

        public static void Add(User user)
        {
            user.User_Id = Guid.NewGuid();
            Users.Add(user);
        }

        public static void Delete(string Email)
        {
            var user = Get(Email);
            if (user is null)
                return;

            Users.Remove(user);
        }

        public static void Update(User user)
        {
            var index = Users.FindIndex(userIt => userIt.Email == user.Email);
            if (index == -1)
                return;

            user.User_Id = Users[index].User_Id;
            Users[index] = user;
            
        }
    }
}