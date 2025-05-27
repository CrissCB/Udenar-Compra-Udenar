import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { JlayaoutComponent } from '../../containers/jlayaout/jlayaout/jlayaout.component';
import { MenuEmprendedorComponent } from '../../containers/jlayaout/menu-emprendedor/menu-emprendedor.component';
import { FormEmprendimientoComponent } from '../emprendimiento/form-emprendimiento/form-emprendimiento.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  imports: [JlayaoutComponent, MenuEmprendedorComponent, FormEmprendimientoComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  selectedOption: string = '';
  constructor(private authService: AuthService) { 
    const token = this.authService.getToken();
  }
}




