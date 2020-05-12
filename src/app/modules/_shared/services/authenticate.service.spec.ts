import { TestBed, fakeAsync } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { HttpService } from './http.service';
import { of } from 'rxjs';

describe('AuthenticationService', () => {
    const mockHttpService = jasmine.createSpyObj(['post']);
    let authenticateService: any;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            providers: [
                AuthenticationService,
                { provide: HttpService, useValue: mockHttpService },
            ],
        });

        authenticateService = TestBed.get(AuthenticationService);
    });

    it('should check user looged in status', () => {
        localStorage.setItem('currentUser', JSON.stringify({}));

        const result = authenticateService.isLoggedIn();

        expect(result).toBeTruthy();
    });

    it('should check user logged out status', () => {
        localStorage.removeItem('currentUser');

        const result = authenticateService.isLoggedIn();

        expect(result).toBeFalsy();
    });

    it('should clear the session storage and logged out forcefully', () => {
        const result = authenticateService.logout();

        expect(result).toBeFalsy();
    });

    it('should logged in an user ', fakeAsync(() => {
        mockHttpService.post.and.callFake((url: string) => {
            expect(url).toContain('/authenticate');

            return of({});
        });

        authenticateService.login({}).subscribe((response: any) => {
            expect(response).toBeTruthy();
            expect(authenticateService.User).toBeTruthy();
        });

        expect(mockHttpService.post).toHaveBeenCalled();
    }));

    it('should return null response if login failed ', fakeAsync(() => {
        mockHttpService.post.and.callFake((url: string) => {
            expect(url).toContain('/authenticate');

            return of(null);
        });

        authenticateService.login({}).subscribe((response: any) => {
            expect(response).toBeFalsy();
            expect(authenticateService.User).toBeUndefined();
        });

        expect(mockHttpService.post).toHaveBeenCalled();
    }));
});
