import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { ProfileComponent } from './profile/profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './guards/auth-guard.service';
import { RegistrationGuard } from './guards/registration-guard.service';
import { CreateSubComponent } from './create-sub/create-sub.component';
import { GameComponent } from './game/game.component';
import { GameGuard } from './guards/game-guard.service';
import { ItemsComponent } from './items/items.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { SubTypeComponent } from './sub-type/sub-type.component';
import { SkillComponent } from './skill/skill.component';

const routes: Routes = [
  {path:'', component:ProfileComponent, canActivate:[RegistrationGuard]},
  {path:'registration', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'create-sub', component: CreateSubComponent},
  {path: 'game', component: GameComponent, canActivate: [GameGuard]},
  {path: 'items', component: ItemsComponent},
  {path: 'admin', component: AdminPanelComponent,children:[
    {path: 'create-sub-type', component:SubTypeComponent},
    {path: 'skills', component:SkillComponent}
  ]},  
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

