import ApiClient from '../_interceptors/interceptor'
const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default class FluxServices {

    getAllFlux() {
        return ApiClient.get(baseURL + "/flux_articles");
    }

    getFluxById(id: string) {
        return ApiClient.get(baseURL + "/flux_articles/" + id);
    }

    createFlux(form: any) {
        return ApiClient.post(baseURL + "/flux_articles", form);
    }

    updateFlux(id: string, form: any) {
        return ApiClient.put(baseURL + "/flux_articles/" + id, form);
    }

    deleteFlux(id: string) {
        return ApiClient.delete(baseURL + "/flux_articles/" + id);
    }

    // TODO : faire le controller
    showFluxToHome(form: any) {
        return ApiClient.post(baseURL + "/flux_articles/", form);
    }
    // TODO : faire le controller
    hideFluxToHome(form: any) {
        return ApiClient.put(baseURL + "/flux_articles", form);
    }
}
