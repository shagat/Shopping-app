import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";

import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";
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

    constructor(private dataStorageService: DataStorageService, private authService: AuthService, private store: Store<fromApp.AppState>) { }

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
        this.dataStorageService.storeRecipes();
    }

    onFetchData() {
        // this.dataStorageService.fetchRecipes().subscribe();
        this.store.dispatch(new RecipeAction.FetchRecipes());
    }

    onLogout() {
        // this.authService.logout();
        this.store.dispatch(new AuthAction.Logout());
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }

}