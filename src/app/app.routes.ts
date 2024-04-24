import { Routes } from '@angular/router';
import { AuthComponent } from './Layouts/auth/auth.component';
import { LoginComponent } from './Views/Auth/login/login.component';
import { RegisterComponent } from './Views/Auth/register/register.component';
import { CodeComponent } from './Views/Auth/code/code.component';
import { MenuComponent } from './Layouts/menu/menu.component';
import { HomeComponent } from './Views/principal/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children:[
            {
                path: '',
                component: LoginComponent
            },
            {
                path: 'register',
                component: RegisterComponent
            },
            {
                path: 'code-verify',
                component: CodeComponent
            },
        ]
    },
    {
        path: 'home',
        component: MenuComponent,
        children: [
            {
                path: '',
                component: HomeComponent
            }
        ]
    }
];
