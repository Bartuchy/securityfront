import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { QrAuthComponent } from "./auth/login/qr-auth/qr-auth.component";

const routes: Routes = [
    {
        path: '',
        component: AppComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'sign-up',
        component: SignupComponent
    },
    {
        path: 'home',
        //canActivate: [AuthGuard],
        component: HomeComponent
    },
    {
        path: 'qr-auth',
        component: QrAuthComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
