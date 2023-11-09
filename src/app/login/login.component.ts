import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private formBuilder: FormBuilder, private router: Router) {}
  checkoutForm = this.formBuilder.group({
    email: '',
    password: '',
  });

  onSubmit(): void {
    if (this.checkoutForm.value.email) {
      localStorage.setItem('userId', this.checkoutForm.value.email);
      this.router.navigate(['/products']);
      this.checkoutForm.reset();
    }
  }
  ngOnInit(): void {}
}
