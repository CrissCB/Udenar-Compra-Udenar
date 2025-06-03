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
import { FeriasParticiparComponent } from '../emprendimiento/ferias-participar/ferias-participar.component';
import {ConvocatoriaFormularioComponent} from '../lider/convocatoria-formulario/convocatoria-formulario.component';
import {editarLiderForm} from '../lider/editar-formulario/editar-formulario.component'
import {EmprendedorFormularioComponent} from '../lider/emprendedor-formulario/emprendedor-formulario.component'
import {FormFeriaComponent} from '../lider/feria-formulario/feria-formulario.component'
import {FeriasComponent} from '../lider/ferias/ferias.component'
import {PublicacionFormularioComponent} from '../lider/publicacion-formulario/publicacion-formulario.component'
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  imports: [JlayaoutComponent, MenuEmprendedorComponent, FormEmprendimientoComponent, CommonModule,FormProductoComponent,CatalogoComponent, MenuLiderComponent, PublicacionComponent,NgIf,PublicacionProductoComponent, FeriasParticiparComponent,ConvocatoriaFormularioComponent,
    editarLiderForm,EmprendedorFormularioComponent,FormFeriaComponent, FeriasComponent, PublicacionFormularioComponent
  ],
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
