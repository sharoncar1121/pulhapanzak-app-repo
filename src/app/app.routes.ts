import { Routes } from '@angular/router';
import { AuthGuard } from './auth/services/auth.guard';
import { inject } from '@angular/core';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/ui/pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/ui/pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'gallery',
    loadComponent: () => import('./ui/pages/gallery/gallery.page').then( m => m.GalleryPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./ui/pages/profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'tabs',
    loadComponent: () => import('./ui/tabs/tabs.page').then( m => m.TabsPage)
  },

];
