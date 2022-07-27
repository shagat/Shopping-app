import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
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
        this.store.dispatch(AuthAction.clearError());
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
                AuthAction.loginStart({
                    email: email,
                    password: password,
                })
            );
        }
        else {
            this.store.dispatch(
                AuthAction.signupStart({
                    email: email,
                    password: password
                })
            );
        }
    }
}
