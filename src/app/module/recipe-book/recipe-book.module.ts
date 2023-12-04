import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeBookRoutingModule } from './recipe-book-routing.module';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { AddRecipesComponent } from './add-recipes/add-recipes.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { RecipeService } from './services/recipe.service';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CoreService } from 'src/app/services/core.service';
import {MatIconModule} from '@angular/material/icon';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import {MatDialogModule} from '@angular/material/dialog';
import { RecipeDeleteComponent } from './recipe-delete/recipe-delete.component';
import { HighlightDirective } from 'src/app/directives/highlight.directive';
import { RecipeNameFormatPipe } from 'src/app/pipes/recipe-name-format.pipe';
import { RecipeingredientsFormatPipe } from 'src/app/pipes/recipeingredients-format.pipe';
import { FavoriteFadeDirective } from 'src/app/directives/favorite-fade.directive';
import { ConfirmFavoriteComponent } from './confirm-favorite/confirm-favorite.component';
import { UserService } from '../authentication/service/user.service';



@NgModule({
  declarations: [
    RecipeListComponent,
    AddRecipesComponent,
    RecipeCardComponent,
    RecipeDetailsComponent,
    RecipeDeleteComponent,
    HighlightDirective,
    RecipeNameFormatPipe,
    RecipeingredientsFormatPipe,
    FavoriteFadeDirective,
    ConfirmFavoriteComponent,
  ],
  imports: [
    CommonModule,
    RecipeBookRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule
  ],
  providers:[RecipeService,CoreService, UserService]
})
export class RecipeBookModule { }
