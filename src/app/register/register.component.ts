import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  mailChange(value: String, previewElement: HTMLElement) {
    previewElement.innerHTML = value + "@springmail.com";
  }
}
