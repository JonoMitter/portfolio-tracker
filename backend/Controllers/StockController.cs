using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;
using System;
using backend.DTOs;
using System.IdentityModel.Tokens.Jwt;
using backend.Exceptions;
using System.Text.Json;

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

        [HttpPost("create")]
        public IActionResult AssignStockByJWT(StockDTO stockIn)
        {
            if (ValidateStockDTO(stockIn))
            {
                try
                {
                    User user = GetUserFromJWT();

                    //Create stock object based on POST body (StockDTO)
                    Stock stock = new Stock();
                    stock.code = stockIn.code.ToUpper();
                    stock.name = stockIn.name;
                    stock.units = stockIn.units;
                    stock.purchase_price = stockIn.purchase_price;

                    // Console.WriteLine("DatePurchased In: " + stockIn.date_purchased);

                    //get DateTime from String  
                    stock.date_purchased = DateTime.Parse(stockIn.date_purchased);
                    // Console.WriteLine("DatePurchased: " + stock.date_purchased.ToString());
                    stock.UserId = user.Id;

                    Stock createdStock = stockService.Create(stock);

                    return CreatedAtAction(nameof(AssignStockByJWT), createdStock);
                }
                catch (Exception e)
                {
                    return BadRequest("[" + e.GetType() + "] " + e.Message);
                }
            }
            else
            {
                return BadRequest("[Invalid Stock] '" + stockIn.code + "' - '" + stockIn.name + "' is not valid");
            }
        }

        [HttpGet]
        public IActionResult GetStocksByJWT()
        {
            try
            {
                User user = GetUserFromJWT();

                Stock[] stocks = stockService.getStocksDTOForJWT(user.Id);

                return Ok(stocks);
            }
            catch (Exception e)
            {
                return BadRequest("[" + e.GetType() + "] " + e.Message);
            }
        }

        [HttpPut("update")]
        public IActionResult Update(StockDTO stock)
        {
            stock.code = stock.code.ToUpper();
            try
            {
                if (ValidateStockDTO(stock))
                {
                    Stock updatedStock = new Stock();
                    updatedStock.id = stock.id;
                    updatedStock.code = stock.code;
                    updatedStock.name = stock.name;
                    updatedStock.units = stock.units;
                    updatedStock.purchase_price = stock.purchase_price;
                    string[] yearMonthDay = stock.date_purchased.Split('-');
                    updatedStock.date_purchased = new DateTime(Int32.Parse(yearMonthDay[0]), Int32.Parse(yearMonthDay[1]), Int32.Parse(yearMonthDay[2]));

                    stockService.Update(updatedStock);
                    return Ok("Stock " + stock.id + " successfully updated");
                }
                else
                {
                    return BadRequest("Invalid Stock\n'" + JsonSerializer.Serialize<StockDTO>(stock));
                }
            }
            catch (Exception e)
            {
                return BadRequest("[" + e.GetType() + "] " + e.Message);
            }
        }

        [HttpDelete("{Holding_Id}")]
        public IActionResult Delete(Guid Holding_Id)
        {
            var tmpStock = stockService.getById(Holding_Id);

            if (tmpStock is null)
            {
                return NotFound();
            }

            stockService.Delete(Holding_Id);

            return Ok("Stock " + Holding_Id + " successfully deleted");
        }

        public Boolean ValidateStockDTO(StockDTO stock)
        {
            if (stock.name.Length < 2 || stock.units.Equals(null) || stock.purchase_price.Equals(null))
            {
                return false;
            }
            if (stock.code.Length != 3 || stock.units <= 0 || stock.purchase_price <= 0)
            {
                return false;
            }
            //TODO
            //validate valid DateTime for date_purchased
            
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