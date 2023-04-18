import jwtDecode from 'jwt-decode';

const jwt = require("jsonwebtoken");

const TOKEN_KEY = 'auth-token';
const TOKEN_REFRESH_KEY = 'auth-token-refresh';
const USER_KEY = 'auth-user';


export class TokenStorageService {

    constructor() {
    }

    signOut(): void {
        window.localStorage.clear();
        window.sessionStorage.clear();
        window.localStorage.removeItem(USER_KEY);
        localStorage.removeItem('statutValue');
    }

    public saveToken(token: string): void {
        window.localStorage.setItem(TOKEN_KEY, token);
    }

    public removeToken(): void {
        window.localStorage.removeItem(TOKEN_KEY);
    }

    public removeRefreshToken(): void {
        window.localStorage.removeItem(TOKEN_REFRESH_KEY);
    }

    public saveRefreshToken(tokenRefresh: string): void {
        window.localStorage.setItem(TOKEN_REFRESH_KEY, tokenRefresh);
    }

    public getToken(): string | null {
        return window.localStorage.getItem(TOKEN_KEY);
    }

    public getRefreshToken(): string | null {
        return window.localStorage.getItem(TOKEN_REFRESH_KEY);
    }

    public saveUser(user: any): void {
        window.localStorage.removeItem(USER_KEY);
        window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    public getUser(): any {
        const user = window.localStorage.getItem(USER_KEY);
        if (user) {
            return JSON.parse(user);
        }
        return {};
    }

    public decodeToken(token: string): any {
        try {
            return jwtDecode(token)
        } catch (error) {
            console.log('👾 invalid token format', error);
            return false;
        }
    }

    public verifyToken(token: string): boolean {
        const key = process.env.NEXT_PUBLIC_API_PUBLIC
        try {
            jwt.verify(token, key);
            return true
        } catch (err) {
            return false
        }
    }
}
