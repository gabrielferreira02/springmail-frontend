import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sent',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sent.component.html'
})
export class SentComponent {
  chats: Array<any> = [];

  constructor(private apiService: ApiService, 
              private userService: UserService,
              private router: Router) {
    this.apiService.getSentChats(this.userService.getEmail()).subscribe({
      next: response => {
        console.log(response);
        this.chats = response;
      },
      error: response => {
        if(response.error.status == 403) {
          this.router.navigate([""]);
        }
      }
    })
  }

  reload() {
    this.apiService.getSentChats(this.userService.getEmail()).subscribe({
      next: response => {
        console.log(response);
        this.chats = response;
      },
      error: response => {
        if(response.error.status == 403) {
          this.router.navigate([""]);
        }
      }
    })
  }

  onChange(username: string) {
    if(username === "") return;

    setTimeout(() => {
      this.apiService.getChatsToByUsername(username, this.userService.getEmail()).subscribe({
        next: response => {
          this.chats = response;
        },
        error: response => {
          if(response.error.status == 403) {
            this.router.navigate([""]);
          }
        }
      })
    }, 1000)
  }

  getDate(date: string): string {
    const d = new Date(date);
    
    const now = new Date();
    if(d.getDay == now.getDay) {
      const hour = d.toLocaleString("pt-br", {timeZone: "America/Sao_Paulo"})
      return `${hour.substring(11, 17)}`;
    }

    return `${d.getDay} ${d.toLocaleString("pt-br", {month: "short"})}`
  }

  favorite(item: any) {
    const data = {
      chatId: item.id,
      userEmail: this.userService.getEmail()
    };

    if(!item.isFavorite) {
      this.apiService.favoriteChat(data).subscribe({
        next: response => {
          item.isFavorite = true;
        },
        error: response => {
          if(response.error.status == 403) {
            this.router.navigate([""]);
          }
        }
      })
    } else {
      this.apiService.deleteFavoriteChat(data).subscribe({
        next: response => {
          item.isFavorite = false;
        },
        error: response => {
          if(response.error.status == 403) {
            this.router.navigate([""]);
          }
        }
      })
    }
  }
}
