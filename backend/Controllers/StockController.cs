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
    }
}