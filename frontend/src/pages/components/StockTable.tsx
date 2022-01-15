import React, { SyntheticEvent, useState, useEffect } from "react";
import axios from "axios";
import "../styles/Table.scss";
// import StockDataResponse from "../../responses/StockDataResponse";
import StockData from "../../responses/StockData";
import StockDataRequest from "../../requests/StockDataRequest";

const StockTable = () => {

  const [response, setResponse] = useState([new StockData()]);

  const [newStock, setNewStock] = useState(new StockDataRequest());

  const [newestStockCode, setNewestStockCode] = useState('');

  useEffect(() => {
    function getStockData() {
      axios({
        method: "get",
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        url: "http://localhost:5000/api/stock",
      }).then(res => {
        setResponse(res.data);
        console.log("Got Some Data!");
        console.log("Response Code: " + res.data)
      }).catch((error) => {
        console.log("Error " + error.Data);
      })
    }
    console.log("[StockTable getStockData] useEffect Run!");
    getStockData();
    return () => {
      setResponse([new StockData()])
    }
  }, [newestStockCode, setResponse])

  function onChangeNewStock(event: React.ChangeEvent<HTMLInputElement>) {
    let stock = newStock;

    let inputName = event.target.getAttribute("name");
    if (inputName === null) {
      inputName = "";
    }

    switch (inputName) {
      case "code":
        stock.code = event.target.value;
        // console.log("Stock Code: " + stock.code);
        break;
      case "name":
        stock.name = event.target.value;
        // console.log("Stock Name: " + stock.name);
        break;
      case "purchase_price":
        stock.purchase_price = event.target.valueAsNumber;
        // console.log("Stock Price: " + stock.purchase_price);
        break;
      case "units":
        stock.units = event.target.valueAsNumber;
        // console.log("Stock Units: " + stock.units);
        break;
    }
    setNewStock(stock);
  }

  function createNewStock(e: SyntheticEvent) {
    e.preventDefault();
    let stockJSON = JSON.stringify(newStock);
    console.log(stockJSON);
    //TODO
    //check valid inputs
    axios({
      method: "post",
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      url: "http://localhost:5000/api/Stock/create",
      data: stockJSON
      // {
      //   "code" : newStock.code,
      //   "name" : newStock.name,
      //   "units" : newStock.units,
      //   "purchase_price" : newStock.purchase_price
      // }
    }).then((res) => {
      console.log("Success data" + res.data);
      setNewestStockCode(newStock.code);
    }).catch((error) => {
      if (error.response.data) {
        console.log("Error data" + error.response.data)
      }
      else {
        console.log(`Unknown Error:\n
          ${error.response}`);
      }
    })
  }

  return (
    <div>
      <h3>Your Stocks:</h3>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Code</th>
            <th>Name</th>
            <th>Units</th>
            <th>Purchase Price</th>
            <th><i>Actions</i></th>
          </tr>
        </thead>
        <tbody>
          {response.map((stock) =>
            <tr key={"0" + stock.id}>
              <td key={"1" + stock.id}>{stock.id}</td>
              <td key={"2" + stock.id}>{stock.code}</td>
              <td key={"3" + stock.id}>{stock.name}</td>
              <td key={"4" + stock.id} className="number">{stock.units}</td>
              <td key={"5" + stock.id} className="number">{stock.purchase_price !== null ? stock.purchase_price.toFixed(2) : 0.00}</td>
              <td key={"6" + stock.id}>EDIT | DELETE</td>
            </tr>
          )}
        </tbody>
      </table>

      <h4>Add new Stock</h4>
      <form onSubmit={createNewStock}>
        <label htmlFor="code">Code</label>
        <br />
        <input type="text" name="code" onChange={onChangeNewStock} />
        <br /><br />

        <label htmlFor="name">Name</label><br />
        <input type="text" name="name" onChange={onChangeNewStock} />
        <br /><br />

        <label htmlFor="units">Units</label><br />
        <input type="number" name="units" onChange={onChangeNewStock} />
        <br /><br />

        <label htmlFor="purchase-price">Avg. Purchase Price</label>
        <br />
        <input type="number" name="purchase_price" onChange={onChangeNewStock} />
        <br /><br />

        <input type="submit" value="CREATE HOLDING"></input>
      </form>
    </div>
  );
}

export default StockTable;