using backend.Models;
using System.Collections.Generic;
using System.Linq;

namespace backend.Services
{
    public class StockService
    {

        static List<Stock> Stocks { get; }
        // static int nextId = 3;
        static StockService()
        {
            Stocks = new List<Stock>
            {
                new Stock { Holding_Id = 1, User_Id = 1, Code = "NAB", Name = "National Australia Bank", Units = 10, Purchase_Price = (float) 25.30 },
                new Stock { Holding_Id = 2, User_Id = 2, Code = "CBA", Name = "Commonwealth Bank", Units = 5, Purchase_Price = (float) 30.20 }
            };
        }

        public static List<Stock> GetAll() => Stocks;

        public static Stock Get(int id) => Stocks.FirstOrDefault(stock => stock.Holding_Id == id);

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