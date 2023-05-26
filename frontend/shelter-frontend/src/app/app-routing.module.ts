import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./component/login/login.component";
import {RegisterComponent} from "./component/register/register.component";
import {PetsComponent} from "./pages/petsPage/pets.component";
import {HomeComponent} from "./pages/homePage/home.component";
import {AdoptionsComponent} from "./pages/adoptionsPage/adoptions/adoptions.component";

const routes: Routes = [
  {
    path: 'home',
    title: 'Lucky Paws Rescue - Home',
    component: HomeComponent
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
    path: 'adoptions',
    title: 'Lucky Paws Rescue - Adoptions',
    component: AdoptionsComponent
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
