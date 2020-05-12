import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
    selector: '[scroller]'
})
export class ScrollerDirective {
    @Output() scrollReached = new EventEmitter<any>();

    constructor(private el: ElementRef) { }

    @HostListener('scroll')
    scroll() {
        //visible height + pixel scrolled = total height
        if ((this.el.nativeElement.offsetHeight + this.el.nativeElement.scrollTop)
            === this.el.nativeElement.scrollHeight) {
            this.scrollReached.emit('End');
        }
    }
}