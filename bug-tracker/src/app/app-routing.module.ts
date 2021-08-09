import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/med-reg/home/home.component';
import { LoginComponent } from './views/med-reg/login/login.component';

const routes: Routes = [
  { path: 'signUp', component: LoginComponent },
  { path: 'home', loadChildren: () => import('./views/med-reg/home/home.module').then(m => m.HomeModule) },



  { path: '**', redirectTo: 'signUp' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
