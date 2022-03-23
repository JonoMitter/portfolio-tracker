import { ChangeEvent } from "react";
import StockDataRequest from "../../requests/StockDataRequest";
import StockData from "../../responses/StockData";
import "../styles/Navbar.scss";

interface Props {
    editStockData: StockDataRequest,
    handleEditFormChange(event: ChangeEvent<HTMLInputElement>): void,
    handleCancelClick(): void,
    stock: StockData
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
            <td key={"EditableRow6 " + props.stock.id}>
                <button type="submit">SAVE</button> <button type="button" onClick={props.handleCancelClick}>CANCEL</button>
            </td>
        </tr>
    );
};

export default EditableRow;