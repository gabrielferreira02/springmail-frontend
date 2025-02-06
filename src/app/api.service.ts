import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url: string = "http://localhost:8080"; 
  private endpoint: string = "";

  constructor(private http: HttpClient) { }

  createChat(data: any): Observable<any> {
    this.endpoint = this.url + "/chat";
    return this.http.post(this.endpoint, data);
  }

  registerUser(data: any): Observable<any> {
    this.endpoint = this.url + "/register";
    return this.http.post(this.endpoint, data);
  }

  getChats(email: string): Observable<any> {
    this.endpoint = this.url + "/chat/user/" + email;
    return this.http.get(this.endpoint);
  }

  getSentChats(email: string): Observable<any> {
    this.endpoint = this.url + "/chat/user/sent/" + email;
    return this.http.get(this.endpoint);
  }

  getChatsFromByUsername(username: string, email: string): Observable<any> {
    this.endpoint = this.url + `/chat/user/to?from=${email}&to=${username}`;
    return this.http.get(this.endpoint);
  }

  getChatToByUsername(username: string, email: string): Observable<any> {
    this.endpoint = this.url + `/chat/user/from?from=${username}&to=${email}`;
    return this.http.get(this.endpoint);
  }
}
