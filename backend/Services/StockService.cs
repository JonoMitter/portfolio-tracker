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
                //assign User_Id to an existing user
                new Stock { Holding_Id = Guid.NewGuid(), Code = "NAB", Name = "National Australia Bank", Units = 10, Purchase_Price = (float) 25.30 },
                new Stock { Holding_Id = Guid.NewGuid(), Code = "CBA", Name = "Commonwealth Bank", Units = 5, Purchase_Price = (float) 30.20 },
                new Stock { Holding_Id = Guid.NewGuid(), Code = "ANZ", Name = "ANZ Bank", Units = 2, Purchase_Price = (float) 22.81 }
            };
        }

        public static List<Stock> GetAll() => Stocks;

        public static Stock Get(Guid id) => Stocks.FirstOrDefault(stock => stock.Holding_Id == id);

        public static List<Stock> GetHoldings(Guid user_Id) {
            List<Stock> userHoldings = new List<Stock>();
            foreach(Stock stock in Stocks){
                if(stock.User.User_Id == user_Id){
                    userHoldings.Add(stock);
                }
            }
            return userHoldings;
        }

        public static void Add(Stock stock)
        {
            stock.Holding_Id = Guid.NewGuid();
            Stocks.Add(stock);
        }

        public static void Delete(Guid id)
        {
            var stockId = Get(id);
            if(stockId is null){
                return;
            }
            Stocks.Remove(stockId);
        }

        public static void Update(Stock stock)
        {

        }
    }
}