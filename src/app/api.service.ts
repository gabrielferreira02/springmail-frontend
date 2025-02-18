import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // private url: string = "http://localhost:8080"; 
  private url: string = "https://springmail-backend.onrender.com"; 
  private endpoint: string = "";
  private headers: { [key: string]: string } = {};

  constructor(private http: HttpClient, private userService: UserService) { 
    this.headers["Content-Type"] = "application/json";
  }

  createChat(data: any): Observable<any> {
    this.endpoint = this.url + "/chat";
    return this.http.post(this.endpoint, data, { headers: this.headers });
  }

  registerUser(data: any): Observable<any> {
    this.endpoint = this.url + "/register";
    return this.http.post(this.endpoint, data);
  }

  login(data: any): Observable<any> {
    this.endpoint = this.url + "/login";
    return this.http.post(this.endpoint, data);
  }

  getChats(email: string): Observable<any> {
    this.endpoint = this.url + "/chat/user/" + email;
    return this.http.get(this.endpoint, { headers: this.headers });
  }

  getSentChats(email: string): Observable<any> {
    this.endpoint = this.url + "/chat/user/sent/" + email;
    return this.http.get(this.endpoint, { headers: this.headers });
  }

  getChatsFromByUsername(username: string, email: string): Observable<any> {
    this.endpoint = this.url + `/chat/user/from?from=${username}&to=${email}`;
    return this.http.get(this.endpoint, { headers: this.headers });
  }

  getChatsToByUsername(username: string, email: string): Observable<any> {
    this.endpoint = this.url + `/chat/user/to?from=${email}&to=${username}`;
    return this.http.get(this.endpoint, { headers: this.headers });
  }

  favoriteChat(data: any) {
    this.endpoint = this.url + "/favorite";
    return this.http.post(this.endpoint, data, { headers: this.headers });
  }

  deleteFavoriteChat(data: any) {
    this.endpoint = this.url + `/favorite?userEmail=${data.userEmail}&chatId=${data.chatId}`;
    return this.http.delete(this.endpoint, { headers: this.headers });
  }

  getFavorites(email: string): Observable<any> {
    this.endpoint = this.url + "/favorite/" + email;
    return this.http.get(this.endpoint, { headers: this.headers });
  }

  getFavoritesByUsername(username: string, email: string): Observable<any> {
    this.endpoint = this.url + `/favorite?username=${username}&userEmail=${email}`;
    return this.http.get(this.endpoint, { headers: this.headers });
  }

  getUserDetails(email: string): Observable<any> {
    this.endpoint = this.url + "/user/" + email;
    return this.http.get(this.endpoint, { headers: this.headers });
  }

  updateUsername(data: any): Observable<any> {
    this.endpoint = this.url + "/user/username";
    return this.http.put(this.endpoint, data, { headers: this.headers });
  }

  updatePassword(data: any): Observable<any> {
    this.endpoint = this.url + "/user/password";
    return this.http.put(this.endpoint, data, { headers: this.headers });
  }

  deleteUser(email: string): Observable<any> {
    this.endpoint = this.url + "/user/" + email;
    return this.http.delete(this.endpoint, { headers: this.headers });
  }

  getMessagesByChatId(id: string | null): Observable<any> {
    this.endpoint = this.url + "/message/chat/" + id;
    return this.http.get(this.endpoint, { headers: this.headers });
  }

  getChatInformation(id: string | null): Observable<any> {
    this.endpoint = this.url + "/chat/" + id;
    return this.http.get(this.endpoint, { headers: this.headers });
  }

  reply(data: any) {
    this.endpoint = this.url + "/message";
    return this.http.post(this.endpoint, data, { headers: this.headers });
  }

  setIsRead(data: any) {
    this.endpoint = this.url + "/chat";
    return this.http.put(this.endpoint, data, { headers: this.headers });
  }
}
