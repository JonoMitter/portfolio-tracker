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
                new User { User_Id = 1, FirstName = "Thomas", Password = "tomisfogg123" },
                new User { User_Id = 2, FirstName = "Luke", Password = "ollyisround123" }
            };
        }

        public static List<User> getAll() => Users;

        public static User getUser(int id) => Users.FirstOrDefault(user => user.User_Id == id);

        public static void Add(User user)
        {
            user.User_Id = nextId++;
            Users.Add(user);
        }

        public static void Delete(int id)
        {
            var user = getUser(id);
            if (user is null)
                return;

            Users.Remove(user);
        }

        public static void Update(User user)
        {
            var index = Users.FindIndex(userIt => userIt.User_Id == user.User_Id);
            if (index == -1)
                return;

            Users[index] = user;
        }
    }
}