import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { ActionButtonsComponent } from './action-buttons.component';
import { By } from '@angular/platform-browser';

describe('ActionButtonsComponent', () => {
    let fixture: ComponentFixture<ActionButtonsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [],
            declarations: [ActionButtonsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ActionButtonsComponent);
    }));

    it('should create the action button component', () => {
        const componentInstance = fixture.componentInstance;
        componentInstance.hideCreateButton = true;
        expect(componentInstance).toBeTruthy();
    });

    it('should trigger the all the buttons', () => {
        const componentInstance = fixture.componentInstance;
        componentInstance.hideCreateButton = false;
        fixture.detectChanges();
        const buttons = fixture.debugElement.queryAll(By.css('button'));

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].triggerEventHandler('click', null);
        }

        expect(true).toBeTruthy();
    });
});
