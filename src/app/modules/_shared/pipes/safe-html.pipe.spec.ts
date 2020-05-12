import { DomSanitizer } from '@angular/platform-browser';
import { SafeHtmlPipe } from './safe-html';
import { TestBed } from '@angular/core/testing';

describe('SafeHtmlPipe', () => {
    let pipe: SafeHtmlPipe;
    let sanitized: DomSanitizer;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            providers: [DomSanitizer],
        });
        sanitized = TestBed.get(DomSanitizer);
        pipe = new SafeHtmlPipe(sanitized);
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should bypass the security and treat as a html ', () => {
        const value = '<script>alert()</script>';

        const result = pipe.transform(value);

        // tslint:disable-next-line:no-string-literal
        expect(result['changingThisBreaksApplicationSecurity']).toEqual(value);
    });
});
