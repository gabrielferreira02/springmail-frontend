import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private email: string = "email";
  private token: string = "token";

  getEmail(): string {
    return localStorage.getItem(this.email) || "";
  }

  setEmail(email: string): void {
    localStorage.setItem(this.email, email);
  }

  getToken(): string {
    return localStorage.getItem(this.token) || "";
  }

  setToken(token: string): void {
    localStorage.setItem(this.token, token);
  }

  clear(): void {
    this.token = "";
    this.email = "";
  }
}
