import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import { MatDialog } from '@angular/material/dialog';
import { AddRecipesComponent } from '../add-recipes/add-recipes.component';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit{
  recipe:any;
  recipeId:any;
  recipeCategory:any
  RouteParmObs:any;
  recipes:any

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService:RecipeService,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.RouteParmObs = this.activatedRoute.paramMap.subscribe((param) =>{
      this.recipeId = param.get('id')
      this.recipeCategory = param.get('category')
      console.log(this.recipeCategory)
      this.getRecipe()
    })
    
    
  }

  getRecipe(){
    this.recipeService.getRecipes().subscribe({
      next:(val:any) => {
        this.recipe = val.find((recipe: { id: any; }) => recipe.id == this.recipeId)
        this.recipes = val.filter((recipe: any) => recipe.category === this.recipeCategory && recipe.id != this.recipeId )
      },error: (err: any) => {
        console.log(err)  
      }
    })
  }

  editRecipe(data:any){ 
      const dialogref = this.dialog.open(AddRecipesComponent,{
        width: '500px',
        data:data
      })
      dialogref.afterClosed().subscribe({
        next:(val) => {
          this.getRecipe()
        }
      })
      
  }

  goToDetailPage(event: any){
    const params = {
      id: event.id
    }
 }

 printRecipe(){
  window.print()
 }  
}
