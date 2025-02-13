import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [],
  templateUrl: './message.component.html'
})
export class MessageComponent {
  chats: Array<any> = [];

  constructor(private apiService: ApiService) {
    this.apiService.getChats("gabrielf.04.2002@springmail.com").subscribe({
      next: response => {
        console.log(response);
        this.chats = response;
      }
    })
  }

}
