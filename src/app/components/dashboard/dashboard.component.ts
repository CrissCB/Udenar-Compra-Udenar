import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { JlayaoutComponent } from '../../containers/jlayaout/jlayaout/jlayaout.component';
import { MenuEmprendedorComponent } from '../../containers/jlayaout/menu-emprendedor/menu-emprendedor.component';
import { FormEmprendimientoComponent } from '../emprendimiento/form-emprendimiento/form-emprendimiento.component';
import { FormProductoComponent } from '../emprendimiento/form-producto/form-producto.component';  
import { CommonModule } from '@angular/common';
import {CatalogoComponent} from '../emprendimiento/catalogo/catalogo.component';
@Component({
  selector: 'app-dashboard',
  imports: [JlayaoutComponent, MenuEmprendedorComponent, FormEmprendimientoComponent, CommonModule,FormProductoComponent,CatalogoComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  selectedOption: string = '';
  constructor(private authService: AuthService) { 
    const token = this.authService.getToken();
  }
}




