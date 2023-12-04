import { Injectable } from '@angular/core';
import { validation_msg } from '../utilities/validationMsg';

@Injectable({
  providedIn: 'root'
})
export class ValidationMsgService {

  private branchName: string;
  public allValMessages: any

  constructor() { 
    this.allValMessages = validation_msg
  }

  setBranchName(name: string){
    //console.log(name)
    this.branchName = name
   //console.log(this.branchName)
  }
  
  getMessages(){
      //console.log(this.allValMessages[this.branchName])
      return this.allValMessages[this.branchName]
    }
  
  getControlMsg(controlName: string){
      const branchMsg =  this.getMessages()
      //console.log(branchMsg[controlName])
      return branchMsg[controlName]
    }
}
