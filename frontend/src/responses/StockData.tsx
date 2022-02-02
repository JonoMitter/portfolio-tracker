class StockData {

    id: string
    code: string;
    name: string;
    units: number;
    purchase_price: number;

    constructor() {
        this.id = "";
        this.code = "";
        this.name = "";
        this.units = 0;
        this.purchase_price = 0;
    }
}

export default StockData;