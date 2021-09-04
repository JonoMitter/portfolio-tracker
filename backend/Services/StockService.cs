using backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace backend.Services
{
    public class StockService
    {

        static List<Stock> Stocks { get; }
        static StockService()
        {
            Stocks = new List<Stock>
            {
                //TODO
                //assign User_Id to a valid
                new Stock { Holding_Id = Guid.NewGuid(), User_Id = new Guid("5C60F693-BEF5-E011-A485-80EE7300C695"), Code = "NAB", Name = "National Australia Bank", Units = 10, Purchase_Price = (float) 25.30 },
                new Stock { Holding_Id = Guid.NewGuid(), User_Id = new Guid("5C60F693-BEF5-E011-A485-80EE7300C695"), Code = "CBA", Name = "Commonwealth Bank", Units = 5, Purchase_Price = (float) 30.20 },
                new Stock { Holding_Id = Guid.NewGuid(), User_Id = new Guid("05c1487e-bac5-4855-8875-78ff81daa720"), Code = "ANZ", Name = "ANZ Bank", Units = 2, Purchase_Price = (float) 22.81 }
            };
        }

        public static List<Stock> GetAll() => Stocks;

        public static Stock Get(Guid id) => Stocks.FirstOrDefault(stock => stock.Holding_Id == id);

        public static List<Stock> GetHoldings(Guid user_Id) {
            List<Stock> userHoldings = new List<Stock>();
            foreach(Stock stock in Stocks){
                if(stock.User_Id == user_Id){
                    userHoldings.Add(stock);
                }
            }
            return userHoldings;
        }

        public static void Add(Stock stock)
        {

        }

        public static void Delete(int id)
        {

        }

        public static void Update(Stock stock)
        {

        }
    }
}