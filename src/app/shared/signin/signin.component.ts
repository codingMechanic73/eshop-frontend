import { Component, OnInit } from '@angular/core';
import { UserCredentials } from 'src/app/model/userCredentials';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  inputEmail: string;
  inputPassword: string;
  accountSuccess: number = 0;
  message: string;
  userCredentials = new UserCredentials()
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.userCredentials)
    this.authService.signin(this.userCredentials).subscribe(
      result => {
        console.log(result)
        this.accountSuccess = 1;
        this.message = result.message;

        this.authService.fetchUserDetails().subscribe(response => {
          console.log(response), eror => {
            console.log(eror);
          }
        })

      }, (error) => {
        this.accountSuccess = -1;
        console.log(error);
        this.message = error ? error : "No network";
      }
    );


  }

}
