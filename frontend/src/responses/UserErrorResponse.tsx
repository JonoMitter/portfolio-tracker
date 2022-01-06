import LoginError from "./UserError";

class UserErrorResponse {

    public message: String
    public errors: LoginError[];

    constructor(){
        this.message = "";
        this.errors = [];
    }
}

export default UserErrorResponse;