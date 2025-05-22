import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private token: string | null = null;
  private idToken: string | null = null;

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem(this.token, token);
  }

  getToken(): string | null {
    return this.token;
  }

  setIdToken(idToken: string): void {
    this.idToken = idToken;
    sessionStorage.setItem(this.idToken, idToken);
  }

  getIdToken(): string | null {
    return this.idToken;
  }
}
