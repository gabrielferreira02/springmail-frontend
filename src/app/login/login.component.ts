import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  mail: string = "gabrielf@springmail.com";
  password: string = "12345678";
  constructor(private router: Router, private apiService: ApiService, private userService: UserService) {}

  onSubmit(login: NgForm) {
    const p = document.getElementById("error");

    p!.innerHTML = "";
    if(login.valid) {
      if(login.value.mail === "") {
        p!.innerHTML = "Campo email não pode ser vazio";
        return;
      }

      if(login.value.password.length < 8) {
        p!.innerHTML = "Campo senha precisa ter ao menos 8 digitos";
        return;
      }

      const data = {
        email: login.value.mail,
        password: login.value.password
      }

      this.apiService.login(data).subscribe({
        next: response => {
          this.userService.setEmail(response.email);
          this.userService.setToken(response.token);
          setTimeout(() => {
            this.router.navigate(["/box/messages"]);
          }, 2000)
        }, 
        error: e => {
          p!.innerHTML = "Email ou senha incorretos";
        }
      })
    }
  }
}
