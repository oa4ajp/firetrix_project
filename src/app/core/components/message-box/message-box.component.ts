import { Component, Input, ElementRef, OnInit, DoCheck, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit, DoCheck {
  @Input() public message: string;
  @Input() public type: string;
  @Input() public showMessage: boolean;
  @Input() public centerMessage: boolean;
  
  constructor(private el: ElementRef, private renderer: Renderer2) { }
  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'display', 'none'); 
  }
  ngDoCheck() {
    if (!this.showMessage) {
      this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
    }else {
      this.renderer.setStyle(this.el.nativeElement, 'display', 'block');
    }

    if (!this.centerMessage) {
      this.renderer.removeStyle(this.el.nativeElement.children[0], 'justify-content');
    }else {
      this.renderer.setStyle(this.el.nativeElement.children[0], 'justify-content', 'center');   
    }

  }
}
