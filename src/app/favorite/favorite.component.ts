import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './favorite.component.html'
})
export class FavoriteComponent {
  chats: Array<any> = [];

  constructor(private apiService: ApiService, 
              private userService: UserService,
              private router: Router) {
    this.apiService.getFavorites(this.userService.getEmail()).subscribe({
      next: response => {
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
      this.apiService.getFavoritesByUsername(username, this.userService.getEmail()).subscribe({
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
}
