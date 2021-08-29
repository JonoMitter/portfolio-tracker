using System;

namespace backend.Models
{
    public class User
    {
        // public Guid User_Id { get; set; }
        public int User_Id { get; set; }
        public string FirstName { get; set; }
        public string Password { get; set; }

        // public User(Guid User_Id, string FirstName, string Password){
        //     this.User_Id = User_Id;
        //     this.FirstName = FirstName;
        //     this.Password = Password;
        // }
    }
}