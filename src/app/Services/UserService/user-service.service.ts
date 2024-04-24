import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserLogin, UserRegister, LoginResponseInterface, statusInterface } from '../../Models/user';
import { environment } from '../../Enviroments/enviroments';
@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  constructor(private http: HttpClient) { }

  login(data: UserLogin): Observable<LoginResponseInterface>{
    return this.http.post<LoginResponseInterface>(environment.loginURL, data)
  }

  register(data: UserRegister){
    return this.http.post<UserRegister>(environment.registerURL, data)
  }

  authenticate(): Observable<statusInterface> {
    return this.http.get<statusInterface>(environment.authenticateURL)
  }

  logoutuser(): Observable<statusInterface>{
    return this.http.get<statusInterface>(environment.logoutURL)
  }
}

