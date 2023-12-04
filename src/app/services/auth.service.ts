import { Injectable } from '@angular/core';

interface User {
  id: number
  email:string
  password:string
  confirmPassword:string
  favoriteRecipe: any
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user : User
  isLogIn: boolean;
  constructor() { }

  setLoginedUser(logedUser: User) {
      localStorage.setItem('user', logedUser.email)
      localStorage.setItem('userId', JSON.stringify(logedUser.id))
      localStorage.setItem('favoriteRecipe', JSON.stringify(logedUser?.favoriteRecipe))
  }

  getUser(){
    return localStorage.getItem('user')
  }

  isLoggedIn(){
    const login = localStorage.getItem('user')
    if(login != undefined){
      return true
    } else{
      return false
    }
  }

  logOut(){
    localStorage.removeItem('user')
    localStorage.removeItem('userId')
  }

}
