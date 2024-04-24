import { Routes } from '@angular/router';
import { AuthComponent } from './Layouts/auth/auth.component';
import { LoginComponent } from './Views/Auth/login/login.component';

export const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children:[
            {
                path: '',
                component: LoginComponent
            }
        ]
    }
];
