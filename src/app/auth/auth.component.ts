import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";
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
        private authService: AuthService,
         private router: Router,
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

        // let authObs: Observable<AuthResponseData>;
        this.isLoading = true;

        if (this.isLoginMode) {
            //...Login
            // authObs = this.authService.login(email, password);
            this.store.dispatch(
                new AuthAction.LoginStart({
                    email: email,
                    password: password,
                })
            );
        }
        else {
            // authObs = this.authService.signup(email, password);
            this.store.dispatch(
                new AuthAction.SignupStart({ 
                    email: email, 
                    password: password 
                })
            );
        }
        // authObs.subscribe(responseData => {
        //     console.log(responseData);
        //     this.isLoading = false;
        //     this.router.navigate(['/recipes']);
        // },
        //     errorMsg => {
        //         console.log(errorMsg);
        //         this.error = errorMsg;
        //         this.isLoading = false;
        //     });

        // this.error = null;
        // form.reset();
    }
}