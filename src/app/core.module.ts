import { NgModule } from "@angular/core";
import { RecipeService } from "../old_services/recipe.service";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

@NgModule({
    providers: [
        { provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService, 
            multi: true 
           }
       ]
    }
    )
export class CoreModule {
}