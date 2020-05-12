import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AlertService } from './alert.service';
import { Router, NavigationStart } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('AlertService', () => {
    let alertService: any;
    const mockRouter = {
        events: (() => {
            const event = new NavigationStart(42, '/');
            return of(event);
        })(),
    };

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [
                AlertService,
                { provide: Router, useValue: mockRouter },
            ],
        });

        alertService = TestBed.get(AlertService);
    });

    it('should return the success message', fakeAsync(() => {
        const message = 'success';
        alertService.success(message);

        tick();

        alertService.getMessage().subscribe((result: string) => {
            expect(result).toBe(message);
        });
        expect(true).toBeTruthy();
    }));

    it('should return the error message', fakeAsync(() => {
        const message = 'error';
        alertService.error(message);

        tick();

        alertService.getMessage().subscribe((result: string) => {
            expect(result).toBe(message);
        });
        expect(true).toBeTruthy();
    }));
});
