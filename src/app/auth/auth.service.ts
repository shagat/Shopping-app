import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean

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
            }).pipe(catchError(this.handleError));
    }

    login(email: string, password: string) {
        return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBaxXiNtuw10_zpilx0uCQQn5aMChSxPKQ', {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMsg = 'Unexpected error occured!';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMsg);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMsg = 'This email is already in use.';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMsg = 'This email is not valid.';
                break;
            case 'INVALID_PASSWORD':
                errorMsg = 'The password is incorrect.';
                break;
        }
        return throwError(errorMsg)
    }
}