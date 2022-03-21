import StockData from "../../responses/StockData";
import "../styles/Navbar.scss";

const ReadOnlyRow = (props: { stock: StockData }) => {

    return (
        <tr key={"0" + props.stock.id}>
            <td key={"1" + props.stock.id}>{props.stock.id}</td>
            <td key={"2" + props.stock.id}>{props.stock.code}</td>
            <td key={"3" + props.stock.id}>{props.stock.name}</td>
            <td key={"4" + props.stock.id} className="number">{props.stock.units}</td>
            <td key={"5" + props.stock.id} className="number">{props.stock.purchase_price !== null ? props.stock.purchase_price.toFixed(2) : 0.00}</td>
            <td key={"6" + props.stock.id}><button>EDIT</button> <button>DELETE</button>{'TODO >'}</td>
        </tr>
    );
};

export default ReadOnlyRow;
