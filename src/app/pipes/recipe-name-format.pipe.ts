import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recipeNameFormat'
})
export class RecipeNameFormatPipe implements PipeTransform {

  transform(value: string): any {
    return value.toUpperCase()
  }

}
