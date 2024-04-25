import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import { importProvidersFrom } from '@angular/core';
import { routes } from './app.routes';
import { authInterceptorProvider } from './Interceptors/Auth/auth.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(HttpClientModule),
    authInterceptorProvider
  ]
};
