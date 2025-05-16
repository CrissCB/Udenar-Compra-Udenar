import { Routes } from '@angular/router';
import { CallbackComponent } from './auth/callback/callback.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    {path: 'callback', component: CallbackComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: '*', redirectTo: '/dashboard'}
];