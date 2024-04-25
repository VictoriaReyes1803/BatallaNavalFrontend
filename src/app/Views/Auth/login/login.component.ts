import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from '../../../Models/user';
import { UserServicesService } from '../../../Services/UserService/user-service.service';
import { GlobalLoaderComponent } from '../../../Components/GlobalLoader/globalloader/globalloader.component';
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import { CodeVerifyComponent } from '../code/code.component';
import { AlertComponentComponent } from '../../../Components/Alert/alert-component/alert-component.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    GlobalLoaderComponent,
    NgIf,
    KeyValuePipe,
    NgForOf,
    CodeVerifyComponent,
    AlertComponentComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    isSubmitting = false;
    backendErrors: any;
    backendErrorMessage: any;
    modalTitle = 'Recover Password';
    modalMessage = 'Make sure to have access to your email to recover your password';
    showModal = false;
    email = ''
    password = ''
    verifycode = false
    message: string = '';
    mostrarAlerta: boolean = false;

    public notfound = false;
    public error = false;
    public passwordVerify = false;
  
    constructor(
        private router:Router,
        private userService: UserServicesService,
    ){}

    register(){
        this.router.navigate(['/register'])
    }

    loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });

    cancel(){
      this.email = ''
      this.password = ''
      this.verifycode = false
      this.showAlert("Login again to obtain a new code");
    }

    onSubmit(){
      this.notfound = false;
      this.error = false;
      this.passwordVerify = false;
      this.isSubmitting = true;

      const user: UserLogin = {
        email: this.loginForm.value.email || '',
        password: this.loginForm.value.password || ''
      }

      this.userService.login(user).subscribe(
        data => {
          this.email = user.email
          this.password = user.password
          this.verifycode = true
          this.isSubmitting = false;

        },
        err => {
          this.isSubmitting = false;

          if (err.error.errors){
            this.backendErrors = err.error.errors
          }else if (!err.error.success){
            this.backendErrorMessage = err.error.message
          }
          
          if (err.status == 404){
            this.notfound = true;
          } else if(err.status == 401) {
            this.passwordVerify = true;
          } else if(err.status == 403) {
            alert('You have yet to verify your email by the link sent to your email')
          } else {
            this.error = true
          }
          
        }
      )
    }

  showAlert(message: string ){
    this.message = message;
    this.mostrarAlerta = true;
    setTimeout(() => {
       this.mostrarAlerta = false;
    }
    , 10000);
  }
  
    closeModal(){
        this.showModal = false;
    }
}
