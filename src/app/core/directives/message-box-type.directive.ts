import { Directive, ElementRef, Input, OnInit, DoCheck, Renderer2 } from '@angular/core';
import { Constants } from '../constants/constants';

@Directive({
  selector: '[messageBoxType]'
})
export class MessageBoxTypeDirective implements OnInit, DoCheck {
  @Input() messageBoxType: string;

  constructor(private el: ElementRef, private renderer: Renderer2) { }
  ngOnInit() {
  }
  ngDoCheck() {
    this.assignMessageType(this.messageBoxType);
  }
  private assignMessageType(type) {
    switch (type) {
      case Constants.MESSAGE_ERROR:
        this.renderer.addClass(this.el.nativeElement, 'message-box--error');
        break;
      case Constants.MESSAGE_ERROR_LOGIN:
        this.renderer.addClass(this.el.nativeElement, 'message-box--error-login');
        break;        
      case Constants.MESSAGE_WARNING:
        this.renderer.addClass(this.el.nativeElement, 'message-box--warning');
        break;
      case Constants.MESSAGE_SUCCESS:
        this.renderer.addClass(this.el.nativeElement, 'message-box--success');
        break;
      default:
        break;
    }
  }
}
