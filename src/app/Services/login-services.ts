import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginServices {
   private apiUrl = 'https://backend-chat-production-b9cf.up.railway.app';
  
  // El BehaviorSubject guarda el estado actual del usuario (null si no hay sesión)
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // Al iniciar, revisamos si hay un token en el almacenamiento local
    const user = localStorage.getItem('userToken');
    if (user) {
      this.currentUserSubject.next(user);
    }
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
    
  }

  logout() {
    localStorage.removeItem('userToken');
    this.currentUserSubject.next(null);
  }

  getUsuarios(): Observable<any> {
    const headers = new HttpHeaders().set('x-auth-token', localStorage.getItem('x-auth-token') || '');
    console.log(headers);
    return this.http.get(`${this.apiUrl}/usuarios`, { headers });
  }
}
