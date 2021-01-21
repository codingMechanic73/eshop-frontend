import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserDetails } from 'src/app/model/UserDetails';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  userDetails = new UserDetails();
  inputConfirmPassword: string;

  constructor(private authService: AuthService) { }
  accountSuccess: number = 0;
  message: string;

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log(this.userDetails);
    this.authService.createAccount(this.userDetails).subscribe(
      result => {
        if (result.userName) {
          this.accountSuccess = 1;
          this.message = "Successfully Registered!"
        }
      }, (error) => {
        this.accountSuccess = -1;
        this.message = error;
        console.log(error);
      }
    )
  }

}
