import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatDialogModule} from "@angular/material/dialog";
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
import { GameTopPanelComponent } from './game-top-panel/game-top-panel.component';
import { GameBottomPanelComponent } from './game-bottom-panel/game-bottom-panel.component';
import { InventoryComponent } from './inventory/inventory.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemsComponent } from './items/items.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { CharacterCardComponent } from './character-card/character-card.component';
import { EnemyCardComponent } from './enemy-card/enemy-card.component';
import { FirendsDialogComponent } from './firends-dialog/firends-dialog.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { SubTypeComponent } from './sub-type/sub-type.component';
import { SkillComponent } from './skill/skill.component';
import { ShopComponent } from './shop/shop.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { SkillShopComponent } from './skill-shop/skill-shop.component';
import { ItemShopComponent } from './item-shop/item-shop.component';
import { HeroSkillsComponent } from './hero-skills/hero-skills.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ProfileComponent,
    NotFoundComponent,
    CreateSubComponent,
    GameComponent,
    GameTopPanelComponent,
    GameBottomPanelComponent,
    InventoryComponent,
    ItemsComponent,
    CharacterCardComponent,
    EnemyCardComponent,
    FirendsDialogComponent,
    AdminPanelComponent,
    SubTypeComponent,
    SkillComponent,
    ShopComponent,
    SkillShopComponent,
    ItemShopComponent,
    HeroSkillsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    DragDropModule,
    MatTooltipModule
  ],
  providers: [AuthGuard, RegistrationGuard, GameGuard, authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
