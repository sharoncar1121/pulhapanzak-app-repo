import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'register-page',
    loadComponent: () => import('./auth/pages/register-page/register-page.page').then( m => m.RegisterPagePage)
  },
];
