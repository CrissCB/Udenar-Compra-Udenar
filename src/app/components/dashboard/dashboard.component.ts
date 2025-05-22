import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { JlayaoutComponent } from '../../containers/jlayaout/jlayaout/jlayaout.component';

@Component({
  selector: 'app-dashboard',
  imports: [JlayaoutComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent {
  constructor(private authService: AuthService) { 
    const token = this.authService.getToken();
  }
}
