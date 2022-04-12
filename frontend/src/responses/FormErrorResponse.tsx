import UserError from "./FormError";

class FormErrorResponse {

    public message: String
    public errors: UserError[];

    constructor(){
        this.message = "";
        this.errors = [];
    }
}

export default FormErrorResponse;