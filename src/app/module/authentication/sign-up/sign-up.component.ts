import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { mustMatch } from 'src/app/validators/passwordMatch';
import { ValidationMsgService } from 'src/app/services/validation-msg.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit{
  hide = true;
  signUpForm: FormGroup;
  public validationMsg: any;

  StrongPasswordRegx: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

  constructor(
    private validationMsgService: ValidationMsgService,
    private userService: UserService,
    private router:Router,
    ){}

    ngOnInit(): void {
      this.createFormGroup()
      this.validationMsgService.setBranchName('signUp')
      this.validationMsg = this.validationMsgService.getControlMsg('signIn')
    }

    createFormGroup(){
      this.signUpForm = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.pattern(this.StrongPasswordRegx)]),
      confirmPassword: new FormControl(null, [Validators.required])
    }, { validators: mustMatch('password', 'confirmPassword')}
    )
    }

    onSignUp(){
      if(this.signUpForm.valid){
        this.userService.addUser(this.signUpForm.value).subscribe({
          next:(val:any) =>{
            this.signUpForm.reset()
            this.router.navigateByUrl('')
          },
          error:(err:any) => {
            console.log(err)
          }
        })
      }
    }
}
