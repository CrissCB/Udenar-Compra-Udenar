import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {

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

      if (!sessionStorage.getItem('access_token')) {
        window.location.href = authUrl;
      }
    }
  }
}