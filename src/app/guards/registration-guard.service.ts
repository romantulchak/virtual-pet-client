import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {TokenStorageService} from '../services/token-storage.service';
import { Observable } from 'rxjs';

@Injectable()
export class RegistrationGuard implements CanActivate{

    constructor(private authService: TokenStorageService, private router: Router){}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{

        if(this.authService.getUser() == null){
            
            this.router.navigate(['/login']);
            return false;
        }else{
            return true;
        }

    }

}