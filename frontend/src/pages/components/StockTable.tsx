import React, { SyntheticEvent, useState, useEffect, Fragment } from "react";
import axios from "axios";
import "../styles/Table.scss";
import StockData from "../../responses/StockData";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import CreateStockForm from "./CreateStockForm";

const StockTable = () => {

  const [stockDataResponse, setStockDataResponse] = useState([new StockData()]);

  const [editStockData, setEditStockData] = useState(new StockData());

  const [editStockId, setEditStockId] = useState('');

  useEffect(() => {
    getStockData();

    return () => {
      setStockDataResponse([new StockData()])
    }
  }, [setStockDataResponse])

  function getStockData(): void {
    axios({
      method: "get",
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      url: "http://localhost:5000/api/stock",
    }).then(res => {
      setStockDataResponse(res.data);
      console.log("[StockTable] getStockData() called");
    }).catch((error) => {
      console.log("[StockTable] Error " + error.Data);
    })
  }

  /*
   * Dynamically sets object[attribute] = value
   * i.e. stock["code"] = "ABC" same as stock.code = "ABC"
   */
  function setProperty<T, K extends keyof T>(object: T, attribute: K, value: T[K]) {
    object[attribute] = value
  }

  function extractStockData(event: React.ChangeEvent<HTMLInputElement>, stockData: StockData) {
    event.preventDefault();

    let tempStockData: StockData = { ...stockData };
    let targetName = event.target.getAttribute("name") as keyof StockData;
    let targetValue = event.target.value;

    setProperty(tempStockData, targetName, targetValue);

    return tempStockData;
  }

  function handleEditFormChange(event: React.ChangeEvent<HTMLInputElement>) {
    const editedStock = extractStockData(event, editStockData);
    setEditStockData(editedStock);
  }

  const handleEditFormSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const editedStock = { ...editStockData }

    axios({
      method: "put",
      headers: { "Content-Type": "application/json" },
      url: "http://localhost:5000/api/Stock/update",
      withCredentials: true,
      /*
      *   "id"    : editedStock.id,
      *   "code"  : editedStock.code,
      *   "name"  : editedStock.name,
      *   "units" : editedStock.units,
      *   "purchase_price" : editedStock.purchase_price
      */
      data: JSON.stringify(editedStock)

    }).then((res) => {
      console.log("[handleEditFormSubmit()] " + res.data)
      getStockData();
      setEditStockData(new StockData());
      setEditStockId('');

    }).catch((error) => {
      if (error.response.data) {
        console.log(`[handleEditFormSubmit] Error: ${error.response.data}`)
      }
      else {
        console.log(`[handleEditFormSubmit] Unknown Error: ${error.response}`);
      }
    })
  }

  const handleEditClick = (event: MouseEvent, stock: StockData) => {
    event.preventDefault();

    setEditStockId(stock.id);

    const formValues = { ...stock }
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
      console.log(res.data)
      getStockData();

    }).catch((error) => {
      if (error.response.data) {
        console.log(`[handleDeleteClick] Error\n${error.response.data}`)
      }
      else {
        console.log(`[handleDeleteClick] Unknown Error\n${error.response}`);
      }
    })
  }

  return (
    <div>
      <h3>Stocks</h3>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            {stockDataResponse.length > 0 ? <tr>
              <th>Id</th>
              <th>Code</th>
              <th>Name</th>
              <th>Units</th>
              <th>Purchase Price</th>
              <th>Date Purchased</th>
              <th><i>Actions</i></th>
            </tr> : ""}
          </thead>
          {/* TODO somehow need to check if there are multiple entries of one type of stock... */}
          {/* i.e if two ABC entries, they should be combined into one with the average price displayed, click on row to show all transactions */}
          <tbody>
            {stockDataResponse.map((stock) => (
              <Fragment key={"Row for " + stock.id}>
                {editStockId === stock.id ? (
                  <EditableRow key={"EditableRow " + stock.id} stock={stock} editStockData={editStockData} handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick} />
                ) : (
                  <ReadOnlyRow key={"ReadOnlyRow " + stock.id} stock={stock} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick} />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
      
      <CreateStockForm refreshStockData={getStockData} />
    </div>
  );
}

export default StockTable;