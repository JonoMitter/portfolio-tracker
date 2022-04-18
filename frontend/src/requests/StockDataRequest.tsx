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
        this.date_purchased = new Date().toISOString().slice(0, 10);
    }
}

export default StockDataRequest;