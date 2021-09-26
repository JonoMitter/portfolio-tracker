using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StockController : ControllerBase
    {
        private readonly StockService stockService;

        public StockController(StockService stockService)
        {
            this.stockService = stockService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Stock>>> GetStocks()
        {
            List<Stock> list = await Task.Run(() => stockService.GetStocks());
            return list;
        }

        // [HttpGet("{id}")]
        // public Stock GetStock(Guid id)
        // {
        //     return StockService.Get(id);
        // }

        // [HttpGet("{User_Id}")]
        // public List<Stock> GetStocks(Guid stock_Id)
        // {
        //     // return StockService.GetHoldings(User_Id);
        // }

        [HttpPost]
        public IActionResult Create(Stock stock)
        {
            stockService.Create(stock);

            // if (ValidateStock(stock) is true)
            // {
            //     StockService.Add(stock);
            return CreatedAtAction(nameof(Create), new { id = stock.Id }, stock);
            // }
            // else
            // {
            // return BadRequest("Values for code, name, units or purchase price is invalid.");

            // }
        }
        [HttpPut("{Holding_Id}")]

        public IActionResult update(Guid id, Stock stock)
        {
            // if (ValidateStock(stock) is true)
            // {
            //     stock.Id = Id;
            //     StockService.Update(stock);
            //     return Ok();
            // }
            return BadRequest();
        }
        [HttpDelete("{Holding_Id}")]
        public IActionResult Delete(Guid Holding_Id)
        {
            // var tmpStock = StockService.Get(Holding_Id);

            // if (tmpStock is null)
            // {
            //     return NotFound();
            // }

            // StockService.Delete(Holding_Id);

            return Ok();
        }
        public Boolean ValidateStock(Stock stock)
        {
            if (stock.Name.Length < 2 || stock.Units.Equals(null) || stock.Purchase_Price.Equals(null))
            {
                return false;
            }
            if (stock.Code.Length != 3 || stock.Units < 1 || stock.Purchase_Price < 0.01)
            {
                return false;
            }
            return true;
        }
    }
}