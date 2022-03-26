import { SyntheticEvent } from "react";
import StockDataRequest from "../../requests/StockDataRequest";
import "../styles/Form.scss";

interface Props {
  addStockData: StockDataRequest,
  handleFormChange(event: React.ChangeEvent<HTMLInputElement>): void,
  handleCreateFormSubmit(e: SyntheticEvent): void
}

const AddStockForm = (props: Props) => {
  return (
    <form onSubmit={props.handleCreateFormSubmit}>
      <label htmlFor="code">Code</label>
      <br />
      <input type="text" name="code" value={props.addStockData.code} onChange={props.handleFormChange} />
      <br />

      <label htmlFor="name">Name</label><br />
      <input type="text" name="name" value={props.addStockData.name} onChange={props.handleFormChange} />
      <br />

      <label htmlFor="units">Units</label><br />
      <input type="number" step="1" name="units" value={props.addStockData.units} onChange={props.handleFormChange} />
      <br />

      <label htmlFor="purchase-price">Avg. Purchase Price</label>
      <br />
      <input type="number" step="0.01" name="purchase_price" value={props.addStockData.purchase_price} onChange={props.handleFormChange} />
      <br />

      <input type="submit" value="CREATE HOLDING"></input>
    </form>
  );
}

export default AddStockForm;