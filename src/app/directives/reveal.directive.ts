import { Directive, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  private observer?: IntersectionObserver;

  constructor(private readonly el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    const element = this.el.nativeElement;
    element.classList.add('reveal');

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
