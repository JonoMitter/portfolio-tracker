import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import StockDataRequest from "../../requests/StockDataRequest";
import FormError from "../../responses/FormError";
import FormErrorResponse from "../../responses/FormErrorResponse";
import "../styles/Form.scss";
import FormInput from "./FormInput";

interface Props {
  refreshStockData(): void

  //TODO
  //send server errors to relevant FormInput
  serverErrors?: FormErrorResponse
}

const CreateStockForm = (props: Props) => {
  const [stockData, setCreateStockData] = useState(new StockDataRequest());

  //frontend/client errors
  const [codeError, setCodeError] = useState(new FormError());
  const [nameError, setNameError] = useState(new FormError());
  const [unitsError, setUnitsError] = useState(new FormError());
  const [purchasePriceError, setPurchasePriceError] = useState(new FormError());
  const [datePurchasedError, setDatePurchasedError] = useState(new FormError());

  const [codeValid, setCodeValid] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [unitsValid, setUnitsValid] = useState(false);
  const [purchasePriceValid, setPurchasePriceValid] = useState(false);
  const [datePurchasedValid, setDatePurchasedValid] = useState(true);

  useEffect(() => {
    if (props.serverErrors !== undefined) {
      props.serverErrors.errors.forEach((error) => {
        switch (error.field) {
          case "code": {
            setCodeError(error);
            break;
          }
          case "name": {
            setNameError(error);
            break;
          }
          case "units": {
            setUnitsError(error);
            break;
          }
          case "purchase_price": {
            setPurchasePriceError(error);
            break;
          }
          case "date_purchased": {
            setDatePurchasedError(error);
            break;
          }
        }
      })
    }
    return () => {
      //clear all input errors
    }
  }, [props.serverErrors])

  function handleCreateFormSubmit(event: SyntheticEvent) {
    event.preventDefault();

    if (allValid()) {
      axios({
        method: "post",
        headers: { "Content-Type": "application/json" },
        url: "http://localhost:5000/api/Stock/create",
        withCredentials: true,
        data: JSON.stringify(stockData)

      }).then((res) => {
        setCreateStockData(new StockDataRequest());
        props.refreshStockData();

      }).catch((error) => {
        if (error.response.data) {
          console.log(`[handleCreateFormSubmit] Error\n${error.response.data}`);
        }
        else {
          console.log(`[handleCreateFormSubmit] Unknown Error\n${error.response}`);
        }
      })
    }
    else {
      //display error to prevent submit
      console.log("[CreateStockForm] Unable to submit, at least one value is invalid");
    }
  }

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCreateStockData(extractStockDataRequest(event, stockData));
    console.log(`[CreateForm change] code: ${stockData.code}, name: ${stockData.name}, units: ${stockData.units}, purchase_price: ${stockData.purchase_price}, date_purchased: ${stockData.date_purchased}`)
  }

  function extractStockDataRequest(event: React.ChangeEvent<HTMLInputElement>, stockData: StockDataRequest) {
    event.preventDefault();

    let tempStockData: StockDataRequest = { ...stockData };
    let targetName = event.target.getAttribute("name") as keyof StockDataRequest;
    let targetValue = event.target.value;

    setProperty(tempStockData, targetName, targetValue);

    return tempStockData;
  }

  function setProperty<T, K extends keyof T>(object: T, attribute: K, value: T[K]) {
    object[attribute] = value
  }

  function onCodeChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event);
    validateCode(event);
  }

  function onNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event);
    validateName(event);
  }

  function onUnitsChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event);
    validateUnits(event);
  }

  function onPurchasePriceChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event);
    validatePurchasePrice(event);
  }

  function onDateOfPurchaseChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event);
    validateDateOfPurchase(event);
  }

  function allValid(): boolean {
    return codeValid && nameValid && unitsValid && purchasePriceValid && datePurchasedValid;
  }

  function validateCode(e: React.ChangeEvent<HTMLInputElement>): void {
    let input = e.target.value;

    if (input.length >= 3 && input.length <= 6) {
      setCodeError(new FormError());
      setCodeValid(true);
    }
    else {
      let error = new FormError();
      error.field = "code";
      error.message = "Code must be between 3 and 6 characters";
      setCodeError(error);
      setCodeValid(false);
    }
  }

  function validateName(e: React.ChangeEvent<HTMLInputElement>): void {
    let input = e.target.value;

    if (input.length >= 0) {
      setNameError(new FormError());
      setNameValid(true);
    }
    else {
      let error = new FormError();
      error.field = "name";
      error.message = "Name must be more than 0 characters";
      setNameError(error);
      setNameValid(false);
    }
  }

  function validateUnits(e: React.ChangeEvent<HTMLInputElement>): void {
    let input = e.target.valueAsNumber;

    if (input > 0) {
      setUnitsError(new FormError());
      setUnitsValid(true);
    }
    else {
      let error = new FormError();
      error.field = "units";
      error.message = "Units must be more than 0";
      setUnitsError(error);
      setUnitsValid(false);
    }
  }

  function validatePurchasePrice(e: React.ChangeEvent<HTMLInputElement>): void {
    let input = e.target.valueAsNumber;

    if (input >= 0) {
      setPurchasePriceError(new FormError());
      setPurchasePriceValid(true);
    }
    else {
      let error = new FormError();
      error.field = "purchase_price";
      error.message = "Purchase Price cannot be less than 0";
      setPurchasePriceError(error);
      setPurchasePriceValid(false);
    }
  }

  function validateDateOfPurchase(e: React.ChangeEvent<HTMLInputElement>): void {
    // let input = e.target.valueAsDate

    // if (condition) {
    setPurchasePriceError(new FormError());
    setDatePurchasedValid(true);
    // }
    // else {
    //   let error = new FormError();
    //   error.field = "date_purchased";
    //   error.message = "Date Purchased must be a valid date"
    //   setDatePurchasedError(error);
    //   setDatePurchasedValid(false);
    // }
  }

  return (
    <div className="create-form-container">
      <form onSubmit={handleCreateFormSubmit} className="create-form-inner">
        <h4 className="form-heading">Add New Stock</h4>

        < FormInput label="Code" name="code" type="string" value={stockData.code} onChange={onCodeChange} error={codeError} />
        < FormInput label="Name" name="name" type="string" value={stockData.name} onChange={onNameChange} error={nameError} />
        < FormInput label="Units" name="units" type="number" value={stockData.units || ''} step={1} onChange={onUnitsChange} error={unitsError} />
        < FormInput label="Purchase Price" name="purchase_price" type="number" value={stockData.purchase_price || ''} step={0.1} onChange={onPurchasePriceChange} error={purchasePriceError} />
        < FormInput label="Date of Purchase" name="date_purchased" type="date" value={stockData.date_purchased} onChange={onDateOfPurchaseChange} error={datePurchasedError} />

        <input type="submit" className="form-button button-2" value="CREATE HOLDING"></input>
      </form >
    </div >
  );
}

export default CreateStockForm;