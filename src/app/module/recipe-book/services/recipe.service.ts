import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(
    private http:HttpClient
  ) { }

  getRecipeCategory():Observable<any>{
    return this.http.get('http://localhost:3000/categories');
  }

  getRecipes():Observable<any>{
    return this.http.get('http://localhost:3000/recipes')
  }

  postRecipe(data:any):Observable<any>{
    return this.http.post('http://localhost:3000/recipes',data)
  }

  updateRecipe(id:number,data:any):Observable<any>{
    return this.http.patch(`http://localhost:3000/recipes/${id}`,data)
  }

  deleteRecipe(id: any):Observable<any>{
    return this.http.delete(`http://localhost:3000/recipes/${id}`)
  }
}
