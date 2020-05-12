import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AuthenticationService } from './modules/_shared/services/authentication.service';
import { CommunicationService } from './modules/_shared/services/communication.service';
import { of } from 'rxjs';
import { FooterComponent } from './modules/footer/footer.component';

describe('AppComponent', () => {
    let mockAuthenticationService;
    let mockCommunicationService;

    beforeEach(async(() => {
        mockAuthenticationService = jasmine.createSpyObj(['isLoggedIn']);
        mockCommunicationService = jasmine.createSpyObj([
            'getLoginType',
            'getIsHome',
        ]);

        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [
                {
                    provide: AuthenticationService,
                    useValue: mockAuthenticationService,
                },
                {
                    provide: CommunicationService,
                    useValue: mockCommunicationService,
                },
            ],
            declarations: [AppComponent, FooterComponent],
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have as title 'knowledge-share'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual('knowledge-share');
    });

    it('should render title', () => {
        const fixture = TestBed.createComponent(AppComponent);
        spyOn(fixture.componentInstance, 'setLayout').and.callThrough();
        mockCommunicationService.getLoginType.and.returnValue(of(true));

        fixture.detectChanges();

        expect(mockAuthenticationService.isLoggedIn).toHaveBeenCalled();
        expect(fixture.componentInstance.setLayout).toHaveBeenCalled();
        expect(fixture.componentInstance.bodyClass).toBeTruthy();
    });

    it('should set the layout after view init', fakeAsync(() => {
        const fixture = TestBed.createComponent(AppComponent);
        spyOn(fixture.componentInstance, 'setLayout').and.callThrough();
        mockCommunicationService.getIsHome.and.returnValue(of(true));

        fixture.componentInstance.ngAfterViewInit();
        tick(600);

        expect(fixture.componentInstance.setLayout).toHaveBeenCalled();
        expect(fixture.componentInstance.isHome).toBeTruthy();
    }));
});
