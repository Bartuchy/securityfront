import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { SignupRequestPayload } from '../../../../../recipes_front/src/app/auth/signup/signup-request-payload';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { LoginRequestPayload } from '../../../../../recipes_front/src/app/auth/login/login.request.payload';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginResponse } from '../../../../../recipes_front/src/app/auth/login/login.response.payload';
import { SignupRequestModel } from "../signup/signup.request.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  URL_PREFIX: string = 'http://localhost:8080/api/v1/auth';

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) { }

  signup(signupRequestModel: SignupRequestModel): Observable<any> {
     return this.httpClient.post(
       'http://localhost:8080/api/user/register',
        signupRequestModel,
        { responseType: 'text' },
      )
   }

   login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient.post<LoginResponse>(this.URL_PREFIX + '/authenticate',
      loginRequestPayload).pipe(map(_ => {
        this.localStorage.store('authenticationToken', _.token);
        this.localStorage.store('email', _.email);
        this.loggedIn.emit(true);
        return true;
      }));
   }

   using2FA(email: string): Observable<boolean> {
      return this.httpClient.get<boolean>(`http://localhost:8080/user/${email}/using2fa`);
   }

  getJwtToken() {
     return this.localStorage.retrieve('authenticationToken');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
}
