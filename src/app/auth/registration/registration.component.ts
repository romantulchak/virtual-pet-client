import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public user: User = new User();
  public isSuccessful:boolean = false;
  public isSignUpFailed:boolean = false;
  public errorMessage:string = '';
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  public registration(): void{
    this.authService.registration(this.user).subscribe(
      res=>{
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        window.location.href = '/';
      },
      error=>{
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
