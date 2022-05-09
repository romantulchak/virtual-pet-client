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
import { authInterceptorProviders } from './helpers/auth.interceptor';
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
import {MatMenuModule} from '@angular/material/menu';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {MatIconModule} from '@angular/material/icon';
import { SubtypeListComponent } from './subtype-list/subtype-list.component';
import {MatTableModule} from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

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
    SubtypeListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    DragDropModule,
    MatTooltipModule,
    MatMenuModule,
    CdkAccordionModule,
    MatIconModule,
    MatTableModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [AuthGuard, RegistrationGuard, GameGuard, authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
