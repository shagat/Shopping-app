import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AuthComponent } from "./auth.component";

@NgModule({
    declarations: [AuthComponent],
    imports: [
        SharedModule,
        RouterModule.forChild([
            { path: 'login', component: AuthComponent},  
        ])
    ]
})
export class AuthModule {}