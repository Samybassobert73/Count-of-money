/* eslint-disable */
import axios from "axios";

export default class BinanceServices {
    url = 'https://api.binance.com/api/v3';

    getInfo(symbol: String) {
        return axios.get(this.url + "/ticker?symbol=" + symbol);
    }

    getMarketData(symbol: String, interval: String, limit: Number) {
        return axios.get(this.url + "/klines?symbol="+symbol+"&interval="+ interval+"&limit=" + limit);
    }
}
