import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { ProfileComponent } from './profile/profile.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './guards/auth-guard.service';
import { RegistrationGuard } from './guards/registration-guard.service';
import { CreateSubComponent } from './create-sub/create-sub.component';
import { AuthInterceptor, authInterceptorProviders } from './helpers/auth.interceptor';
import { GameComponent } from './game/game.component';
import { GameGuard } from './guards/game-guard.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ProfileComponent,
    NotFoundComponent,
    CreateSubComponent,
    GameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard, RegistrationGuard, GameGuard, authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
