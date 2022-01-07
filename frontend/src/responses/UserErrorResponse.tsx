import UserError from "./UserError";

class UserErrorResponse {

    public message: String
    public errors: UserError[];

    constructor(){
        this.message = "";
        this.errors = [];
    }
}

export default UserErrorResponse;