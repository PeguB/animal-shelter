import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TopBarComponent} from './component/top-bar/top-bar.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {LoginComponent} from './component/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatGridListModule} from "@angular/material/grid-list";
import {RegisterComponent} from './component/register/register.component';
import {AlertComponent} from './component/alert/alert.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {HttpClientModule} from "@angular/common/http";
import {PetsComponent} from './pages/petsPage/pets.component';
import {MatInputModule} from "@angular/material/input";
import {PetCardComponent} from './component/pet-card/pet-card.component';
import {MatCardModule} from "@angular/material/card";
import {MyDialogComponent} from "./component/pet-card/dialogAnimation.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MyDialogNotLoggedInComponent} from "./component/pet-card/dialogForNotLoggedIn.component";
import {FooterComponent} from './component/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    PetsComponent,
    PetCardComponent,
    MyDialogComponent,
    MyDialogNotLoggedInComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatCardModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
