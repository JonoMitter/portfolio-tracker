import React, { SyntheticEvent, useState, useEffect, Fragment } from "react";
import axios from "axios";
import "../styles/Table.scss";
// import StockDataResponse from "../../responses/StockDataResponse";
import StockData from "../../responses/StockData";
import StockDataRequest from "../../requests/StockDataRequest";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";

const StockTable = () => {

  const [stockDataResponse, setStockDataResponse] = useState([new StockData()]);

  const [addStockData, setAddStockData] = useState(new StockDataRequest());

  const [editStockData, setEditStockData] = useState(new StockDataRequest());

  const [editStockId, setEditStockId] = useState('');

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
        setStockDataResponse(res.data);
        console.log("[StockTable] Got a user stock data response!");
      }).catch((error) => {
        console.log("[StockTable] Error " + error.Data);
      })
    }

    console.log("[StockTable] useEffect getStockData() called");
    getStockData();

    return () => {
      setStockDataResponse([new StockData()])
    }
  }, [addStockData, setStockDataResponse])

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
    let targetValue = event.target.value;

    //dynamically sets tempStock[targetName] = targetValue
    //i.e. tempStock["code"] = "ABC"
    setProp(tempStock, targetName, targetValue);

    setAddStockData(tempStock);
  }

  function handleEditFormChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();

    let tempEditStock: StockDataRequest = {...editStockData};
    let targetName = event.target.getAttribute("name") as keyof StockDataRequest;
    let targetValue = event.target.value;

    //dynamically sets tempStock[targetName] = targetValue
    //i.e. tempStock["code"] = "ABC"
    setProp(tempEditStock, targetName, targetValue);

    setEditStockData(tempEditStock);
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

  const handleEditClick = (event: MouseEvent, stock: StockData) => {
    event.preventDefault();
    setEditStockId(stock.id);

    // NEW WAY?
    // const formValues = {...stock}

    /* OLD WAY?? */
    const formValues = new StockDataRequest();
    formValues.code = stock.code;
    formValues.name = stock.name;
    formValues.units = stock.units;
    formValues.purchase_price = stock.purchase_price;

    setEditStockData(formValues);
  }

  return (
    <div>
      <h3>Your Stocks:</h3>
      <form>
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
          {/* TODO somehow need to check if there are multiple entries of one type of stock... */}
          {/* i.e if two ABC entries, they should be combined into one with the average price displayed, click on row to show all transactions */}
          <tbody>
            {stockDataResponse.map((stock) => (
                <Fragment key={"Row for: " + stock.id}>
                  {editStockId === stock.id ? (
                    <EditableRow key={editStockData.code} editStockData={editStockData} handleEditFormChange={handleEditFormChange} stock={stock} />
                  ) : (
                    <ReadOnlyRow key={editStockData.code} stock={stock} handleEditClick={handleEditClick} />
                  )}
                </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h4>Add New Stock</h4>
      <form onSubmit={createNewHolding}>
        <label htmlFor="code">Code</label>
        <br />
        <input type="text" name="code" onChange={handleFormChange} />
        <br />

        <label htmlFor="name">Name</label><br />
        <input type="text" name="name" onChange={handleFormChange} />
        <br />

        <label htmlFor="units">Units</label><br />
        <input type="number" step="1" name="units" onChange={handleFormChange} />
        <br />

        <label htmlFor="purchase-price">Avg. Purchase Price</label>
        <br />
        <input type="number" step="0.01" name="purchase_price" onChange={handleFormChange} />
        <br />

        <input type="submit" value="CREATE HOLDING"></input>
      </form>
    </div>
  );
}

export default StockTable;