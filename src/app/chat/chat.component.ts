import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {
  messages: Array<any> = [];
  subject: string = "";
  to: string = "";
  chatId: string | null = "";

  constructor(private apiService: ApiService, 
    private route: ActivatedRoute, 
    private userService: UserService,
    private router: Router) {}

  ngOnInit(): void {
    this.chatId = this.route.snapshot.paramMap.get("id");

    this.apiService.getMessagesByChatId(this.chatId).subscribe({
      next: response => {
        this.messages = response;
      },
      error: response => {
        if(response.error.status == 403) {
          this.router.navigate([""]);
        }
      }
    })

    this.apiService.getChatInformation(this.chatId).subscribe({
      next: response => {
        this.to = response.toEmail;
        this.subject = response.subject;
        },
        error: response => {
          if(response.error.status == 403) {
            this.router.navigate([""]);
          }
        }
    })

    const data = {
      chatId: this.chatId,
      email: this.userService.getEmail()
    }

    this.apiService.setIsRead(data).subscribe({
      error: response => {
        if(response.error.status == 403) {
          this.router.navigate([""]);
        }
      }
    });
  }

  getDate(date: string) {
    const d = new Date(date);
    
    const now = new Date();
    if(d.getDay == now.getDay) {
      const hour = d.toLocaleString("pt-br", {timeZone: "America/Sao_Paulo"})
      return `${hour.substring(11, 17)}`;
    }

    return `${d.getDay} ${d.toLocaleString("pt-br", {month: "short"})}`
  }

  setColor(c: string) {
    const letterColors: { [key: string]: string } = {
      A: "bg-red-500",
      B: "bg-blue-500",
      C: "bg-green-500",
      D: "bg-yellow-500",
      E: "bg-purple-500",
      F: "bg-pink-500",
      G: "bg-indigo-500",
      H: "bg-teal-500",
      I: "bg-orange-500",
      J: "bg-gray-500",
      K: "bg-lime-500",
      L: "bg-cyan-500",
      M: "bg-rose-500",
      N: "bg-violet-500",
      O: "bg-emerald-500",
      P: "bg-amber-500",
      Q: "bg-fuchsia-500",
      R: "bg-sky-500",
      S: "bg-lime-700",
      T: "bg-cyan-700",
      U: "bg-red-700",
      V: "bg-blue-700",
      W: "bg-green-700",
      X: "bg-yellow-700",
      Y: "bg-purple-700",
      Z: "bg-pink-700"
    };

    return letterColors[c];
    
  }

  replyChat(message: NgForm) {
    const p = document.getElementById("error");
    const s = document.getElementById("success");

    p!.classList.add("hidden");
    s!.classList.add("hidden");

    if(message.valid) {
      if(message.value.content === "") {
        p!.classList.remove("hidden");
      }

      const data = {
        chatId: this.chatId,
        senderEmail: this.userService.getEmail(),
        content: message.value.content
      }

      this.apiService.reply(data).subscribe({
        next: () => {
          s!.classList.remove("hidden");
          this.apiService.getMessagesByChatId(this.chatId).subscribe({
            next: d => {
              this.messages = d;
            },
            error: response => {
              if(response.error.status == 403) {
                this.router.navigate([""]);
              }
            }
          })
        }
      })

    }
  }

}
