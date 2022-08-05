import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class dropdownDirective implements OnInit {
  @HostBinding('class.open') class = false;

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {}

  @HostListener('click') clickBtn(eventData: Event) {
    this.class = !this.class;
  }
}
