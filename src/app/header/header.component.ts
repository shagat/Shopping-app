import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";

import * as fromApp from '../store/app.reducer'
import * as AuthAction from '../auth/store/auth.actions'
import * as RecipeAction from '../recipes/store/recipe.actions'

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    private userSub: Subscription;
    isAuthenticated = false;
    collapsed = true;

    constructor(
        private store: Store<fromApp.AppState>) { }

    ngOnInit(): void {
        this.userSub = this.store.select('auth')
            .pipe(
                map(authState => {
                    return authState.user;
                }
                )
            )
            .subscribe(user => {
                this.isAuthenticated = !!user;
            })
    }

    onSaveData() {
        this.store.dispatch(new RecipeAction.StoreRecipes());
    }

    onFetchData() {
        this.store.dispatch(new RecipeAction.FetchRecipes());
    }

    onLogout() {
        this.store.dispatch(new AuthAction.Logout());
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }

}