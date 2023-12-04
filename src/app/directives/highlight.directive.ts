import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(
    private el: ElementRef, 
    private renderer: Renderer2
  ) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.enlarge();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.resetSize();
  }

  private enlarge() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1.1)');
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.3s ease-in-out');
  }

  private resetSize() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1)');
  }
}
