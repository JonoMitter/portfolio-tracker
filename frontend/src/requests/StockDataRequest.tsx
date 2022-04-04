class StockDataRequest {

    code: string;
    name: string;
    units: number;
    purchase_price: number;

    constructor() {
        this.code = "";
        this.name = "";
        this.units = NaN;
        this.purchase_price = NaN;
    }
}

export default StockDataRequest;