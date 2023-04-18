const baseURL = process.env.NEXT_PUBLIC_API_URL;
import axios from 'axios';

export default class AuthServices {

  login(user: { email: string; password: string; }) {
    return axios.post(baseURL + '/login_check', user);
  }

  loginOAuth() {
    return axios.post('http://localhost:8082/connect/google');
  }

  register(user: { name: string; lastname: string; username: string; email: string; password: string; }) {
    return axios.post(baseURL + '/users', user);
  }
}
