import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, ElementRef, EventEmitter,ViewChild, Input, Output } from '@angular/core';
import { AuthService } from '../../../Services/Auth/auth.service';
import { AlertComponentComponent } from '../../../Components/Alert/alert-component/alert-component.component';
import { GlobalLoaderComponent } from '../../../Components/GlobalLoader/globalloader/globalloader.component';
import { UserServicesService} from '../../../Services/UserService/user-service.service';
import { UserLoginCode } from '../../../Models/user';

import {
  trigger,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';
import { Router } from '@angular/router';


@Component({
  selector: 'app-code-verify',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AlertComponentComponent,
    GlobalLoaderComponent
  ],
  templateUrl: './code.component.html',
  styleUrl: './code.component.css'
})
export class CodeVerifyComponent {
  constructor(
    private readonly DataSVuser: UserServicesService,
    private readonly AuthService: AuthService,
    private readonly router: Router,
  ) { }

  code = {
    code1: "",
    code2: "",
    code3: "",
    code4: "",
    code5: "",
    code6: ""
  };
  hasError: boolean = false;
  diableButtonEmail: boolean = false;
  success: boolean = false;
  disabledSumbitButton: boolean = false;
  codigo: string = "";
  loadingResend: boolean = false
  loadingVerify: boolean = false

  
  @ViewChild('code1') code1: ElementRef | undefined;
  @ViewChild('code2') code2: ElementRef | undefined;
  @ViewChild('code3') code3: ElementRef | undefined;
  @ViewChild('code4') code4: ElementRef | undefined;
  @ViewChild('code5') code5: ElementRef | undefined;
  @ViewChild('code6') code6: ElementRef | undefined;

  
  @Input() email: string = '';
  @Input() password: string = '';
  @Output() onCancel = new EventEmitter<void>();

  ngOnInit(){
    if(this.email === '' || this.password === ''){
      this.onCancel.emit();
    }
  }

  message: string = 'Usuario no existe';
  mostrarAlerta: boolean = false;

  cambiarFoco(inputNumber: number) {
    if (inputNumber >= 1 && inputNumber <= 6) {
      const currentInputKey = `code${inputNumber}` as keyof CodeVerifyComponent;
      const currentInputElement = this[currentInputKey] as ElementRef<HTMLInputElement>;
  
      let nextInputNumber: number;
  
      if (currentInputElement && currentInputElement.nativeElement.value.length > 0) {
        nextInputNumber = inputNumber + 1;
      } else {
        nextInputNumber = inputNumber - 1;
      }
  
      const nextInputKey = `code${nextInputNumber}` as keyof CodeVerifyComponent;
      const nextInputElement = this[nextInputKey] as ElementRef<HTMLInputElement>;
  
      if (nextInputElement) {
        nextInputElement.nativeElement.focus();
      }
    }
  }
  verifyCode() {
    this.hasError = false;
    this.loadingVerify = true;
    this.codigo = Object.values(this.code).join("");

    const user: UserLoginCode = {
      email: this.email || '',
      password: this.password || '',
      codigo: this.codigo
    }
    
    this.DataSVuser.login(user).subscribe(
      (res) => {
        this.success = true;
        this.diableButtonEmail = false;
        this.disabledSumbitButton = true;
        this.hasError = false;

        setTimeout(() => {
          this.AuthService.saveTokenResponse(res.jwt, res.data)
          this.router.navigate(['MenuGame'])
        }, 50);
      
      },
      (err) => {
        this.resetInputs()
        this.loadingVerify=false
        this.hasError = true;
        this.showAlert(err.error.msg); 
      }
    );
  }
  
  resendEmail() {
    this.onCancel.emit();
  }
  

  showAlert(message: string ){
    this.message = message;
    this.mostrarAlerta = true;
    setTimeout(() => {
      this.mostrarAlerta = false;
    }
    , 6000);
  }

  resetInputs(){
    this.code = {
      code1: "",
      code2: "",
      code3: "",
      code4: "",
      code5: "",
      code6: ""
    }
  }
}