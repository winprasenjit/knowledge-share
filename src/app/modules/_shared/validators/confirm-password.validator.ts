import { FormControl } from '@angular/forms';

export function ValidateConfirmPassword(passwordKey: string): object {
    // tslint:disable-next-line:only-arrow-functions
    return function(control: FormControl) {
        if (control.root && control.value) {
            if (control.root.value[passwordKey] === control.value) {
                return false;
            }
        }
        return { ValidConfirmPassword: false };
    };
}
