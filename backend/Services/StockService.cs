using backend.DTOs;
using backend.Models;
using backend.Persistence;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Services
{
    public class StockService
    {

        private readonly DataContext context;

        public StockService(DataContext context)
        {
            this.context = context;
        }
        public Stock Create(Stock stock)
        {
            stock.id = Guid.NewGuid();
            // stock.User = new User
            // {
            //     Id = stock.UserId,
            //     FirstName = "Richard",
            //     Password = "$2a$11$c7tQcicmKj8hQWanb4pzxezJS0.nKcGA.IJYbUg9lj5qC4L4QRBaC",
            //     Email = "Richard.Gao@hotmail.com"
            // };

            context.Stock.Add(stock);
            context.SaveChanges();
            return stock;
        }


        public async Task<List<Stock>> GetStocks()
        {
            return await context.Stock.ToListAsync();
        }

        //returns all stock data including user name and email 
        public Stock[] getStocksForJWT(Guid userId)
        {
            Stock[] stocks = context.Stock
                .Where(stock => stock.UserId == userId)
                .ToArray();

            return stocks;
        }

        //only returns relevant stock info, no user info
        public Stock[] getStocksDTOForJWT(Guid userId)
        {
            Stock[] stocks = context.Stock
                .Where(stock => stock.UserId == userId)
                .ToArray();

            return stocks;
        }

        public Stock getById(Guid id) => context.Stock.FirstOrDefault(stock => stock.id == id);

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

        public void Update(Stock stock)
        {
            Stock dbStock = context.Stock.FirstOrDefault(dbStock => dbStock.id == stock.id);
            if (stock.code != null)
            {
                dbStock.code = stock.code;
            }
            if (stock.name != null)
            {
                dbStock.name = stock.name;
            }
            if (stock.units > 0)
            {
                dbStock.units = stock.units;
            }
            if (stock.purchase_price > 0)
            {
                dbStock.purchase_price = stock.purchase_price;
            }

            context.Stock.Update(dbStock);
            context.SaveChanges();
        }

        public void Delete(Guid stockId)
        {
            Stock dbStock = context.Stock.FirstOrDefault(dbStock => dbStock.id == stockId);
            context.Stock.Remove(dbStock);
        }
    }
}