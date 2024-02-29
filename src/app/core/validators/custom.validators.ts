import { ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

export const checkPasswords: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {
  let password = group.get('password')?.value;
  let confirmPass = group.get('confirmPassword')?.value;

  return password === confirmPass ? null : { notSame: true };
};

export const cannotContainSpace: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  if (control.value) {
    if ((control.value as string).indexOf(' ') >= 0) {
      return { cannotContainSpace: true };
    }
  }

  return null;
};
