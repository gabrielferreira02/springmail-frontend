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
}
