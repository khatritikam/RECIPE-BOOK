import { Component, Input, HostBinding, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipeModel';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RecipeCardComponent {
  @Input()
  recipes:Recipe

  @Output()
  recipeId = new EventEmitter<any>()
  @Output()
  delete = new EventEmitter<any>()

  @Input() isFavorite: boolean;
  @Output() favoriteChange = new EventEmitter<boolean>();

  @HostBinding('class')
  public hostClass = 'app-recipe-card'

  public userFavoriteRecipeId =  localStorage.getItem('favoriteRecipe') ?? 0

  constructor(
    private routes:Router
  ){}

  showDetails(recipe:Recipe){
    this.recipeId.emit(recipe)
    this.routes.navigate(['home/recipes/details',recipe.category, recipe.id])
  }

  deleteRecipe(recipeId: any){
    this.delete.emit(recipeId)
  }

  toggleFavorite(recipeId: any) {
    this.isFavorite = !this.isFavorite;
    this.favoriteChange.emit(recipeId);
  }

}
