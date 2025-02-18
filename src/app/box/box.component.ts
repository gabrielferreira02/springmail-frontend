import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../api.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-box',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule, HttpClientModule],
  templateUrl: './box.component.html'
})
export class BoxComponent {

  constructor(private apiService: ApiService, 
              private userService: UserService,
              private router: Router) {}

  openWriteMessageBox() {
    const writeMessageBox = document.getElementById("writeMessageBox");
    writeMessageBox?.classList.remove("hidden");
    writeMessageBox?.classList.add("flex");
  }

  closeWriteMessageBox() {
    const writeMessageBox = document.getElementById("writeMessageBox");
    writeMessageBox?.classList.remove("flex");
    writeMessageBox?.classList.add("hidden");
  }

  onSubmit(newChat: NgForm) {
    const otherError = document.getElementById("otherError");
    const toInput = document.getElementById("toError");
    const subjectInput = document.getElementById("subjectError");
    const messageField = document.getElementById("messageError");

    otherError!.innerHTML = "";
    toInput!.innerHTML = "";
    subjectInput!.innerHTML = "";
    messageField!.innerHTML = "";

    let total: number  = 0;
    if(newChat.valid) {
      if(newChat.value.to === "") {
        total++;
        toInput!.innerHTML = "Campo não pode estar vazio";
      }

      if(newChat.value.subject == "") {
        total++;
        subjectInput!.innerHTML = "Campo não pode estar vazio";
      }

      if(newChat.value.message == "") {
        total++;
        messageField!.innerHTML = "Campo não pode estar vazio";
      }

      if(total > 0) return;

      const body = {
        "subject": newChat.value.subject,
        "destination": newChat.value.to,
        "content": newChat.value.message,
        "sender": this.userService.getEmail()
      }

      this.apiService.createChat(body).subscribe({
        next: response => {
          this.closeWriteMessageBox();
        },
        error: e => {
            otherError!.innerHTML = e.error.error;
            if(e.error.status == 403) {
              this.router.navigate([""]);
            }
        }
      });

    }
  }

  openCloseMenu() {
    const menu = document.getElementById("menu");
    const openIcon = document.getElementById("openIcon");
    const closeIcon = document.getElementById("closeIcon");

    if(menu?.classList.contains("max-[1150px]:left-[-100%]")) {
      menu?.classList.remove("max-[1150px]:left-[-100%]");
      menu?.classList.add("max-[1150px]:left-0");
      openIcon?.classList.add("hidden");
      closeIcon?.classList.remove("hidden");
    } else {
      menu?.classList.remove("max-[1150px]:left-0");
      menu?.classList.add("max-[1150px]:left-[-100%]");
      openIcon?.classList.remove("hidden");
      closeIcon?.classList.add("hidden");
    }
  }
}
