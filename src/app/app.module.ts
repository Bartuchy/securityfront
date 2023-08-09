import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgxWebstorageModule } from "ngx-webstorage";
import { HomeComponent } from './home/home.component';
import { LoginComponent } from "./auth/login/login.component";
import { RouterLink, RouterModule, RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import { TokenInterceptor } from "./token-interceptor";
import { AppRoutingModule } from "./app-routing.module";
import { SignupComponent } from "./auth/signup/signup.component";
import { provideToastr, ToastrModule, ToastrService } from "ngx-toastr";
import { BrowserAnimationsModule, provideAnimations } from "@angular/platform-browser/animations";
import { QrAuthComponent } from './auth/login/qr-auth/qr-auth.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        HeaderComponent,
        SignupComponent,
        QrAuthComponent
    ],
    imports: [
        BrowserModule,
        NgbModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        NgxWebstorageModule.forRoot(),
        RouterOutlet,
        RouterLink,
        RouterModule,
        AppRoutingModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        ToastrService,
        provideAnimations(),
        provideToastr(),
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
