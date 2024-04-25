import { Routes } from '@angular/router';
import { AuthComponent } from './Layouts/auth/auth.component';
import { LoginComponent } from './Views/Auth/login/login.component';
import { RegisterComponent } from './Views/Auth/register/register.component';
import { CodeVerifyComponent } from './Views/Auth/code/code.component';
import { DesauthGuard } from './Guards/Desauth/desauth.guard';
import { AuthGuard } from './Guards/Auth/auth.guard';
import { MenuGame } from './Views/MenuGame/menugame/menugame.component';
import { TableroComponent } from './Views/Tablero/tablero/tablero.component';
import { HistoryDataComponent } from './Views/HistoryData/historydata/historydata.component';
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
                component: CodeVerifyComponent
            }
        ]
    }, 
    {
        path: 'MenuGame',
        component: MenuGame,
        canActivate: [AuthGuard]
    },
    {
        path: 'historial',
        component: HistoryDataComponent,
        canActivate: [AuthGuard]
    }, 
    {
        path: 'Tablero',
        component: TableroComponent,
//        canActivate: [AuthGuard]
    }
];
