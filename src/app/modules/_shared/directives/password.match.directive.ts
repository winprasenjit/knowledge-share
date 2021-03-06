import { Directive, forwardRef, Attribute } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
    selector:
        '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => EqualValidatorDirective),
            multi: true
        }
    ]
})
export class EqualValidatorDirective implements Validator {
    constructor(@Attribute('validateEqual') public validateEqual: string) {}

    validate(c: AbstractControl): { [key: string]: any } {
        // self value (e.g. retype password)
        const v = c.value;

        // control value (e.g. password)
        const e = c.root.get(this.validateEqual);

        // value not equal
        if (e && v !== e.value) {
            return {
                validateEqual: false
            };
        }
        return null;
    }
}
