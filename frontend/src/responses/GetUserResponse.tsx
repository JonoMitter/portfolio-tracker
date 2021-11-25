class GetUserResponse {

    id: String
    firstName: string;
    email: string;

    constructor(id: string, firstName: string, email: string){
        this.id = id;
        this.firstName = firstName;
        this.email = email;
    }

    public get getId(){
        return this.id;
    }
    public get getFirstName(){
        return this.firstName;
    }
    public get getEmail(){
        return this.email;
    }
}

export default GetUserResponse;