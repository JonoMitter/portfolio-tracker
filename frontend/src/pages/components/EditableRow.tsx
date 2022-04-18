import { ChangeEvent } from "react";
import StockData from "../../responses/StockData";
import "../styles/Navbar.scss";

interface Props {
    stock: StockData,
    editStockData: StockData,
    handleEditFormChange(event: ChangeEvent<HTMLInputElement>): void,
    handleCancelClick(): void
}

const EditableRow = (props: Props) => {

    let dateOfPurchase = props.editStockData.date_purchased.split('T')[0];

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
                    min="1"
                    step="0.01"
                    required
                    name="units"
                    value={props.editStockData.units}
                    onChange={props.handleEditFormChange}
                ></input>
            </td>
            <td key={"EditableRow5 " + props.stock.id} className="number">
                <input
                    type="number"
                    min="0"
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
                    value={dateOfPurchase}
                    onChange={props.handleEditFormChange}
                ></input>
            </td>
            <td key={"EditableRow7 " + props.stock.id} className="button-container">
                <button type="submit" className="button-2">SAVE</button><button type="button" className="button-1" onClick={props.handleCancelClick}>CANCEL</button>
            </td>
        </tr>
    );
};

export default EditableRow;