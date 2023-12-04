import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path:'auth',
    loadChildren: () => import('./module/authentication/authentication.module').then(module => module.AuthenticationModule),
    canLoad: [AuthGuard]
  }, 
  {
    path: 'home',
    loadChildren: () => import('./layout/layout.module').then((module) => module.LayoutModule),
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
