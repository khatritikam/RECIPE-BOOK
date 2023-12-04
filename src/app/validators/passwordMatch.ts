import { AbstractControl, FormGroup, ValidatorFn } from "@angular/forms";

export function  mustMatch(password: string, confirmPassword: string):ValidatorFn {
        return (formGroup: AbstractControl):{ [key: string]: any } | null => {
          const passwordControl = formGroup.get(password);
          const confirmPasswordControl = formGroup.get(confirmPassword);
          
          if (!passwordControl || !confirmPasswordControl) {
            return null;
          }
    
          if (
            confirmPasswordControl.errors &&
            !confirmPasswordControl.errors["mustMatch"]
          ) {
            return null;
          }
    
          if (passwordControl.value !== confirmPasswordControl.value) {
            confirmPasswordControl.setErrors({ mustMatch: true });
            return { mustMatch: true }
          } else {
            confirmPasswordControl.setErrors(null);
            return null;
          }
        };
      }