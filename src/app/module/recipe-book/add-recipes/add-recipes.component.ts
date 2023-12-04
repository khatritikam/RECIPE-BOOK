import { Component, Inject, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CoreService } from 'src/app/services/core.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-recipes',
  templateUrl: './add-recipes.component.html',
  styleUrls: ['./add-recipes.component.scss']
})
export class AddRecipesComponent implements OnInit{
  categories:any;
  public url:string = './../../../../assets/demo.jpg';

  addRecipeForm:FormGroup

  constructor(
    private recipeService:RecipeService,
    private coreService:CoreService,
    private dialogref: MatDialogRef<AddRecipesComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ){}

  ngOnInit(): void {
    this.getCategory()
    this.createFormGroup()
    this.addRecipeForm.patchValue(this.data)

  }

  getCategory(){
    this.categories = this.recipeService.getRecipeCategory()
  } 

  createFormGroup(){
    this.addRecipeForm = new FormGroup({
      name:new FormControl(null,[Validators.required]),
      category:new FormControl(null, [Validators.required]),
      ingredients:new FormControl(null, [Validators.required]),
      instructions:new FormControl(null, [Validators.required]),
      image:new FormControl(null)
    })
  }

  addEditRecipes(){
    if(this.addRecipeForm.valid){
      if(this.data){
        this.recipeService.updateRecipe(this.data.id,this.addRecipeForm.value).subscribe({
          next: (val:any) =>{
            this.coreService.openSnackBar('Recipe Updated Successfully!', 'ok')
            this.dialogref.close(true);
          },error:(err:any) =>{
            console.log(err)
          }
        })
      }else{
      this.recipeService.postRecipe(this.addRecipeForm.value).subscribe({
      next:(val:any) =>{
        this.coreService.openSnackBar('Recipe Added Successfully', 'ok')
        this.dialogref.close(true);
      },
      error:(err:any) =>{
        console.log(err)
      }
      })}
    }
  }

  uploadImg(event:any){
    if(event.target.files[0]){
      let reader = new FileReader()
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event:any) =>{
       this.url = event.target.result;
      console.log(this.url)
      this.addRecipeForm.patchValue({image: event.target.result})
    }}}
}
