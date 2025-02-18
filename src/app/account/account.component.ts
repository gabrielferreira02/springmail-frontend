import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { NgForm, NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './account.component.html'
})
export class AccountComponent {
  data = {
    username: "",
    email: ""
  }

  constructor(private apiService: ApiService, private router: Router, private userService: UserService) {
    apiService.getUserDetails(this.userService.getEmail()).subscribe({
      next: response => {
        this.data.username = response.username;
        this.data.email = response.email;
      },
      error: response => {
        if(response.error.status == 403) {
          this.router.navigate([""]);
        }
      }
    })
  }

  changeUsername(dataUsername: NgForm) {
    const success = document.getElementById("successUsername");
    const error = document.getElementById("errorUsername");

    if(dataUsername.valid) {

      if(dataUsername.value.username == "") {
        error!.innerHTML = "Campo não pode estar vazio";
        return;
      }

      const dataRequest = {
        username: dataUsername.value.username,
        email: this.data.email
      }

      this.apiService.updateUsername(dataRequest).subscribe({
        next: response => {
          success!.innerHTML = "Nome alterado com sucesso!";
        },
        error: err => {
          if(err.error.status == 403) {
            this.router.navigate([""]);
          }
          error!.innerHTML = err.error;
        }
      })
    }

  }

  changePassword(dataPassword: NgForm) {
    const success = document.getElementById("successPassword");
    const error = document.getElementById("errorPassword");

    success!.innerHTML = "";
    error!.innerHTML = "";

    if(dataPassword.valid) {

      if(dataPassword.value.newPassword.length < 8) {
        error!.innerHTML = "Campo nova senha tem que ter ao menos 8 caracteres";
        return;
      }

      if(dataPassword.value.oldPassword.length < 8) {
        error!.innerHTML = "Campo senha atual tem que ter ao menos 8 caracteres";
        return;
      }

      const dataRequest = {
        newPassword: dataPassword.value.newPassword,
        oldPassword: dataPassword.value.oldPassword,
        email: this.userService.getEmail()
      }

      this.apiService.updatePassword(dataRequest).subscribe({
        next: response => {
          success!.innerHTML = "Senha alterada com sucesso!";
        },
        error: err => {
          if(err.error.status == 403) {
            this.router.navigate([""]);
          }
          error!.innerHTML = err.error;
        }
      })
    }

  }

  deleteUser() {
    const p = document.getElementById("successDelete")
    this.apiService.deleteUser(this.userService.getEmail()).subscribe({
      next: response => {
        p!.innerHTML = "Conta deletada!";

        setTimeout(() => {
          this.router.navigate([""]);
        }, 1000)
      },
      error: response => {
        if(response.error.status == 403) {
          this.router.navigate([""]);
        }
      }
    })
  }

  
}
