import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form = {
    username: '',
    password: ''
  }
  public isLoginFailed = false;
  public errorMessage = '';
  private roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getUser().roles;
      window.location.href = "/";
    }
  }

  public login(): void{
    this.authService.login(this.form).subscribe(
      res=>{
        this.tokenStorage.saveToken(res.token);
        this.tokenStorage.saveUser(res);
        this.isLoginFailed = false;
        this.roles = this.tokenStorage.getUser().roles;
        window.location.href = "/";
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
}
