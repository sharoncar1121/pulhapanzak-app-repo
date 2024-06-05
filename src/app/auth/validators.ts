import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minLengthValidator(minLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value ? control.value.toString() : '';
    return value.length >= minLength ? null : { 'minlength': { requiredLength: minLength, actualLength: value.length } };
  };
}