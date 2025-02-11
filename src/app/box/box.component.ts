import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-box',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule, HttpClientModule],
  templateUrl: './box.component.html',
  styleUrl: './box.component.css'
})
export class BoxComponent {

  constructor(private apiService: ApiService) {}

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
        "sender": "4dacd267-9b71-4f1c-8583-ff8c9895e065"
      }

      this.apiService.createChat(body).subscribe({
        next: response => {
          this.closeWriteMessageBox();
        },
        error: e => {
            otherError!.innerHTML = e.error.error;
            console.log(e);
        }
      });

    }
  }
}
