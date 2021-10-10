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
            stock.Id = Guid.NewGuid();
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

        //only returns relelvant stock info, no user info
        public StockDTO[] getStocksDTOForJWT(Guid userId)
        {
            Stock[] stocks = context.Stock
                .Where(stock => stock.UserId == userId)
                .ToArray();

            //TODO
            //there must be a better way to only retrieve dto values meh
            List<StockDTO> stockDTOList = new List<StockDTO>();

            foreach(Stock stock in stocks){
                StockDTO stockDTO = new StockDTO();
                stockDTO.Name = stock.Name;
                stockDTO.Code = stock.Code;
                stockDTO.Units = stock.Units;
                stockDTO.Purchase_Price = stock.Purchase_Price;   
            }

            return stockDTOList.ToArray();
        }

        public Stock getById(Guid id) => context.Stock.FirstOrDefault(stock => stock.Id == id);

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