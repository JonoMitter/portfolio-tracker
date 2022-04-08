class StockDataRequest {

    code: string;
    name: string;
    units: number;
    purchase_price: number;
    date_purchased: string;

    constructor() {
        this.code = "";
        this.name = "";
        this.units = NaN;
        this.purchase_price = NaN;
        this.date_purchased = "";
    }
}

export default StockDataRequest;