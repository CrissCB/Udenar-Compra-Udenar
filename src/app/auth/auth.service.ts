import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private token: string | null = null;

  setToken(token: string): void {
    this.token = token;
    console.log('Token set:', this.token);
  }

  getToken(): string | null {
    console.log('Token retrieved:', this.token);
    return this.token;
  }
}
