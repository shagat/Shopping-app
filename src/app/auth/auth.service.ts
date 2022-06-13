import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

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
            }).pipe(catchError(errorRes => {
                let errorMsg = 'Unexpected error occured!';
                if (!errorRes.error || !errorRes.error.error) {
                    return throwError(errorMsg);
                }
                switch (errorRes.error.error.message) {
                    case 'EMAIL_EXISTS':
                        errorMsg = 'This email is already in use.';
                }
                return throwError(errorMsg)
            }));
    }
}