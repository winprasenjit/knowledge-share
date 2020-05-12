/**
 * Created by prasenjit on 6/9/2018.
 */
import {
    Directive, ElementRef, HostListener, Output, EventEmitter, HostBinding, AfterViewInit
} from '@angular/core';

@Directive({
    selector: '[set-auto-height]'
})
export class SetAutoHeightDirective implements AfterViewInit {
    constructor(private el: ElementRef) {
    }

    ngAfterViewInit(): void {
        this.setDomHeight();
    }

    setDomHeight():void{
        setTimeout(()=>this.el.nativeElement.style.height
            = this.el.nativeElement.parentElement.offsetHeight + 'px');
    }
}
