import ApiClient from '../_interceptors/interceptor'
const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default class CryptoServices {

    getAllCryptos() {
        return ApiClient.get(baseURL + "/cryptos");
    }

    getCryptoById(id: string) {
        return ApiClient.get(baseURL + "/cryptos/" + id);
    }

    updateCryptoById(id: string, form: any) {
        return ApiClient.put(baseURL + "/cryptos/" + id, form);
    }

    getHomeCryptos() {
        return ApiClient.get(baseURL + "/cryptos?isHome=1");
    }

    // TODO : faire le controller
    showCryptoToHome(form: any) {
        return ApiClient.post(baseURL + "/cryptos", form);
    }
    // TODO : faire le controller
    hideCryptoToHome(form: any) {
        return ApiClient.put(baseURL + "/cryptos", form);
    }
}
