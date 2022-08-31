import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { SigninFormComponent } from './signin-form/signin-form.component';
import {ChatBoxComponent} from './chat-box/chat-box.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginFormComponent
  },
  {
    path: "signin",
    component: SigninFormComponent
  },
  {
    path: "chattin",
    component: ChatBoxComponent
  },
  {
    path: "home",
    component: HomeComponent
  }

  // Ajouter la route de la page d'accueil
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
