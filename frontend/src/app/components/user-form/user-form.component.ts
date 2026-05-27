import {Component, EventEmitter, inject, Input, OnInit, Output, signal} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {passwordMatchValidator} from '../../shared/password-match-validator.validator';
import {UserModel} from '../../models/user/user.model';
import {UserService} from '../../service/user/user.service';
import {UpdateUserModel} from '../../models/user/update-user.model';
import {CreateUserModel} from '../../models/user/create-user.model';
import {MatError} from '@angular/material/input';
import {inputClasses, selectClasses} from '../../shared/input-classes.util';
import {NgClass} from '@angular/common';
import {Observable} from 'rxjs';
import {Button} from '../button/button';
import {UserRole} from '../../models/user/user-role.enum';

@Component({
  selector: 'app-user-form',
  imports: [
    FormsModule,
    MatError,
    ReactiveFormsModule,
    NgClass,
    Button
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent implements OnInit {
  @Input() user?: UserModel | null;
  @Input() message: string = '';
  @Output('actionComplete') actionCompleteEmitter = new EventEmitter<void>();
  protected loading = signal(false);
  protected error = signal(false);
  protected readonly inputClasses = inputClasses;
  protected readonly UserRole = UserRole;
  protected readonly selectClasses = selectClasses;
  private userService = inject(UserService);

  protected _isAdmin = false;

  @Input() set isAdmin(value: boolean) {
    this._isAdmin = value;
    if (value) {
      this.userForm.controls.roles.enable();
      this.userForm.controls.activated.enable();
    }

  }

  ngOnInit(): void {
    if (this.user) {
      this.userForm.patchValue({...this.user});
    }
  }

  protected onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    const model = {...this.user, ...this.userForm.getRawValue()};
    if (this.user && this.user.id) {
      this.doRequest(this.userService.updateUser({...model} as UpdateUserModel));
    } else {
      this.doRequest(this.userService.createUser({...model} as CreateUserModel));
    }
  }

  private minSelectedCheck = (min = 1): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      return (Array.isArray(value) && value.length >= min)
        ? null
        : {requiredSelection: {actual: value?.length, required: min}};
    };
  }

  protected userForm = new FormGroup({
    id: new FormControl<string | null>(null),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
    roles: new FormControl<UserRole[] | null>({
      value: null,
      disabled: true
    }, [Validators.required, this.minSelectedCheck(1)]),
    activated: new FormControl<boolean | null>({value: null, disabled: true}, Validators.required),
  }, {validators: passwordMatchValidator});

  private doRequest(request: Observable<UserModel>) {
    request.subscribe({
      next: (user) => {
        this.userForm.reset({...user});
        this.loading.set(false);
        this.actionCompleteEmitter.emit();
      },
      error: (err) => {
        this.error.set(true);
        this.loading.set(false);
        console.error(err);
      },
    });
  }
}
