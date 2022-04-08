import { ChangeEvent } from "react";
import StockDataRequest from "../../requests/StockDataRequest";
import StockData from "../../responses/StockData";
import "../styles/Navbar.scss";

interface Props {
    stock: StockData,
    editStockData: StockDataRequest,
    handleEditFormChange(event: ChangeEvent<HTMLInputElement>): void,
    handleCancelClick(): void
}

const EditableRow = (props: Props) => {
    return (
        <tr key={"EditableRow0 " + props.stock.id}>
            <td key={"EditableRow1 " + props.stock.id}>
                {props.stock.id}
            </td>
            <td key={"EditableRow2 " + props.stock.id}>
                <input
                    type="text"
                    required
                    name="code"
                    value={props.editStockData.code}
                    onChange={props.handleEditFormChange}
                ></input>
            </td>
            <td key={"EditableRow3 " + props.stock.id}>
                <input
                    type="text"
                    required
                    name="name"
                    value={props.editStockData.name}
                    onChange={props.handleEditFormChange}
                ></input>
            </td>
            <td key={"EditableRow4 " + props.stock.id} className="number">
                <input
                    type="number"
                    step="1"
                    required
                    name="units"
                    value={props.editStockData.units}
                    onChange={props.handleEditFormChange}
                ></input>
            </td>
            <td key={"EditableRow5 " + props.stock.id} className="number">
                <input
                    type="number"
                    step="0.01"
                    required
                    name="purchase_price"
                    value={props.editStockData.purchase_price}
                    onChange={props.handleEditFormChange}
                ></input>
            </td>
            <td key={"EditableRow6 " + props.stock.id} className="number">
                <input
                    type="date"
                    required
                    name="date_purchased"
                    // value={props.editStockData.date_purchased}
                    onChange={props.handleEditFormChange}
                ></input>
            </td>
            <td key={"EditableRow7 " + props.stock.id} className="button-container">
                <button type="submit" className="button-2">SAVE</button><button type="button" className="button-1" onClick={props.handleCancelClick}>CANCEL</button>
            </td>
        </tr>
    );
};
//.date_purchased.toISOString().split('T')[0]

export default EditableRow;