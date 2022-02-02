import React, { SyntheticEvent, useState, useEffect } from "react";
import axios from "axios";
import "../styles/Table.scss";
// import StockDataResponse from "../../responses/StockDataResponse";
import StockData from "../../responses/StockData";
import StockDataRequest from "../../requests/StockDataRequest";

const StockTable = () => {

  const [response, setResponse] = useState([new StockData()]);

  const [addStockData, setAddStockData] = useState(new StockDataRequest());

  //TODO
  //call on load only? i.e. [] as dependencies
  //call a GET stockData api function after each add/edit/remove call in .then() block
  useEffect(() => {

    function getStockData() {
      axios({
        method: "get",
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        url: "http://localhost:5000/api/stock",
      }).then(res => {
        setResponse(res.data);
        console.log("[StockTable] Got a user stock data response!");
      }).catch((error) => {
        console.log("[StockTable] Error " + error.Data);
      })
    }

    console.log("[StockTable] useEffect getStockData() called");
    getStockData();

    return () => {
      setResponse([new StockData()])
    }
  }, [addStockData, setResponse])

  // function getProp<T, K extends keyof T>(obj: T, key: K) {
  //   return obj[key];
  // }

  function setProp<T, K extends keyof T>(obj: T, key: K, value: T[K]) {
    obj[key] = value
  }

  function handleFormChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();

    let tempStock: StockDataRequest = addStockData;
    let targetName = event.target.getAttribute("name") as keyof StockDataRequest;
    let targetValue: string = event.target.value;

    //dynamically sets tempStock[targetName] = targetValue
    //i.e. tempStock["code"] = "ABC"
    setProp(tempStock, targetName, targetValue);

    setAddStockData(tempStock);
    console.log(addStockData);
  }

  function createNewHolding(e: SyntheticEvent) {
    e.preventDefault();

    let stockJSON = JSON.stringify(addStockData);
    console.log(stockJSON);
    //TODO
    //check valid inputs
    axios({
      method: "post",
      headers: { "Content-Type": "application/json" },
      url: "http://localhost:5000/api/Stock/create",
      withCredentials: true,
      /*
      *   "code" : newStock.code,
      *   "name" : newStock.name,
      *   "units" : newStock.units,
      *   "purchase_price" : newStock.purchase_price
      */
      data: stockJSON

    }).then((res) => {
      console.log("Success data" + res.data);
      setAddStockData(new StockDataRequest());
      //TODO
      //change input values back to ''

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
      <form onSubmit={createNewHolding}>
        <label htmlFor="code">Code</label>
        <br />
        <input type="text" name="code" onChange={handleFormChange} />
        <br />

        <label htmlFor="name">Name</label><br />
        <input type="text" name="name" onChange={handleFormChange} />
        <br />

        <label htmlFor="units">Units</label><br />
        <input type="number" name="units" onChange={handleFormChange} />
        <br />

        <label htmlFor="purchase-price">Avg. Purchase Price</label>
        <br />
        <input type="number" name="purchase_price" onChange={handleFormChange} />
        <br />

        <input type="submit" value="CREATE HOLDING"></input>
      </form>
    </div>
  );
}

export default StockTable;