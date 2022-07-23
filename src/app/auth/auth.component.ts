import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
// import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
// import { AuthResponseData, AuthService } from "./auth.service";
import * as fromApp from '../store/app.reducer';
import * as AuthAction from '../auth/store/auth.actions'

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    private storeSub: Subscription;

    constructor(
          private store: Store<fromApp.AppState>
          ) { }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onHandleError() {
        this.store.dispatch(new AuthAction.ClearError());
    }

    ngOnInit(): void {
        this.storeSub = this.store.select('auth').subscribe(authState => {
            this.isLoading = authState.loading;
            this.error = authState.authError;
            if (this.error) {
                this.error = authState.authError;
            }
        })
    }

    ngOnDestroy(): void {
        if(this.storeSub){
            this.storeSub.unsubscribe();
        }
    }

    onSubmit(form: NgForm) {
        if (form.invalid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;

        this.isLoading = true;

        if (this.isLoginMode) {
            this.store.dispatch(
                new AuthAction.LoginStart({
                    email: email,
                    password: password,
                })
            );
        }
        else {
            this.store.dispatch(
                new AuthAction.SignupStart({ 
                    email: email, 
                    password: password 
                })
            );
        }
    }
}