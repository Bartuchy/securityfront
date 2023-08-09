import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { LoginRequestModel } from './login.request.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm!: FormGroup;
    loginRequestPayload: LoginRequestModel;
    isError?: boolean;
    registerSuccessMessage?: string;

    constructor(private authService: AuthService,
                private formBuilder: FormBuilder,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private toastr: ToastrService) {
        this.loginRequestPayload = {
            email: '',
            password: ''
        }
    }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.email],
            password: ['', [
                Validators.min(8),
                Validators.max(20),
                Validators.pattern('/^(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/')],
            ]
        });

        this.activatedRoute.queryParams.subscribe(params => {
            if (params['registered'] !== undefined && params['registered'] === 'true') {
                this.toastr.success('Signup Successful');
                this.registerSuccessMessage = 'You can log in now!';
            }
        });
    }

    login() {
        this.loginRequestPayload.email = this.loginForm.get('email')?.value;
        this.loginRequestPayload.password = this.loginForm.get('password')?.value;

        this.authService.using2FA(this.loginRequestPayload.email)

        this.authService.login(this.loginRequestPayload).subscribe({
            next: () => {
                this.router.navigateByUrl('/home');
            },
            error: () => {
                this.toastr.error('Something went wrong', 'Error');
            }
        });
    }

}
