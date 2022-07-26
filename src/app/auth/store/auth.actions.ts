import { createAction, props } from "@ngrx/store"


export const AuthenticateSuccess = createAction(
    '[Auth] Authenticate Success',
    props<{
        email: string;
        uderId: string;
        token: string;
        expirationDate: Date;
        redirect: boolean;
    }>()
)

export const LoginStart = createAction(
    '[Auth] Login Start',
    props<{
        email: string;
        password: string
    }>()
);

export const Logout = createAction(
    '[Auth] Logout',
);


export const AuthenticateFail = createAction(
    '[Auth] Authenticate Fail',
    props<{
        errorMessage: string;
    }>()
)

export const SignupStart = createAction(
    '[Auth] Signup Start',
    props<{
        email: string;
        password: string;
    }>()
)

export const AutoLogin = createAction(
    '[Auth] Auto Login',
)

export const ClearError = createAction(
  '[Auth] Clear Error',
)

