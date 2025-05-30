import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { JlayaoutComponent } from '../../containers/jlayaout/jlayaout/jlayaout.component';
import { MenuEmprendedorComponent } from '../../containers/jlayaout/menu-emprendedor/menu-emprendedor.component';
import { FormEmprendimientoComponent } from '../emprendimiento/form-emprendimiento/form-emprendimiento.component';
import { FormProductoComponent } from '../emprendimiento/form-producto/form-producto.component';  
import { CommonModule } from '@angular/common';
import {CatalogoComponent} from '../emprendimiento/catalogo/catalogo.component';
import { MenuLiderComponent } from '../../containers/jlayaout/menu-lider/menu-lider.component'; 
import { SharedDataService } from '../../app-core/servicios/shared-data.service';
import { PublicacionComponent } from '../emprendimiento/publicacion/publicacion.component';
import {PublicacionProductoComponent} from '../emprendimiento/publicacion-producto/publicacion-producto.component'
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  imports: [JlayaoutComponent, MenuEmprendedorComponent, FormEmprendimientoComponent, CommonModule,FormProductoComponent,CatalogoComponent, MenuLiderComponent, PublicacionComponent,NgIf,PublicacionProductoComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  selectedOption: string = '';
  constructor(
    private authService: AuthService,
    private SharedDataService: SharedDataService
  ) { 
    const token = this.authService.getToken();
  }

  getRol(): string {
    const rol = this.SharedDataService.getRol();

    return rol ? rol : 'sin-rol';
  }


}




