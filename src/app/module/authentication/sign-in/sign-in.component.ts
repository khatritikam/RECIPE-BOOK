import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent  implements OnInit{
  hide = true;
  signInForm: FormGroup

  constructor(
    private userService: UserService,
    private router:Router,
    private snackBarService: CoreService,
    private AuthService:AuthService
  ){}

  ngOnInit(): void {
    this.createFormGroup()
  }

  createFormGroup(){
    this.signInForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    })
  }

  signIn(){
    if(this.signInForm.valid){
      this.userService.getUser().subscribe({
        next:(val:any) =>{
          const user = val.find((a:any)=>{
            return a.email === this.signInForm.value.email && a.password === this.signInForm.value.password
          })
          if(user){
            this.signInForm.reset()
            this.snackBarService.openSnackBar('Sign In successfully','Ok')
            // console.log(user)
            this.AuthService.setLoginedUser(user)
            this.router.navigate(['home'])

          }else{
            this.snackBarService.openSnackBar('User Not Fund','Ok')
          }
        },error:(err:any) =>{
          console.log(err)
        }
      })
    }
  } 
}
