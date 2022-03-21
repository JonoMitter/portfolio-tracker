import StockData from "../../responses/StockData";
import "../styles/Navbar.scss";

const Editable = (props: { stock: StockData }) => {

    return (
        <tr key={"0" + props.stock.id}>
            <td key={"1" + props.stock.id}>
                {props.stock.id}
            </td>
            <td key={"2" + props.stock.id}>
                <input 
                    type="text"
                    required
                    name="stock-code"
                    value={props.stock.code}
                ></input>
            </td>
            <td key={"3" + props.stock.id}>
                <input 
                    type="text"
                    required
                    name="stock-name"
                    value={props.stock.name}
                ></input>
            </td>
            <td key={"4" + props.stock.id} className="number">
                <input 
                    type="number"
                    required
                    name="stock-units"
                    value={props.stock.units}
                ></input>
            </td>
            <td key={"5" + props.stock.id} className="number">
                <input
                    type="number"
                    required
                    name="stock-units"
                    value={props.stock.purchase_price.toFixed(2)}>
                </input>
            </td>
            <td key={"6" + props.stock.id}>
                <button>SAVE</button> <button>CANCEL</button>
            </td>
        </tr>
    );
};

export default Editable;
