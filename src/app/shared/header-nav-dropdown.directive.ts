import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHeaderNavDropdown]'
})
export class HeaderNavDropdownDirective {

  constructor(private el: ElementRef) { }

  toggle() {
    this.el.nativeElement.classList.toggle('open');
  }
}

/**
* Allows the dropdown to be toggled via click.
*/
@Directive({
  selector: '[appHeaderNavDropdownToggle]'
})
export class HeaderNavDropdownToggleDirective {
  constructor(private dropdown: HeaderNavDropdownDirective) {}

  @HostListener('click', ['$event'])
  toggleOpen($event: any) {
    $event.preventDefault();
    this.dropdown.toggle();
  }
}

export const HEADER_NAV_DROPDOWN_DIRECTIVES = [HeaderNavDropdownDirective, HeaderNavDropdownToggleDirective];
