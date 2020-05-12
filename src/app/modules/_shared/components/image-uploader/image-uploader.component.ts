import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { IImagestate } from './helpers/image-store';
import { GlobalConstant } from '../../constants/global.constant';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { NgRedux } from '@angular-redux/store';

@Component({
    selector: 'image-uploader',
    templateUrl: './image-uploader.component.html',
    styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent implements OnInit {
    @Input() data: any;

    constructor(
        private http: HttpClient,
        private el: ElementRef,
        private ngRedux: NgRedux<IImagestate>
    ) {
        this.data = this.data || {};
    }

    ngOnInit() {}

    upload() {
        const inputEl: HTMLInputElement = this.el.nativeElement.querySelector(
            '#photo'
        );
        const fileCount: number = inputEl.files.length;
        const formData = new FormData();
        if (fileCount > 0) {
            // a file was selected
            formData.append('target', this.data.folder);
            formData.append('photo', inputEl.files.item(0));
            this.http
                .post(this.data.url, formData)
                .pipe(map(response => response))
                .subscribe(
                    (response: any) => {
                        this.ngRedux.dispatch({
                            type: GlobalConstant.ADD_IMAGE,
                            imageUrl: response.filePath
                        });
                    },
                    error => console.log(error)
                );
        }
    }
}
