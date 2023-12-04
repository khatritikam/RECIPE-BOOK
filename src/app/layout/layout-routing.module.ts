import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path:'',
    component:LayoutComponent,
    children:[
      {
        path:'',
        loadChildren: () => import('./../module/dashboard/dashboard.module').then(module => module.DashboardModule),
      },
      {
        path:'recipes',
        loadChildren: () => import('./../module/recipe-book/recipe-book.module').then(module => module.RecipeBookModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
