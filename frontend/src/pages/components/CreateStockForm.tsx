import { SyntheticEvent } from "react";
import StockDataRequest from "../../requests/StockDataRequest";
import "../styles/Form.scss";

interface Props {
  addStockData: StockDataRequest,
  handleFormChange(event: React.ChangeEvent<HTMLInputElement>): void,
  handleCreateFormSubmit(e: SyntheticEvent): void
}

const CreateStockForm = (props: Props) => {
  return (
    <div className="create-form-container">
      <form onSubmit={props.handleCreateFormSubmit} className="create-form-inner">
        <h4 className="form-heading">Add New Stock</h4>
        <br />

        <div className="input-container">
          <label htmlFor="code">Code</label>
          <input type="text" className="input" name="code" value={props.addStockData.code} onChange={props.handleFormChange} />
          <p className="form-error"></p>
        </div>

        <div className="input-container">
          <label htmlFor="name">Name</label>
          <input type="text" className="input" name="name" value={props.addStockData.name} onChange={props.handleFormChange} />
          <p className="form-error"></p>
        </div>

        <div className="input-container">
          <label htmlFor="units">Units</label>
          <input type="number" className="input" min="1" step="1" name="units" value={props.addStockData.units || ''} onChange={props.handleFormChange} />
          <p className="form-error"></p>
        </div>

        <div className="input-container">
          <label htmlFor="purchase-price">Avg. Purchase Price</label>
          <input type="number" className="input" min="0" step="0.01" name="purchase_price" value={props.addStockData.purchase_price || ''} onChange={props.handleFormChange} />
          <p className="form-error"></p>
        </div>

        <div className="input-container">
          <label htmlFor="date-purchased">Date of Purchase</label>
          <input type="date" className="input" name="date_purchased" value={props.addStockData.date_purchased} onChange={props.handleFormChange} />
          <p className="form-error"></p>
        </div>

        <input type="submit" className="form-button signup-button" value="CREATE HOLDING"></input>
      </form >
    </div >
  );
}

export default CreateStockForm;