import { Component, Input ,Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-base-message',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './base-message.component.html',
  styles: ``
})
export class BaseMessageComponent {
  @Input() chats: any[] = []; 
  @Output() searchChange = new EventEmitter<string>(); 
  @Output() reloadClicked = new EventEmitter<void>(); 
  @Output() favoriteClicked = new EventEmitter<any>(); 

  onChange(searchTerm: string): void {
    this.searchChange.emit(searchTerm); 
  }

  reload(): void {
    this.reloadClicked.emit();
  }

  favorite(item: any): void {
    this.favoriteClicked.emit(item); 
  }

  setColor(c: string): string {
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

  getDate(date: string): string {
    const d = new Date(date);
    
    const now = new Date();
    if(d.getDay == now.getDay) {
      const hour = d.toLocaleString("pt-br", {timeZone: "America/Sao_Paulo"})
      return `${hour.substring(11, 17)}`;
    }

    return `${d.getDay} ${d.toLocaleString("pt-br", {month: "short"})}`
  }

}
