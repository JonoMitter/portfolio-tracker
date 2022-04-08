import StockData from "../../responses/StockData";
import "../styles/Navbar.scss";

interface Props {
    stock: StockData
    handleEditClick(event: MouseEvent, stock: StockData): void,
    handleDeleteClick(event: MouseEvent, stock: StockData): void
}

const ReadOnlyRow = (props: Props) => {

    return (
        <tr key={"0" + props.stock.id}>
            <td key={"1" + props.stock.id}>{props.stock.id}</td>
            <td key={"2" + props.stock.id}>{props.stock.code}</td>
            <td key={"3" + props.stock.id}>{props.stock.name}</td>
            <td key={"4" + props.stock.id} className="number">{props.stock.units}</td>
            <td key={"5" + props.stock.id} className="number">{props.stock.purchase_price !== null ? props.stock.purchase_price.toFixed(2) : 0.00}</td>
            <td key={"6" + props.stock.id}>{props.stock.date_purchased}</td>
            <td key={"7" + props.stock.id} className="button-container">
                <button type="button" className="button-1" onClick={(event) => props.handleEditClick(event.nativeEvent, props.stock)}>EDIT</button>
                <button type="button" className="button-2" onClick={(event) => props.handleDeleteClick(event.nativeEvent, props.stock)}>DELETE</button>
            </td>
        </tr>
    );
};

export default ReadOnlyRow;
