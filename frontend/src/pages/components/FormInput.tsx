import { useCallback, useEffect } from "react";
import FormError from "../../responses/FormError";
import "../styles/Form.scss";

interface Props {
    label: string,
    type: string,
    name: string,
    value: string | number,
    step?: number,
    onChange(event: React.ChangeEvent<HTMLInputElement>): void,
    error?: FormError
}

const FormPasswordInput = (props: Props) => {

    let inputEl = document.getElementById(props.label + "-input");
    let errorEl = document.getElementById(props.label + "-error");

    const displayError = useCallback(() => {
        //turn on error styles
        if (props.error !== undefined) {
            if (props.error.message !== "" && inputEl && errorEl) {
                inputEl.classList.add("input-error");
                errorEl.innerHTML = props.error.message;
            }
        }
    }, [errorEl, inputEl, props.error])

    const clearError = useCallback(() => {
        //turn off error styles
        if (inputEl && errorEl) {
            inputEl.classList.remove("input-error");
            errorEl.innerHTML = "";
        }
    }, [errorEl, inputEl])

    useEffect(() => {
        if (props.error && props.error.message !== "") {
            displayError();
        }
        else {
            clearError();
        }
    }, [displayError, clearError, props.error])

    return (
        <div className="input-container">
            <label htmlFor="date-purchased">{props.label}</label>
            <input id={props.label + "-input"} type={props.type} className="input" name={props.name} value={props.value} step={props.step} onChange={props.onChange} />
            <p id={props.label + "-error"} className="form-error" >{props.error ? props.error.message : ""}</p>
        </div>
    )
}

export default FormPasswordInput;