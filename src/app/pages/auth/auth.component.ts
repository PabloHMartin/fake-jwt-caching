import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthForm } from 'src/app/shared/models/Auth-form.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  
  form: FormGroup =  this.fb.group({
    email: ['', Validators.required],
    password: ['', [Validators.required,Validators.minLength(6) ] ]
  });

  constructor(private fb: FormBuilder, 
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {

  }

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }


  onSubmit(){
    const authInfo: AuthForm = this.form.value;
    this.authService.login(authInfo).subscribe(success => {
      if (success) {
        this.router.navigate(['/home']);
      }
    });
  }

}
