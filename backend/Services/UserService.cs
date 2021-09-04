using backend.Models;
using System.Collections.Generic;
using System.Linq;

namespace backend.Services
{
    public class UserService
    {

        static List<User> Users { get; }
        static int nextId = 3;
        static UserService()
        {
            Users = new List<User>
            {
                new User { User_Id = 1, FirstName = "Thomas", Password = "tomisfogg123", Email = "tomfogg@gmail.com" },
                new User { User_Id = 2, FirstName = "Luke", Password = "ollyisround123", Email = "lukesapwell@gmail.com" }
            };
        }

        public static List<User> GetAll() => Users;

        public static User Get(string Email) => Users.FirstOrDefault(user => user.Email == Email);

        public static void Add(User user)
        {
            user.User_Id = nextId++;
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

            Users[index] = user;
        }
    }
}