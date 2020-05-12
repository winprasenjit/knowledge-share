import { AbstractControl, FormControl } from '@angular/forms';

export function MobileNumberValidation(control: FormControl) {
    const isValid =  control.value.match(/^\d{10}$/) > 0;
    return isValid ? null : {notValidMobile : true};
}
