import FormError from "../../responses/FormError";
import "../styles/Form.scss";

interface Props {
    label: string,
    type: string,
    name?: string,
    value: string | number,
    step?: number,
    handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void,
    error?: FormError
}

const FormPasswordInput = (props: Props) => {

    function displayError() {
        //turn on error styles
    }

    function clearError() {
        //turn off error styles
    }

    return (
        <div className="input-container">
            <label htmlFor="date-purchased">{props.label}</label>
            <input type={props.type} className="input" name={props.name} value={props.value} step={props.step} onChange={props.handleInputChange} />
            <p className="form-error" id={props.label + "-error"}>{props.error ? props.error.message : ""}</p>
        </div>
    )
}



export default FormPasswordInput;
