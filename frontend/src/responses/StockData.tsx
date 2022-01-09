class StockDataResponse {

    id: string
    code: string;
    name: string;
    units: number;
    purchase_Price: number;

    constructor() {
        this.id = "";
        this.code = "";
        this.name = "";
        this.units = 0;
        this.purchase_Price = 0;
    }
}

export default StockDataResponse;