import { Routes } from '@angular/router';
import { AuthComponent } from './Layouts/auth/auth.component';
import { LoginComponent } from './Views/Auth/login/login.component';
import { RegisterComponent } from './Views/Auth/register/register.component';
import { AuthGuard } from './Guards/Auth/auth.guard';
import { DesauthGuard } from './Guards/Desauth/desauth.guard';

export const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        canActivate: [DesauthGuard],
        children:[
            {
                path: '',
                component: LoginComponent,
            },
            {
                path: 'register',
                component: RegisterComponent,
            }
        ]
    }
];
