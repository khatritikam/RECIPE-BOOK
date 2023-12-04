import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFavoriteFade]'
})
export class FavoriteFadeDirective {
  @Input() set appFavoriteFade(fevoriteRecipeId: any) {
    if (fevoriteRecipeId == localStorage.getItem('favoriteRecipe')) {
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '0.5'); 
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'opacity');
    }
  }
  constructor(
    private el: ElementRef, private renderer: Renderer2
  ) { }

}
