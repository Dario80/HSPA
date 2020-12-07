import { AlertifyService } from './../../services/alertify.service';
import { UserServiceService } from './../../services/user-service.service';
import { FnParam } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

  public registrationForm: FormGroup;
  public user: any = {};
  userSubmitted: boolean;
  constructor(private alertifyService: AlertifyService, private userService: UserServiceService, private fb: FormBuilder) { }

  public ngOnInit() {
    this.createRegistrationForm();
  }

  public createRegistrationForm() {
    this.registrationForm = this.fb.group({
      userName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, [Validators.required]],
      mobile: [null, [Validators.required, Validators.maxLength(10)]]
    }, { validators: this.passwordMatchingValidator });
  }

  passwordMatchingValidator(fg: FormGroup): Validators {
    return fg.get('password').value === fg.get('confirmPassword').value ? null : { notmatched: true };
  }


  public get userName() {
    return this.registrationForm.get('userName') as FormControl;
  }

  public get email() {
    return this.registrationForm.get('email') as FormControl;
  }

  public get password() {
    return this.registrationForm.get('password') as FormControl;
  }

  public get confirmPassword() {
    return this.registrationForm.get('confirmPassword') as FormControl;
  }

  public get mobile() {
    return this.registrationForm.get('mobile') as FormControl;
  }

  public onSubmit() {
    this.userSubmitted = true;
    if (this.registrationForm.valid) {
      //this.user = Object.assign(this.user, this.registrationForm.value);
      this.userService.addUser(this.userData());
      this.registrationForm.reset();
      this.userSubmitted = false;
      this.alertifyService.success('Ti sei registrato con successo!');
    } else {
      this.alertifyService.error('Valorizza i campi segnalati');

    }
  }

  userData(): User {
    return this.user = {
      userName: this.userName.value,
      email: this.email.value,
      password: this.password.value,
      mobile: this.mobile.value
    }
  }
}
