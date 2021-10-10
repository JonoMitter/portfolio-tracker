using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.DTOs;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StockController : ControllerBase
    {
        private readonly StockService stockService;
        private readonly JwtService jwtService;
        private readonly UserService userService;

        public StockController(StockService stockService, JwtService jwtService, UserService userService)
        {
            this.stockService = stockService;
            this.jwtService = jwtService;
            this.userService = userService;
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

        [HttpPost("assignStock")]
        public IActionResult AssignStockByJWT(StockDTO stockIn)
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                //getting correct JWT token but token not being set.
                var token = jwtService.Verify(jwt);

                Guid id = Guid.Parse(token.Issuer);

                var user = userService.getbyId(id);

                // check whether valid userId
                if (user == null)
                {
                    return Unauthorized("Logged in user with Id: " + id + " could not be found in database\n"
                    + "JWT: " + jwt);
                }

                //Create stock object based on POST body
                Stock stock = new Stock();
                stock.Code = stockIn.Code;
                stock.Name = stockIn.Name;
                stock.Units = stockIn.Units;
                stock.Purchase_Price = stockIn.Purchase_Price;
                stock.UserId = id;
                stock.User = user;

                Stock createdStock = stockService.Create(stock);

                return Ok(createdStock);
            }
            catch (Exception e)
            {
                // return Content(e.StackTrace.ToString());
                return BadRequest("[Error] " + e.GetType() + " could not find JWT");
            }
        }

        [HttpGet("getStocks")]
        public IActionResult GetStocksByJWT()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                //getting correct JWT token but token not being set.
                var token = jwtService.Verify(jwt);

                Guid id = Guid.Parse(token.Issuer);

                var user = userService.getbyId(id);

                // check whether valid userId
                if (user == null)
                {
                    return Unauthorized("Logged in user with Id: " + id + " could not be found in database\n"
                    + "JWT: " + jwt);
                }

                StockDTO[] stocks = stockService.getStocksDTOForJWT(id);

                return Ok(stocks);
            }
            catch (Exception e)
            {
                return BadRequest("[Error] " + e.GetType() + "Trace: " + e.StackTrace + " could not find JWT");
            }
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