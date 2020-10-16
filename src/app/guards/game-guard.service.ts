import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SubHero } from '../models/subHero.model';
import { GameService } from '../services/game.service';

@Injectable()
export class GameGuard implements CanActivate{
  private hero: SubHero;
  constructor(private gameService: GameService, private router: Router){

  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
    this.gameService.currentHero.subscribe(
      res=>{
        this.hero = res;
      }
    );
    if(this.hero != null){
        return true;
    }
    this.router.navigate(['/']);
    return false;
}
}
