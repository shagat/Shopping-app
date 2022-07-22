import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

import { environment } from "src/environments/environment";
import * as AuthActions from './auth.actions';
import { of } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean

}

const handleError = ((errorRes: any) => {
    let errorMsg = 'Unexpected error occured!';
    if (!errorRes.error || !errorRes.error.error) {
        return of(new AuthActions.AuthenticateFail(errorMsg));
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
    return of(new AuthActions.AuthenticateFail(errorMsg));
})

const handleAuthentication = (
    expiresIn: number,
    email: string,
    userId: string,
    token: string) => {
    const expirationDate = new Date(
        new Date().getTime() + +expiresIn * 1000
    );
    return new AuthActions.AuthenticateSuccess({
        email: email,
        userId: userId,
        token: token,
        expirationDate: expirationDate
    });
}

@Injectable()
export class AuthEffects {
    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signupAction: AuthActions.SignupStart) => {
            return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseApiKey,
                {
                    email: signupAction.payload.email,
                    password: signupAction.payload.password,
                    returnSecureToken: true
                }).pipe(
                    map(resData => {
                        return handleAuthentication(
                            +resData.expiresIn,
                            resData.email,
                            resData.localId,
                            resData.idToken
                        )
                    }),
                    catchError(errorRes => {
                        //..
                        return handleError(errorRes);
                    })
                );
        })
    )

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseApiKey,
                {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }).pipe(
                    map(resData => {
                        return handleAuthentication(
                            +resData.expiresIn,
                            resData.email,
                            resData.localId,
                            resData.idToken
                        )
                    }),
                    catchError(errorRes => {
                        //..
                        return handleError(errorRes);
                    })
                );
        })
    );

    @Effect({ dispatch: false })
    authRedirect = this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS, AuthActions.LOGOUT), tap(() => {
            this.router.navigate(['/'])
        })
    );

    constructor(private actions$: Actions, private http: HttpClient, private router: Router) { }
}