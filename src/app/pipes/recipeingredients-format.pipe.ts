import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recipeingredientsFormat'
})
export class RecipeingredientsFormatPipe implements PipeTransform {

  transform(ingredient: string): string {
    return ingredient.charAt(0).toUpperCase() + ingredient.slice(0,150).toLowerCase();
  }

}
