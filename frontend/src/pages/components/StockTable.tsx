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

  const [editStockData, setEditStockData] = useState(new StockData());

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

    let tempEditStock: StockData = {...editStockData};
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

  const handleEditFormSubmit = (event: SyntheticEvent) =>{
    event.preventDefault();

    const editedStock = {...editStockData}

    let stockJSON = JSON.stringify(editedStock);

    console.log(`Edited stockJSON ${stockJSON}`)

    axios({
      method: "put",
      headers: { "Content-Type": "application/json" },
      url: "http://localhost:5000/api/Stock/update",
      withCredentials: true,
      /*
      *   "code" : newStock.code,
      *   "name" : newStock.name,
      *   "units" : newStock.units,
      *   "purchase_price" : newStock.purchase_price
      */
      data: stockJSON

    }).then((res) => {
      // console.log("Success data" + res.data);

      //TODO
      //change useEffect to include edit and delete
      //OR
      //move getStockData api call to a seperate method which is called after edit/delete and updates the state containing all the stock rows
      setAddStockData(new StockDataRequest());
      //call get stock api
    }).catch((error) => {
      if (error.response.data) {
        console.log("Error data" + error.response.data)
      }
      else {
        console.log(`Unknown Error:\n
    ${error.response}`);
      }
    })

    setEditStockId('');
  }

  const handleEditClick = (event: MouseEvent, stock: StockData) => {
    event.preventDefault();

    setEditStockId(stock.id);

    const formValues = {...stock}

    setEditStockData(formValues);
  }

  const handleCancelClick = () => {
    setEditStockId('');
  }
  
  const handleDeleteClick = (event: MouseEvent, stock: StockData) => {
    event.preventDefault();

    axios({
      method: "delete",
      headers: { "Content-Type": "application/json" },
      url: `http://localhost:5000/api/Stock/${stock.id}`,
      withCredentials: true,

    }).then((res) => {
      console.log("Deleted " + stock.id);
      setAddStockData(new StockDataRequest());

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
      <form onSubmit={handleEditFormSubmit}>
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
                    <EditableRow key={"EditableRow "+ stock.id} editStockData={editStockData} handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick} stock={stock}/>
                  ) : (
                    <ReadOnlyRow key={"ReadOnlyRow "+ stock.id} stock={stock} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick}/>
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