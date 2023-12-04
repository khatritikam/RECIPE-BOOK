import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipeModel';
import { RecipeService } from '../services/recipe.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { filter, map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddRecipesComponent } from '../add-recipes/add-recipes.component';
import { RecipeDeleteComponent } from '../recipe-delete/recipe-delete.component';
import { UserService } from '../../authentication/service/user.service';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit{

  public recipes:any
  public filterFormGroup: FormGroup
  public categories: any  
  public asecending:boolean = true 
  isFavorite = false;

  constructor(
    private recipeService:RecipeService,
    private userService: UserService,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.createFilterForm();
    this.getRecipes()
    this.getCategory()
  }

getCategory(){
  this.categories = this.recipeService.getRecipeCategory()
} 

  createFilterForm(){
    this.filterFormGroup = new FormGroup({
      search: new FormControl(''),
      sort: new FormControl(''),
      category: new FormControl('')
    })
  }


  getRecipes(){
    this.recipeService.getRecipes().subscribe((data) => {
      console.log(data)
    })
    this.recipes = this.recipeService.getRecipes()
  }

  goToDetailPage(event: any){
    const params = {
      id: event.id
    }
 }

  applyFilter(){
    console.log(this.filterFormGroup.value)
    const search = this.filterFormGroup.get('search')?.value
    const category = this.filterFormGroup.get('category')?.value
    if(search !== '' && category !== ''){
      let categoryFilter = this.recipeService.getRecipes().pipe(
        map(users => users.filter((user:any) => user.category.toLowerCase().includes(category.toLowerCase())))
      )
      this.recipes = categoryFilter.pipe(
        map(users => users.filter((user:any) => user.name.toLowerCase().includes(search.toLowerCase())))
      )
    }
    if(search !== ''){
      this.recipes = this.recipeService.getRecipes().pipe(
        map(users => users.filter((user: any) => user.name.toLowerCase().includes(search.toLowerCase()))))
    }
    if(category !== ''){
      this.recipes = this.recipeService.getRecipes().pipe(
        map(users => users.filter((user: any) => user.category.toLowerCase().includes(category.toLowerCase()))))
    }
  }

  sortRecipesByName(){
   if(this.asecending !== false){
    this.recipes = this.recipeService.getRecipes().pipe(
      map(recipes => recipes.sort((a: { name: string; },b: { name: any; }) => a.name.trim().toLowerCase().localeCompare(b.name.trim().toLowerCase())))
    )
    this.asecending = false
    console.log(this.asecending)
   } 
   else{
    this.recipes = this.recipeService.getRecipes().pipe(
      map(recipes => recipes.sort((a: { name: string; },b: { name: any; }) => b.name.trim().toLowerCase().localeCompare(a.name.trim().toLowerCase())))
    )
    this.asecending = true
   }
   
  }

  reset(){
    this.recipes = this.recipeService.getRecipes()
    console.log(this.recipes)
  }

  addYourRecipe(){
    const dialogref = this.dialog.open(AddRecipesComponent,{
      width:'500px'
    })
    dialogref.afterClosed().subscribe({
      next:(val) =>{
        if(val) {
          this.recipes =this.recipeService.getRecipes()
        }
      }
    })
  }

  deleteRecipe(id: any){
    const deleteConfirm = this.dialog.open(RecipeDeleteComponent,{
      width:'250px',
      data:{id}
    })
    deleteConfirm.afterClosed().subscribe((res) =>{
      if(res) {
       this.recipes = this.recipeService.getRecipes()
      }
    })
  }

  onFavoriteChange(favoriteId: any) {
    localStorage.setItem('favoriteRecipe', JSON.stringify(favoriteId))
    this.userService.getUserbyId((localStorage.getItem('userId'))).subscribe((data) => {
      let setToSubmit = data
      setToSubmit['favoriteRecipe'] = favoriteId
      this.userService.updateUserFavoriterecipe(Number(localStorage.getItem('userId')), setToSubmit).subscribe((data) =>{
         this.recipes = this.recipeService.getRecipes()
      })
    })
    console.log('Favorite status changed:', favoriteId);
  }
}
