import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;

}

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(private httpClient: HttpClient) { }

    signup(email: string, password: string) {
        return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key= AIzaSyBaxXiNtuw10_zpilx0uCQQn5aMChSxPKQ',
            {
                email: email,
                password: password,
                returnSecureToken: true
            });
    }
}