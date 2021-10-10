using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.DTOs;
using System.IdentityModel.Tokens.Jwt;
using backend.Exceptions;

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

        [HttpGet("GetAll")]
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

        [HttpPost("create")]
        public IActionResult AssignStockByJWT(StockDTO stockIn)
        {
            if (ValidateStock(stockIn))
            {
                try
                {
                    User user = GetUserFromJWT();

                    //Create stock object based on POST body (StockDTO)
                    Stock stock = new Stock();
                    stock.Code = stockIn.Code;
                    stock.Name = stockIn.Name;
                    stock.Units = stockIn.Units;
                    stock.Purchase_Price = stockIn.Purchase_Price;
                    stock.UserId = user.Id;
                    // stock.User = user;

                    stockService.Create(stock);

                    return CreatedAtAction(nameof(AssignStockByJWT), stockIn);
                }
                catch (Exception e)
                {
                    return BadRequest("[" + e.GetType() + "] " + e.Message);
                }
            }
            else
            {
                return BadRequest("[Invalid Stock] '" + stockIn.Code + "' - '" + stockIn.Name + "' is not valid");
            }
        }

        [HttpGet]
        public IActionResult GetStocksByJWT()
        {
            try
            {
                User user = GetUserFromJWT();

                StockDTO[] stocks = stockService.getStocksDTOForJWT(user.Id);

                return Ok(stocks);
            }
            catch (Exception e)
            {
                return BadRequest("[" + e.GetType() + "] " + e.Message);
            }
        }

        //TODO
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

        //TODO
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

        public Boolean ValidateStock(StockDTO stock)
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

        public User GetUserFromJWT()
        {
            try
            {
                //search for jwt in user's cookies
                String jwt = Request.Cookies["jwt"];
                JwtSecurityToken token = jwtService.Verify(jwt);

                Guid id = Guid.Parse(token.Issuer);
                User user = userService.getbyId(id);

                // check whether valid userId
                if (user == null)
                {
                    throw new UserNotFoundException("User stored in cookies with Id: " + id + " could not be found in database");
                }
                return user;
            }
            catch (ArgumentNullException)
            {
                throw new JwtNotFoundException("Cannot find JWT in Cookies");
            }
        }
    }
}