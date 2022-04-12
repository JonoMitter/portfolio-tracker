class FormError {

    public field: string
    public message: string;

    constructor(field?: string, message?: string) {

        if (field !== undefined) {
            this.field = field;
        } else {
            this.field = "";
        }

        if (message !== undefined) {
            this.message = message;
        } else {
            this.message = "";
        }
    }
}

export default FormError;