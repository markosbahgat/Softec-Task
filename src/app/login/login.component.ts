import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}
  public checkoutForm = this.formBuilder.group({
    email: '',
    password: '',
  });

  onSubmit(): void {
    if (this.checkoutForm.value.email) {
      this.authService.authenticateUser(this.checkoutForm.value.email);
      this.router.navigate(['/products']);
      this.checkoutForm.reset();
    }
  }
  ngOnInit(): void {}
}
