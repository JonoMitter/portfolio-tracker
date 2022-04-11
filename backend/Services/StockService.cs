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
            context.Stock.Add(stock);
            context.SaveChanges();
            return stock;
        }

        public Stock CreateFromDTO(StockDTO stockIn, User user)
        {
            Stock stock = new Stock();
            stock.code = stockIn.code.ToUpper();
            stock.name = stockIn.name;
            stock.units = stockIn.units;
            stock.purchase_price = stockIn.purchase_price;

            stock.date_purchased = DateTime.Parse(stockIn.date_purchased);
            stock.UserId = user.Id;

            stock.id = Guid.NewGuid();
            context.Stock.Add(stock);
            context.SaveChanges();
            return stock;
        }

        public void UpdateFromDTO(StockDTO stock)
        {
            Stock dbStock = context.Stock.FirstOrDefault(dbStock => dbStock.id == stock.id);
            dbStock.code = stock.code;
            dbStock.name = stock.name;
            dbStock.units = stock.units;
            dbStock.purchase_price = stock.purchase_price;
            dbStock.date_purchased = DateTime.Parse(stock.date_purchased);

            context.Stock.Update(dbStock);
            context.SaveChanges();
        }


        public async Task<List<Stock>> GetStocks()
        {
            return await context.Stock.ToListAsync();
        }

        public Stock[] getStocksForJWT(Guid userId)
        {
            Stock[] stocks = context.Stock
                .Where(stock => stock.UserId == userId)
                .ToArray();

            return stocks;
        }

        public Stock getById(Guid id) => context.Stock.FirstOrDefault(stock => stock.id == id);

        public void Update(Stock stock)
        {
            Stock dbStock = context.Stock.FirstOrDefault(dbStock => dbStock.id == stock.id);
            dbStock.code = stock.code;
            dbStock.name = stock.name;
            dbStock.units = stock.units;
            dbStock.purchase_price = stock.purchase_price;
            dbStock.date_purchased = stock.date_purchased;

            context.Stock.Update(dbStock);
            context.SaveChanges();
        }

        public void Delete(Guid stockId)
        {
            Stock dbStock = context.Stock.FirstOrDefault(dbStock => dbStock.id == stockId);
            context.Stock.Attach(dbStock);
            context.Stock.Remove(dbStock);
            context.SaveChanges();
        }

        public Boolean ValidateStock(StockDTO stock)
        {
            if (ValidateStockName(stock.name)
                && ValidateStockCode(stock.code)
                && ValidateStockUnits(stock.units)
                && ValidateStockPurchasePrice(stock.purchase_price)
                && ValidateStockDatePurchased(stock.date_purchased))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        private Boolean ValidateStockCode(String code)
        {
            if (code.Length >= 3 && code.Length <= 5)
            {
                // Console.WriteLine("Code: PASS");
                return true;
            }
            else
            {
                // Console.WriteLine("Code: FAIL");
                return false;

            }
        }

        private Boolean ValidateStockName(String name)
        {
            if (!name.Equals("") && name.Length > 0)
            {
                // Console.WriteLine("Name: PASS");
                return true;
            }
            else
            {
                // Console.WriteLine("Name: FAIL");
                return false;
            }
        }

        private Boolean ValidateStockUnits(int units)
        {
            // cannot have 0 units
            if (units > 0)
            {
                // Console.WriteLine("Units: PASS");
                return true;
            }
            else
            {

                // Console.WriteLine("Units: FAIL");
                return false;
            }
        }

        private Boolean ValidateStockPurchasePrice(float purchase_price)
        {
            // can have a purchase price of 0
            if (purchase_price >= 0)
            {
                // Console.WriteLine("Purchase_Price: PASS");
                return true;
            }
            else
            {
                // Console.WriteLine("Purchase_Price: FAIL");
                return false;
            }
        }

        private Boolean ValidateStockDatePurchased(string date_purchased)
        {
            return IsDate(date_purchased);
        }

        private static bool IsDate(string tempDate)
        {
            DateTime fromDateValue;
            var formats = new[] { "yyyy-MM-dd", "yyyy-MM-ddTHH:mm:ss" };
            if (DateTime.TryParseExact(tempDate, formats, System.Globalization.CultureInfo.InvariantCulture, System.Globalization.DateTimeStyles.None, out fromDateValue))
            {
                // Console.WriteLine("Date_Purchased: PASS");
                return true;
            }
            else
            {
                // Console.WriteLine("Date_Purchased: FAIL");
                return false;
            }
        }
    }
}