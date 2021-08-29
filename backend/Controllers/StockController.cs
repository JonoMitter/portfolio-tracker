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

        [HttpGet("{id}")]
        public Stock GetStock(int id)
        {
            return StockService.Get(id);
        }
    }
}