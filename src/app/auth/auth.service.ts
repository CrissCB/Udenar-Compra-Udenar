import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private token = 'access_token';
  private idToken = 'id_token';

  setToken(token: string): void {
    localStorage.setItem(this.token, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.token);
  }

  setIdToken(idToken: string): void {
    sessionStorage.setItem(this.idToken, idToken);
  }

  getIdToken(): string | null {
    return sessionStorage.getItem(this.idToken);
  }

  clearTokens(): void {
    localStorage.removeItem(this.token);
    sessionStorage.removeItem(this.idToken);
  }
}
