import { Routes } from '@angular/router';
import { AuthComponent } from './Layouts/auth/auth.component';
import { LoginComponent } from './Views/Auth/login/login.component';
import { RegisterComponent } from './Views/Auth/register/register.component';
import { CodeComponent } from './Views/Auth/code/code.component';
import { MenuComponent } from './Layouts/menu/menu.component';
import { HomeComponent } from './Views/principal/home/home.component';
import { HistorialComponent } from './Views/principal/historial/historial.component';
import { DesauthGuard } from './Guards/Desauth/desauth.guard';
import { AuthGuard } from './Guards/Auth/auth.guard';
import {TableroComponent} from "./Views/Tablero/tablero/tablero.component";

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
                component: RegisterComponent
            },
            {
                path: 'code-verify',
                component: CodeComponent
            },
          {
            path: 'tablero',
            component: TableroComponent
          }
        ]
    },
    {
        path: 'home',
        component: MenuComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: HomeComponent
            },
            {
                path: 'historial',
                component: HistorialComponent
            }
        ]
    }
];
