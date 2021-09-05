using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;
using System;
using System.Collections.Generic;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StockController : ControllerBase
    {
        [HttpGet]
        public List<Stock> GetStocks()
        {
            return StockService.GetAll();
        }

        // [HttpGet("{id}")]
        // public Stock GetStock(Guid id)
        // {
        //     return StockService.Get(id);
        // }

        [HttpGet("{User_Id}")]
        public List<Stock> GetStocks(Guid User_Id)
        {
            return StockService.GetHoldings(User_Id);
        }

        [HttpPost]
        public IActionResult AddStock(Stock stock)
        {

            if (ValidateStock(stock) is true)
            {
                StockService.Add(stock);
                return CreatedAtAction(nameof(AddStock), new { id = stock.Holding_Id }, stock);
            }
            else
            {
                return BadRequest("Values for code, name, units or purchase price is invalid.");

            }
        }
        [HttpPut("{Holding_Id}")]

        public IActionResult update(Guid Holding_Id, Stock stock)
        {
            if (ValidateStock(stock) is true)
            {
                stock.Holding_Id = Holding_Id;
                StockService.Update(stock);
                return Ok();
            }
            return BadRequest();
        }
        [HttpDelete("{Holding_Id}")]
        public IActionResult Delete(Guid Holding_Id)
        {
            var tmpStock = StockService.Get(Holding_Id);

            if (tmpStock is null)
            {
                return NotFound();
            }

            StockService.Delete(Holding_Id);

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