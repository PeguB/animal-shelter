import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AppComponent} from "./app.component";
import {PetsComponent} from "./pets/pets.component";

const routes: Routes = [
  {
    path: 'home',
    title: 'Lucky Paws Rescue - Home',
    component: AppComponent
  },
  {
    path: 'login',
    title: 'Lucky Paws Rescue - Login',
    component: LoginComponent
  },
  {
    path: 'register',
    title: 'Lucky Paws Rescue - Register',
    component: RegisterComponent
  },
  {
    path: 'pets',
    title: 'Lucky Paws Rescue - Pets',
    component: PetsComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
