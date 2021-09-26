using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (!context.User.Any())
            {
                var users = new List<User>
                {
                    // new User
                    // {
                    //     Id = new Guid("8bdafcac-3fd7-4089-8543-89399982cbb3"),
                    //     FirstName = "Thomas",
                    //     Password = "tomisfogg123",
                    //     Email = "tomfogg@gmail.com"
                    // },
                    // new User
                    // {
                    //     Id = new Guid("fa604489-a6a9-49bd-9457-75760a534ca5"),
                    //     FirstName = "Janaya",
                    //     Password = "scoutandpetra2",
                    //     Email = "janayaa@live.com"
                    // },
                    // new User
                    // {
                    //     Id = new Guid("0b70778b-c833-4666-8845-58f0ace77fda"),
                    //     FirstName = "Luke",
                    //     Password = "ollyisround123",
                    //     Email = "lukesapwell@gmail.com"
                    // }
                };
                await context.User.AddRangeAsync(users);
            }

            if (!context.Stock.Any())
            {
                var stocks = new List<Stock>{
                //     new Stock{
                //         Id = Guid.NewGuid(),
                //         User_Id = new Guid("8bdafcac-3fd7-4089-8543-89399982cbb3"),
                //         Code = "NAB",
                //         Name = "National Australia Bank",
                //         Units = 21,
                //         Purchase_Price = 12.50F
                //     },
                //     new Stock{
                //         Id = Guid.NewGuid(),
                //         User_Id = new Guid("0b70778b-c833-4666-8845-58f0ace77fda"),
                //         Code = "CBA",
                //         Name = "Commonwealth Bank",
                //         Units = 30,
                //         Purchase_Price = 5.61F
                //     }
                };
                await context.Stock.AddRangeAsync(stocks);

            }      

            await context.SaveChangesAsync();
        }
    }
}