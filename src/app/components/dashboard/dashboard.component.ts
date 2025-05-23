import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent {
  constructor(private authService: AuthService) { 
    const token = this.authService.getToken();
    console.log('Token in Dashboard:', token);
  }
}
