import ApiClient from '../_interceptors/interceptor'
const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default class UserServices {
    addNewUser(form: any){
        return ApiClient.post(baseURL + "/users", form);
    }

    getAllUsers() {
        return ApiClient.get(baseURL + "/users");
    }

    getUserById(id: string) {
        return ApiClient.get(baseURL + "/users/" + id);
    }

    updateUser(id: string, form: any) {
        return ApiClient.put(baseURL + "/users/" + id, form);
    }

    deleteUser(id: string) {
        return ApiClient.delete(baseURL + "/users/" + id);
    }

    // TODO : faire le controller
    blockUser(id: string) {
        return ApiClient.put(baseURL + "/users/" + id);
    }
    // TODO : faire le controller
    unblockUser(id: string) {
        return ApiClient.put(baseURL + "/users/" +id);
    }
    // TODO : faire le controller
    setFavoriteCrypto(form: any) {
        return ApiClient.post(baseURL + "/user_crypto/", form);
    }
    // TODO : faire le controller
    setFavoriteFlux(form: any) {
        return ApiClient.post(baseURL + "/flux_article_users/", form);
    }
    // TODO : faire le controller
    hideFavoriteCrypto(form: any) {
        return ApiClient.put(baseURL + "/user_crypto/", form)
    }
    // TODO : faire le controller
    hideFavoriteFlux(form: any) {
        return ApiClient.put(baseURL + "/flux_article_users/", form)
    }
}
