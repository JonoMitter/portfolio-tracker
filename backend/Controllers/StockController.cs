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
        public IActionResult AssignStockByJWT(StockDTO stock)
        {
            if (stockService.ValidateStock(stock))
            {
                try
                {
                    User user = GetUserFromJWT();
                    
                    //Create stock object based on POST body (StockDTO) and the logged in User
                    Stock createdStock = stockService.CreateFromDTO(stock, user);

                    return CreatedAtAction(nameof(AssignStockByJWT), createdStock);
                }
                catch (Exception e)
                {
                    return BadRequest("[" + e.GetType() + "] " + e.Message);
                }
            }
            else
            {
                return BadRequest("[Invalid Stock] '" + stock.code + "' - '" + stock.name + "' is not valid");
            }
        }

        [HttpGet]
        public IActionResult GetStocksByJWT()
        {
            try
            {
                User user = GetUserFromJWT();

                Stock[] stocks = stockService.getStocksForJWT(user.Id);

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
                if (stockService.ValidateStock(stock))
                {
                    stockService.UpdateFromDTO(stock);
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

        public User GetUserFromJWT()
        {
            try
            {
                //search for jwt in user's cookies
                String jwt = Request.Cookies["jwt"];
                JwtSecurityToken token = jwtService.Verify(jwt);

                Guid id = Guid.Parse(token.Issuer);
                User user = userService.getbyId(id);

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