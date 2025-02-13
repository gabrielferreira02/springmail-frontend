import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  constructor(private apiService: ApiService, private router: Router) {}

  mailChange(value: String, previewElement: HTMLElement) {
    previewElement.innerHTML = value + "@springmail.com";
  }

  onSubmit(register: NgForm) {
    if(register.valid) {
      let total: number = 0;
      const usernameError = document.getElementById("usernameError");
      const mailError = document.getElementById("mailError");
      const passwordError = document.getElementById("passwordError");
      const success = document.getElementById("success");
      const otherError = document.getElementById("otherError");

      usernameError!.innerHTML = "";
      mailError!.innerHTML = "";
      passwordError!.innerHTML = "";
      otherError!.innerHTML = "";

      if(register.value.username === "") {
          total++;
          usernameError!.innerHTML = "Campo nome do usuário não pode estar vazio";
      }

      if(register.value.mail === "") {
          total++;
          mailError!.innerHTML = "Campo email não pode estar em branco";
      }

      const pattern = /^[a-z0-9.]+$/;
      if(!pattern.test(register.value.mail)) {
        total++;
        mailError!.innerHTML = "Campo email pode conter apenas letras e números";
      }

      if(register.value.password === "") {
        total++;
        passwordError!.innerHTML = "Campo senha não pode estar em branco";
      }

      if(register.value.password.length < 8) {
        total++;
        passwordError!.innerHTML = "Sua senha tem que ter mínimo 8 caracteres";
      }

      if(total > 0) {
        success!.classList.add("hidden");
        return;
      }

      const body = {
        username: register.value.username,
        password: register.value.password,
        email: register.value.mail
      }

      this.apiService.registerUser(body).subscribe({
        next: response => {
          success!.classList.remove("hidden");
          setTimeout(() => {
            this.router.navigate([""]);
          }, 1000)
        }, 
        error: error => {
          otherError!.innerHTML = error.error.error;
        }
      });
    }
  }
}
