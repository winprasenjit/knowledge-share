import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class HttpService {
    private headers: Headers;
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) {}

    get(url: string, formData?: any): Observable<any> {
        if (formData === undefined) {
            formData = {};
        }
        formData.timeStamp = new Date().getTime();
        const params: URLSearchParams = new URLSearchParams();
        for (const x in formData) {
            if (formData.hasOwnProperty(x)) {
                params.set(x, formData[x]);
            }
        }

        return this.http
            .get(url, this.httpOptions)
            .pipe(map(response => response));
    }

    post(url: string, formData?: any): Observable<any> {
        if (formData === undefined) {
            formData = {};
        }
        formData.timeStamp = new Date().getTime();

        return this.http
            .post(url, JSON.stringify(formData), this.httpOptions)
            .pipe(map(response => response));
    }

    put(url: string, formData?: any): Observable<any> {
        if (formData === undefined) {
            formData = {};
        }
        formData.timeStamp = new Date().getTime();

        return this.http
            .put(url, JSON.stringify(formData), this.httpOptions)
            .pipe(map(response => response));
    }

    delete(url: string, formData?: any): Observable<any> {
        if (formData === undefined) {
            formData = {};
        }
        formData.timeStamp = new Date().getTime();

        return this.http
            .delete(url, this.httpOptions)
            .pipe(map(response => response));
    }
}
