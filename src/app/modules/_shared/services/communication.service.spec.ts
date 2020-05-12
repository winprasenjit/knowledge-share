import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CommunicationService } from './communication.service';

describe('CommunicationService', () => {
    let communicationService: any;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            providers: [CommunicationService],
        });

        communicationService = TestBed.get(CommunicationService);
    });

    it('should set login type', fakeAsync(() => {
        communicationService.setLoginType(true);
        tick();
        communicationService.getLoginType().subscribe((result: boolean) => {
            expect(result).toBeTruthy();
        });
    }));

    it('should clear login type', fakeAsync(() => {
        communicationService.clearLoginType();
        tick();
        communicationService.getLoginType().subscribe((result: boolean) => {
            expect(result).toBeFalsy();
        });
    }));

    it('should set home type', fakeAsync(() => {
        communicationService.setIsHome(true);
        tick();
        communicationService.getIsHome().subscribe((result: boolean) => {
            expect(result).toBeTruthy();
        });
    }));

    it('should clear home type', fakeAsync(() => {
        communicationService.clearIsHome();
        tick();
        communicationService.getIsHome().subscribe((result: boolean) => {
            expect(result).toBeFalsy();
        });
    }));
});
