class GetUserResponse {

    id: String
    firstName: string;
    email: string;

    constructor(){
        this.id = "";
        this.firstName = "";
        this.email = "";
    }

    // constructor(id: string, firstName: string, email: string){
    //     this.id = id;
    //     this.firstName = firstName;
    //     this.email = email;
    // }
}

export default GetUserResponse;