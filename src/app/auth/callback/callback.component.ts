import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-callback',
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.scss'
})

export class CallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const code = this.route.snapshot.queryParamMap.get('code');
    if (code) {
      this.http.post('http://localhost:8000/api/token-exchange', { code }).subscribe({
        next: (response: any) => {
          const token = response.access_token;
          this.authService.setToken(token);
          console.log('Token received:', token);
          this.router.navigate(['/dashboard']);
        },
        error: err => console.error('Error during token exchange:', err)
      });
    }
  }
}
