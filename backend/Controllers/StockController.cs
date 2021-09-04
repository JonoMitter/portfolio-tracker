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
    }
}