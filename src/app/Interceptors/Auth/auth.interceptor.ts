import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../../Services/Auth/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private route: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getToken();


    if (this.shouldExclude(req)) {
      return next.handle(req);
    }

    if (authToken) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
          'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
          'Pragma': 'no-cache',
          'Expires': '0',
        }, 
        setParams: {
          '_': Date.now().toString()
        }
      });
      console.log(req)
      console.log('interceptor')
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.resetAll()
          this.route.navigate(['/']).then(()=> {
            if (typeof window !== 'undefined') {
              alert('Sesión cerrada correctamente');
            } else {
              console.error('Error de autenticación', error);
            }
          }
          );
        } 
        return throwError(() => error);
      })
    );

  }

  private shouldExclude(req: HttpRequest<any>): boolean {
    const excludedPaths = ['/', '/login', '/register']; 
    return excludedPaths.some(path => req.url.endsWith(path));
  }

}

export const authInterceptorProvider: Provider =
{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true };



