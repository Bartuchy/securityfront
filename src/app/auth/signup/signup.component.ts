import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
import { SignupRequestModel } from './signup.request.model';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    signupRequestModel!: SignupRequestModel;
    signupForm!: FormGroup;

    constructor(private authService: AuthService,
                private formBuilder: FormBuilder,
                private router: Router,
                private toastr: ToastrService) {
        this.signupRequestModel = {
            name: '',
            surname: '',
            email: '',
            password: '',
            using2FA: false
        };
    }

    ngOnInit(): void {
        this.signupForm = this.formBuilder.group({
            name: new FormControl('', [
                Validators.required,
                Validators.pattern("[a-zA-z]{3,20}*")
            ]),
            surname: new FormControl('', [
                Validators.required,
                Validators.pattern("[a-zA-z]{0,20}*")
            ]),
            email: new FormControl('', [
                Validators.required,
                Validators.email
            ]),
            password: new FormControl('', [
                Validators.required,
                Validators.pattern("/^(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/")
            ]),
            using2FA: new FormControl(false, [])
        })
    }

    signup() {
        this.signupRequestModel = {
            name: this.signupForm.get('name')?.value,
            surname: this.signupForm.get('surname')?.value,
            email: this.signupForm.get('email')?.value,
            password: this.signupForm.get('password')?.value,
            using2FA: this.signupForm.get('using2FA')?.value
        }
        this.sendSignupRequest()
    }

    private sendSignupRequest(): void {
        this.authService.signup(this.signupRequestModel)
            .subscribe({
                next: () => {
                    this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
                },
                error: () => {
                    this.toastr.error('User with this data already exists! Try another email or username');
                }
            });
    }

    getName() {
        return this.signupForm.get('name');
    }
}
