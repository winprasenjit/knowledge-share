import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { HttpService } from './http.service';

describe('HttpService', () => {
    let httpTestingController: HttpTestingController;
    let httpService: any;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [HttpService],
        });

        httpTestingController = TestBed.get(HttpTestingController);
        httpService = TestBed.get(HttpService);
    });

    it('should call the default get method', () => {
        const url = 'dummuUrl';
        httpService.get(url).subscribe();

        const req = httpTestingController.expectOne(url);
        req.flush({});
        httpTestingController.verify();

        expect(req.request.method).toBe('GET');
    });

    it('should call the default get method with request parameter', () => {
        const url = 'dummuUrl';
        const params = { name: 'Test' };
        httpService.get(url, params).subscribe();

        const req = httpTestingController.expectOne(url);
        req.flush({});
        httpTestingController.verify();

        expect(req.request.method).toBe('GET');
    });

    it('should call the default post method', () => {
        const url = 'dummuUrl';
        httpService.post(url).subscribe();

        const req = httpTestingController.expectOne(url);
        req.flush({});
        httpTestingController.verify();

        expect(req.request.method).toBe('POST');
    });

    it('should call the default post method with request parameter', () => {
        const url = 'dummuUrl';
        const params = { name: 'Test' };
        httpService.post(url, params).subscribe();

        const req = httpTestingController.expectOne(url);
        req.flush({});
        httpTestingController.verify();

        expect(req.request.method).toBe('POST');
    });

    it('should call the default put method', () => {
        const url = 'dummuUrl';
        httpService.put(url).subscribe();

        const req = httpTestingController.expectOne(url);
        req.flush({});
        httpTestingController.verify();

        expect(req.request.method).toBe('PUT');
    });

    it('should call the default put method with request parameter', () => {
        const url = 'dummuUrl';
        const params = { name: 'Test' };
        httpService.put(url, params).subscribe();

        const req = httpTestingController.expectOne(url);
        req.flush({});
        httpTestingController.verify();

        expect(req.request.method).toBe('PUT');
    });

    it('should call the default delete method', () => {
        const url = 'dummuUrl';
        httpService.delete(url).subscribe();

        const req = httpTestingController.expectOne(url);
        req.flush({});
        httpTestingController.verify();

        expect(req.request.method).toBe('DELETE');
    });

    it('should call the default delete method with request parameter', () => {
        const url = 'dummuUrl';
        const params = { name: 'Test' };
        httpService.delete(url, params).subscribe();

        const req = httpTestingController.expectOne(url);
        req.flush({});
        httpTestingController.verify();

        expect(req.request.method).toBe('DELETE');
    });
});
