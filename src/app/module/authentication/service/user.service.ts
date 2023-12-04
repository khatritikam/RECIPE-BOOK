import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isSignIn = new BehaviorSubject<boolean>(false)
  constructor(
    private http:HttpClient
  ) { }

  addUser(data:any): Observable<any> {
    return this.http.post('http://localhost:3000/user', data);
  }

  getUser():Observable<any>{
    return this.http.get('http://localhost:3000/user')
  }

  getUserbyId(id: any): Observable<any> {
    return this.http.get(`http://localhost:3000/user/${id}`)
  }

  updateUserFavoriterecipe(id: number, data: any){
    return this.http.put(`http://localhost:3000/user/${id}`,data)
  }
}
