import ApiClient from '../_interceptors/interceptor'
const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default class UserCryptoServices {
    getUserCryptoById(id: number) {
        return ApiClient.get(`${baseURL}/user_cryptos?user=${id}`);
    }

    addUserCrypto(idUser: number, idCrypto: number) {
        return ApiClient.post(baseURL + "/user_cryptos", {
            "isHome": true,
            "isFavorite": true,
            "user": "/api/users/" + idUser,
            "crypto": "/api/cryptos/" + idCrypto
          });
    }

    removeUserCrypto(id: number) {
        return ApiClient.delete(`${baseURL}/user_cryptos/${id}`);
    }

    getUserCryptoByUserAndCrypto(idUser: number, idCrypto: number) {
        return ApiClient.get(`${baseURL}/user_cryptos?user=${idUser}&crypto=${idCrypto}`);
    }
}