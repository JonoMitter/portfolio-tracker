import React, { SyntheticEvent, useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import "../styles/Form.scss";
import StockDataResponse from "../../responses/StockDataResponse";
import StockData from "../../responses/StockData";


const StockTable = () => {

  const [response, setResponse] = useState([new StockData()]);

  useEffect(() => {
    requestStockData();
  }, [])

  function requestStockData() {
    axios({
      method: "get",
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      url: "http://localhost:5000/api/stock",
    }).then(res => {
      setResponse(res.data);
      console.log("Got Some Data!");
      console.log("Response Code: " + response[0].code)
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <div>
      <h2>These are your stocks:</h2>
      <table>
        <thead>
          <tr>
            {/* <th>Id</th> */}
            <th>Code</th>
            <th>Name</th>
            <th>Units</th>
            <th>Purchase Price</th>
          </tr>
        </thead>
        <tbody>
          {response.map((stock) =>
            <tr>
              {/* <td key={"1" + stock.id}>{stock.id}</td> */}
              <td key={"2" + stock.id}>{stock.code}</td>
              <td key={"3" + stock.id}>{stock.name}</td>
              <td key={"4" + stock.id}>{stock.units}</td>
              <td key={"5" + stock.id}>{stock.purchase_Price}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StockTable;