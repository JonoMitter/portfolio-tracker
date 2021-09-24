using backend.Models;
using backend.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;

namespace backend.Services
{
    public class StockService
    {

        private readonly DataContext context;

        public StockService(DataContext context){
            this.context = context;
        }
        public Stock addStock(Stock stock){
            context.Stock.Add(stock);
            context.SaveChanges();
            return stock;
        }

        public Stock getById(Guid id) => context.Stock.FirstOrDefault(stock => stock.Holding_Id == id);

    //     public static List<Stock> GetHoldings(Guid user_Id) {
            
    //         List<Stock> userHoldings = new List<Stock>();
    //         foreach(Stock stock in Stocks){
    //             if(stock.User_Id == user_Id){
    //                 userHoldings.Add(stock);
    //             }
    //         }
    //         return userHoldings;
    //     }

    //     public static void Add(Stock stock)
    //     {
    //         stock.Holding_Id = Guid.NewGuid();
    //         Stocks.Add(stock);
    //     }

    //     public static void Delete(Guid id)
    //     {
    //         var stockId = Get(id);
    //         if(stockId is null){
    //             return;
    //         }
    //         Stocks.Remove(stockId);
    //     }

    //     public static void Update(Stock stock)
    //     {
    //         var index = Stocks.FindIndex(stockIt => stockIt.Holding_Id == stock.Holding_Id);
    //         if(index == -1){
    //             return;
    //         }
    //         Console.WriteLine(stock.Holding_Id);
    //         stock.Holding_Id = Stocks[index].Holding_Id;
    //         Stocks[index] = stock;
    //     }
    }
}