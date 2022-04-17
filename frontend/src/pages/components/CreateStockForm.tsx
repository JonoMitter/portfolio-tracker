import { SyntheticEvent, useEffect, useState } from "react";
import StockDataRequest from "../../requests/StockDataRequest";
import FormError from "../../responses/FormError";
import FormErrorResponse from "../../responses/FormErrorResponse";
import "../styles/Form.scss";
import FormInput from "./FormInput";

interface Props {
  stockData: StockDataRequest,
  handleFormChange(event: React.ChangeEvent<HTMLInputElement>): void,
  handleCreateFormSubmit(event: SyntheticEvent): void,

  //TODO
  //send server errors to relevant FormInput
  serverErrors?: FormErrorResponse
}

const CreateStockForm = (props: Props) => {

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
  const [datePurchasedValid, setDatePurchasedValid] = useState(false);

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

  function allValid(): boolean {
    return codeValid && nameValid && unitsValid && purchasePriceValid && datePurchasedValid;
  }

  function validateCode(e: React.ChangeEvent<HTMLInputElement>): void {
    let input = e.target.value;

    if (input.length >= 3 && input.length <= 5) {
      setCodeError(new FormError());
      setCodeValid(true);
    }
    else {
      let error = new FormError();
      error.field = "code";
      error.message = "Code must be between 3 and 5 characters";
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
      <form onSubmit={props.handleCreateFormSubmit} className="create-form-inner">
        <h4 className="form-heading">Add New Stock</h4>

        < FormInput label="Code" name="code" type="string" value={props.stockData.code} onChange={props.handleFormChange} error={codeError} validate={validateCode} />
        < FormInput label="Name" name="name" type="string" value={props.stockData.name} onChange={props.handleFormChange} error={nameError} validate={validateName} />
        < FormInput label="Units" name="units" type="number" value={props.stockData.units || ''} step={1} onChange={props.handleFormChange} error={unitsError} validate={validateUnits} />
        < FormInput label="Purchase Price" name="purchase_price" type="number" value={props.stockData.purchase_price || ''} step={0.1} onChange={props.handleFormChange} error={purchasePriceError} validate={validatePurchasePrice} />
        < FormInput label="Date of Purchase" name="date_purchased" type="date" value={props.stockData.date_purchased} onChange={props.handleFormChange} error={datePurchasedError} validate={validateDateOfPurchase} />

        <input type="submit" className="form-button button-2" value="CREATE HOLDING"></input>
      </form >
    </div >
  );
}

export default CreateStockForm;