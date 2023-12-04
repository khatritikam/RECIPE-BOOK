import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-delete',
  templateUrl: './recipe-delete.component.html',
  styleUrls: ['./recipe-delete.component.scss']
})
export class RecipeDeleteComponent {
  
  constructor(
    public dialogRef:MatDialogRef<RecipeDeleteComponent>,
    private recipeService :RecipeService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ){}

  confirmDelete(){
      this.recipeService.deleteRecipe(this.data.id).subscribe(()=>{
        this.dialogRef.close(this.data.id)
      })
  }
}
