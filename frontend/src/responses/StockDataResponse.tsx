import StockData from "./StockData";

class StockDataResponse {

    stocks: StockData[];

    constructor() {
        this.stocks = [new StockData()];
    }
}

export default StockDataResponse;