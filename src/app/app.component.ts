import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { JlayaoutComponent } from "./containers/jlayaout/jlayaout/jlayaout.component";
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
   isAuthenticated = false;
  constructor(private http: HttpClient, public authService: AuthService) {
    this.isAuthenticated = !!this.authService.getToken();
   }
  ngOnInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (!code) {
      const redirectUri = 'http://localhost:4200/callback';
      const clientId = 'laravel-api';
      const realm = 'laravel-realm';
      const authUrl = `http://localhost:8081/realms/${realm}/protocol/openid-connect/auth` +
        `?client_id=${clientId}` +
        `&response_type=code` +
        `&scope=openid` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}`;
      // console.log('auth URL:', sessionStorage.getItem('access_token'));

      if (!sessionStorage.getItem('access_token')) {
        window.location.href = authUrl;
      }
    }
  }
}