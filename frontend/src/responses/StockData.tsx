class StockData {

    id: string
    code: string;
    name: string;
    units: number;
    purchase_price: number;
    date_purchased: string;

    constructor() {
        this.id = "";
        this.code = "";
        this.name = "";
        this.units = 0;
        this.purchase_price = 0;
        this.date_purchased = "";
    }

}

export default StockData;