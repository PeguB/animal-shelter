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
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {PetsComponent} from './pages/petsPage/pets.component';
import {MatInputModule} from "@angular/material/input";
import {PetCardComponent} from './component/pet-card/pet-card.component';
import {MatCardModule} from "@angular/material/card";
import {QuestionForAdoptionDialog} from "./component/pet-card/dialogAnimation.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MyDialogNotLoggedInComponent} from "./component/pet-card/dialogForNotLoggedIn.component";
import {FooterComponent} from './component/footer/footer.component';
import {ChoseDateDialogComponent} from "./component/pet-card/choseDateDialog";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {DatePipe} from "@angular/common";
import {TokenInterceptor} from "./interceptors/TokenInterceptor";
import {HomeComponent} from './pages/homePage/home.component';
import {AdoptionsComponent} from './pages/adminPanel/adoptions.component';
import {UserAdoptionsComponent} from './pages/adoptionsPage/user-adoptions.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    PetsComponent,
    PetCardComponent,
    MyDialogNotLoggedInComponent,
    FooterComponent,
    QuestionForAdoptionDialog,
    MyDialogNotLoggedInComponent,
    ChoseDateDialogComponent,
    HomeComponent,
    AdoptionsComponent,
    UserAdoptionsComponent
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
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
