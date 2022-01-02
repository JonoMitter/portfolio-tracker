import LoginError from "./LoginError";

class LoginErrorResponse {

    public message: String
    public errors: LoginError[];

    constructor(){
        this.message = "";
        this.errors = [];
    }
}

export default LoginErrorResponse;